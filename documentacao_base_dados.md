# 📘 Documentação da Base de Dados --- Sistema de Monitoramento de Silos

Este documento descreve a modelagem oficial do banco de dados do projeto
de **monitoramento de silos graneleiros**.\
A modelagem considera **usuários, organizações, silos, dispositivos,
sensores, variáveis, leituras, limites, culturas e alertas**.

------------------------------------------------------------------------

## 👤 Usuários

**Tabela:** `usuarios`\
Representa as pessoas que utilizam o sistema.

**Atributos principais:** - `id`: identificador único do usuário.\
- `nome`: nome completo.\
- `email`: usado como login.\
- `contato`: telefone, e-mail ou outra informação de contato.\
- `senha_hash`: credencial para autenticação (ou referência a provedor
externo).\
- `ultimo_login`: data/hora do último acesso.\
- `data_criacao`: quando o usuário foi cadastrado.

**Relações:** - N:N com **Organizações**, via `usuarios_organizacoes`.

------------------------------------------------------------------------

## 🏢 Organizações

**Tabela:** `organizacoes`\
Representa as empresas, cooperativas ou fazendas que possuem silos.

**Atributos principais:** - `id`: identificador único.\
- `nome`: nome da organização.\
- `localizacao`: endereço ou coordenadas.\
- `tipo`: categoria da organização (fazenda, cooperativa etc.).\
- `descricao`: observações adicionais.\
- `data_criacao`: data de cadastro.

**Relações:** - N:N com **Usuários**.\
- 1:N com **Silos**.

------------------------------------------------------------------------

## 👥 Usuários ↔ Organizações

**Tabela:** `usuarios_organizacoes`\
Tabela de junção para gerenciar o relacionamento **N:N**.

**Atributos principais:** - `usuario_id`: referência ao usuário.\
- `organizacao_id`: referência à organização.\
- `funcao`: papel do usuário na organização (admin, operador,
visitante).\
- `data_criacao`: quando o vínculo foi criado.

------------------------------------------------------------------------

## 🏗️ Silos

**Tabela:** `silos`\
Representa os silos de armazenamento de grãos.

**Atributos principais:** - `id`: identificador do silo.\
- `organizacao_id`: a qual organização pertence.\
- `cultura_id`: qual cultura está armazenada atualmente.\
- `nome`: rótulo ou código interno do silo.\
- `tipo`: metálico, concreto, madeira etc.\
- `grao`: grão armazenado (redundante, mas pode servir como descrição
rápida).\
- `capacidade`: capacidade em toneladas.\
- `localizacao`: posição do silo.\
- `data_criacao`: data de cadastro.

**Relações:** - 1:N com **Dispositivos**.\
- 1:N com **Atuadores** (se modelados).\
- N:1 com **Cultura**.

------------------------------------------------------------------------

## 💻 Dispositivos

**Tabela:** `dispositivos`\
Representa os gateways IoT instalados nos silos (ex.: ESP32).

**Atributos principais:** - `id`: identificador do dispositivo.\
- `silo_id`: silo ao qual está vinculado.\
- `modelo`: modelo do hardware.\
- `firmware`: versão do software embarcado.\
- `ultima_conexao`: último heartbeat.\
- `id_organizacao`: redundante (vem via silo).\
- `data_criacao`: data de cadastro.

**Relações:** - 1:N com **Sensores**.

------------------------------------------------------------------------

## 🎛️ Sensores

**Tabela:** `sensores`\
Sensores físicos conectados a um dispositivo.

**Atributos principais:** - `id`: identificador do sensor.\
- `dispositivo_id`: a qual dispositivo pertence.\
- `variavel_id`: qual variável mede (temperatura, umidade etc.).\
- `modelo`: modelo físico do sensor (DHT22, DS18B20, MQ-135, HC-SR04).\
- `posicao`: posição no silo (topo, meio, base).\
- `ativo`: se está em uso.

**Relações:** - N:1 com **Dispositivo**.\
- N:1 com **Variável**.\
- 1:N com **Leituras**.

------------------------------------------------------------------------

