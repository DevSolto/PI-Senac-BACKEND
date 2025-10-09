# 📡 Documentação dos Endpoints para o Front-end

Este documento descreve, em detalhe, os endpoints atualmente expostos pelo backend do sistema de monitoramento de silos que são consumidos pelo front-end para gráficos, dados em tempo real e alertas. Ele apresenta contratos de requisição e resposta, inclui
ndo os comportamentos conhecidos para cenários de sucesso e de falha.

## Visão Geral dos Endpoints

| Tipo | Rota | Finalidade principal |
| ---- | ---- | --------------------- |
| REST (HTTP) | `GET /devices/:id/history` | Carrega histórico consolidado para gráficos e análises retroativas. |
| SSE (HTTP streaming) | `GET /devices/:id/updates` | Recebe leituras em tempo real e alertas provenientes dos dispositivos. |

A rota `GET /` (raiz da aplicação) continua disponível para verificação de saúde básica, retornando a string padrão "Hello World
" fornecida pelo `AppService`, mas não é consumida pelo front-end operacional.【F:app/src/app.controller.ts†L1-L12】

---

## `GET /devices/:id/history`

### Objetivo
Retornar o histórico de leituras associadas a um dispositivo específico para que dashboards possam desenhar gráficos de tendênci
as ou carregar dados iniciais antes de abrir o stream em tempo real.【F:app/src/domain/devices/devices.controller.ts†L13-L16】

### Requisição
- **Verbo HTTP:** `GET`
- **Parâmetro de rota obrigatório:** `id` — identificador do dispositivo (ex.: `0C4EA065A598`).
- **Cabeçalhos relevantes:** nenhum cabeçalho adicional é obrigatório; o endpoint aceita o cabeçalho padrão `Accept: application/json`.
- **Autenticação:** não implementada na versão atual do projeto; prevista para versões futuras conforme descrito na documentação
 geral.【F:README.md†L4-L21】

### Resposta de Sucesso (`200 OK`)
Retorna um array JSON onde cada elemento representa um ponto de gráfico. O array pode estar vazio caso não existam dados armazen
ados para o dispositivo.【F:app/src/domain/devices/devices.service.ts†L14-L30】

```json
[
  {
    "timestamp": 1717166400,
    "value": {
      "temperature": 24.6,
      "humidity": 58.2,
      "gas": 312,
      "level": 82,
      "alerts": [
        {
          "limitId": "limite-temperatura-alta",
          "severity": "ALTA",
          "status": "OPEN",
          "message": "Temperatura acima do ideal por 15 minutos"
        }
      ]
    }
  }
]
```

#### Campos
- `timestamp` *(number)*: Epoch em segundos indicando quando a leitura foi registrada.
- `value` *(object)*: payload completo armazenado no Redis, que costuma refletir:
  - Variáveis físicas mapeadas nos sensores (por exemplo `temperature`, `humidity`, `gas`, `level`).【F:historias_usuarios_siste
ma.md†L27-L47】
  - A lista `alerts` com os alertas ativos vinculados à leitura, quando limites foram violados. Cada alerta pode conter identific
ador da regra (`limitId`), severidade, status e mensagem resumindo a ocorrência, conforme regras descritas na modelagem de dados.
【F:documentacao_base_dados.md†L126-L214】
  - Campos adicionais opcionais enviados pelo dispositivo são repassados sem alteração, preservando compatibilidade retroativa.

### Possíveis Retornos Alternativos
- `200 OK` com corpo `[]`: quando não há histórico para o dispositivo (chave inexistente ou lista vazia no Redis).
- `500 Internal Server Error`: falhas de infraestrutura (ex.: indisponibilidade do Redis ou payload inválido) resultarão em exce
ções genéricas propagadas pelo NestJS. Recomenda-se que o front trate respostas 5xx como falhas temporárias, com estratégia de r
e-tentativa exponencial.

---

## `GET /devices/:id/updates`

### Objetivo
Estabelecer um stream Server-Sent Events (SSE) para entregar leituras em tempo real e alertas associados sempre que o backend rec

recebe uma publicação no canal Redis correspondente ao dispositivo.【F:app/src/domain/devices/devices.controller.ts†L18-L28】【F:app/src/infra/database/redis/redis.service.ts†L1-L24】

### Requisição
- **Verbo HTTP:** `GET`
- **Parâmetro de rota obrigatório:** `id` — identificador do dispositivo.
- **Cabeçalhos obrigatórios:**
  - `Accept: text/event-stream`
  - `Cache-Control: no-cache`
  - `Connection: keep-alive`