## 📈 Variáveis

**Tabela:** `variaveis`\
Define os tipos de variáveis monitoradas.

**Atributos principais:** - `id`: identificador da variável.\
- `tipo`: código lógico (TEMPERATURA, UMIDADE, GAS, NIVEL).\
- `descricao`: descrição detalhada.\
- `unidade_padrao`: unidade padrão da variável (°C, %, ppm, %).\
- `posicao`: posição recomendada (pode ser migrado para sensores).\
- `ativo`: se está em uso.

**Relações:** - 1:N com **Sensores**.\
- 1:N com **Limites**.

------------------------------------------------------------------------

## 📊 Leituras

**Tabela:** `leituras`\
Registra cada valor medido pelos sensores.

**Atributos principais:** - `id`: identificador da leitura.\
- `sensor_id`: qual sensor gerou.\
- `data_leitura`: data/hora.\
- `valor`: valor numérico.\
- `qualidade_leitura`: status (ok, warning, erro).

**Relações:** - N:1 com **Sensores**.\
- 1:N com **Alertas** (via `leitura_id`).

------------------------------------------------------------------------

## 🚨 Limites

**Tabela:** `limites`\
Regras de referência para avaliar as variáveis de cada cultura.

**Atributos principais:** - `id`: identificador.\
- `variavel_id`: a qual variável se aplica.\
- `nome`: nome do limite (ex.: "Temp ideal soja").\
- `tipo`: tipo de regra (ACIMA, ABAIXO, FAIXA).\
- `valor`: valor mínimo ou único.\
- `janela_tempo`: tempo mínimo de persistência.\
- `severidade`: baixa, média, alta.\
- `acao`: ação prevista (notificação, ligar ventilador etc.).

**Relações:** - N:N com **Cultura**, via `limites_culturas`.\
- 1:N com **Alertas**.

------------------------------------------------------------------------

## 🌾 Cultura

**Tabela:** `cultura`\
Culturas agrícolas monitoradas.

**Atributos principais:** - `id`: identificador.\
- `nome`: nome da cultura (ex.: soja, milho).\
- `descricao`: observações.

**Relações:** - 1:N com **Silos**.\
- N:N com **Limites**, via `limites_culturas`.

------------------------------------------------------------------------

## 🌐 Limites ↔ Cultura

**Tabela:** `limites_culturas`\
Tabela de junção para gerenciar o relacionamento **N:N** entre limites e
culturas.

**Atributos principais:** - `limite_id`: referência ao limite.\
- `cultura_id`: referência à cultura.

**Finalidade:**\
- Permite que um mesmo limite seja usado em várias culturas.\
- Cada cultura pode ter múltiplos limites para variáveis diferentes.

------------------------------------------------------------------------

## ⚠️ Alertas

**Tabela:** `alertas`\
Registra quando uma leitura viola um limite.

**Atributos principais:** - `id`: identificador.\
- `limite_id`: qual regra foi violada.\
- `leitura_id`: leitura que gerou o alerta.\
- `data_alerta`: momento em que foi registrado.\
- `valor`: valor que disparou o alerta.

**Relações:** - N:1 com **Limite**.\
- N:1 com **Leitura**.

------------------------------------------------------------------------

# 📌 Resumo de Relacionamentos

-   **Usuários N:N Organizações**.\
-   **Organização 1:N Silos**.\
-   **Silo 1:N Dispositivos**.\
-   **Dispositivo 1:N Sensores**.\
-   **Sensor N:1 Variável**.\
-   **Sensor 1:N Leituras**.\
-   **Cultura 1:N Silos**.\
-   **Cultura N:N Limites** (via `limites_culturas`).\
-   **Leitura N:1 Sensor**.\
-   **Alerta N:1 Leitura** + **N:1 Limite**.

------------------------------------------------------------------------

📖 **Fonte de verdade conceitual:** *Sistema de Monitoramento Interno
para Silos Elevados de Armazenagem de Grãos* (Ferreira, UEMS, 2024).\
📐 **Fonte prática:** `modelo_de_dados.drawio`.