- **Autenticação:** não implementada nesta versão.
- **Requisitos adicionais:** o front-end deve manter a conexão aberta e tratar reconexões automáticas caso a rede oscile.

### Resposta de Sucesso (`200 OK`)
O servidor mantém a conexão aberta e envia eventos no formato SSE (`data: <json>\n\n`). Cada evento encapsula a mensagem original publicada no Redis, convertida para JSON pelo backend.

```
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

:data: {"timestamp":1717166523,"payload":{"temperature":24.9,"humidity":57.4}}

```

#### Estrutura do Campo `data`
O JSON carregado no campo `data` segue o mesmo padrão de objetos do histórico, porém com foco em eventos individuais:

```json
{
  "timestamp": 1717166523,
  "payload": {
    "temperature": 24.9,
    "humidity": 57.4,
    "gas": 310,
    "level": 81,
    "alerts": [
      {
        "limitId": "limite-umidade-alta",
        "severity": "MEDIA",
        "status": "OPEN",
        "message": "Umidade acima do ideal por 5 minutos"
      }
    ]
  }
}
```

- `timestamp` *(number)*: Momento em que a leitura foi capturada no dispositivo.
- `payload` *(object)*:
  - Variáveis físicas de interesse (`temperature`, `humidity`, `gas`, `level` etc.), prontas para alimentar gráficos em tempo real.【F:app/grafico.html†L88-L134】
  - `alerts` *(array opcional)*: lista de alertas abertos ou atualizados na leitura atual. A presença dessa propriedade indica que limites foram ultrapassados e possibilita destacar a condição crítica no dashboard.【F:documentacao_base_dados.md†L126-L214】
  - Campos adicionais opcionais enviados pelo dispositivo são repassados sem alteração, preservando compatibilidade retroativa.

### Eventos de Alerta
Os alertas trafegam pelo mesmo stream que as leituras. Quando `payload.alerts` contém itens, cada objeto representa uma regra de limite violada. Recomenda-se que o front-end:

1. Destaque visualmente o alerta (ex.: cor de destaque, notificação toast).
2. Registre o alerta em uma lista lateral/histórico local.
3. Mantenha o gráfico sincronizado com o ponto da leitura correspondente.

Como o backend não altera a mensagem original, novos campos adicionados ao JSON publicado no Redis serão automaticamente repassa
dos aos clientes SSE, preservando compatibilidade retroativa.

### Tratamento de Erros
- **Interrupção de conexão:** falhas de rede encerram o stream. O front deve tentar reconectar (o `EventSource` do navegador já
 executa tentativas automáticas por padrão).【F:app/grafico.html†L135-L151】
- **Erro interno (`500`)**: se o backend lançar exceções durante o processamento (ex.: Redis indisponível), a conexão será fecha
da. O cliente receberá o evento `error` e poderá exibir mensagem para o usuário.
- **Dispositivo sem canal:** quando não há publicações no canal correspondente, o stream permanece aberto sem eventos até que um novo dado chegue.

---

## Considerações de Integração

1. **Sincronização inicial:** recomenda-se que o front chame primeiro `GET /devices/:id/history` para desenhar o gráfico inicial e, em seguida, abra o stream SSE. Esse fluxo já está exemplificado no arquivo de prova de conceito `grafico.html`.【F:app/grafico.html†L73-L151】
2. **Consistência de dados:** como ambos endpoints compartilham a mesma estrutura de payload, é possível reaproveitar os mesmos modelos/DTOs no front-end.
3. **Escalabilidade:** múltiplos dispositivos podem ser acompanhados simultaneamente abrindo uma conexão SSE por dispositivo. Em ambientes com muitos dispositivos, considere agrupar streams ou utilizar workers dedicados.
4. **Autenticação futura:** quando a camada de segurança JWT for habilitada, espera-se que ambos endpoints exijam cabeçalho `Authorization: Bearer <token>`. O design atual facilita essa evolução sem quebrar o contrato existente.

---

## Resumo
- `GET /devices/:id/history` fornece dados históricos estruturados em forma de pontos de gráfico, permitindo análises retroativas e carregamento inicial.
- `GET /devices/:id/updates` mantém um stream SSE com as últimas leituras e alertas, usando o mesmo formato de payload do histórico, garantindo consistência entre dados históricos e em tempo real.

Ambos os contratos foram pensados para suportar temperatura, umidade, gás e nível — variáveis monitoradas na modelagem oficial do sistema — e trazem espaço para transportar metadados e alertas críticos, atendendo aos requisitos funcionais de dashboards e notificações.
