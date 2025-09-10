# 📘 Histórias de Usuário e do Sistema de Monitoramento de Silos

Este documento descreve as **principais histórias de usuário** e
**histórias do sistema** relacionadas ao projeto de **monitoramento de
silos graneleiros**, tomando como base:

-   O modelo de dados oficial (`modelo_de_dados.drawio`), que define
    entidades como Usuários, Organizações, Silos, Dispositivos,
    Sensores, Leituras, Limites e Alertas.\
-   O artigo *Sistema de Monitoramento Interno para Silos Elevados de
    Armazenagem de Grãos* (Rafael Florenciano Ferreira, UEMS, 2024), que
    orienta a solução prática.

------------------------------------------------------------------------

## 👤 Histórias de Usuário

### 1. Gestão de Acesso

-   **Como** administrador de uma organização,\
-   **Quero** cadastrar usuários com diferentes papéis (admin, operador,
    visitante),\
-   **Para** que cada pessoa tenha acesso adequado ao sistema.

### 2. Cadastro de Silos

-   **Como** gestor de uma fazenda,\
-   **Quero** registrar meus silos com capacidade, tipo e localização,\
-   **Para** centralizar o monitoramento em um só lugar.

### 3. Instalação de Dispositivos e Sensores

-   **Como** operador,\
-   **Quero** cadastrar dispositivos (ESP32) e sensores (temperatura,
    umidade, gás, nível),\
-   **Para** que o sistema comece a receber leituras em tempo real.

### 4. Monitoramento Remoto

-   **Como** operador,\
-   **Quero** visualizar em um dashboard os dados de temperatura,
    umidade, gases e nível dos grãos,\
-   **Para** acompanhar o estado do silo sem precisar ir fisicamente até
    ele.

### 5. Configuração de Limites

-   **Como** administrador de silo,\
-   **Quero** configurar limites máximos e mínimos para cada variável
    (temperatura, umidade, etc.),\
-   **Para** ser avisado quando as condições estiverem fora do ideal.

### 6. Receber Alertas

-   **Como** operador,\
-   **Quero** receber alertas em tempo real (notificação/e-mail) quando
    um limite for ultrapassado,\
-   **Para** agir rapidamente e evitar perdas de grãos.

### 7. Histórico e Relatórios

-   **Como** gestor,\
-   **Quero** acessar relatórios de leituras e alertas passados,\
-   **Para** analisar a qualidade do armazenamento e tomar decisões
    futuras.

### 8. Automação

-   **Como** operador,\
-   **Quero** que o sistema acione automaticamente atuadores
    (ventiladores, vibradores) em resposta a leituras críticas,\
-   **Para** corrigir problemas sem intervenção manual.

------------------------------------------------------------------------

## ⚙️ Histórias do Sistema

### 1. Coleta de Dados

-   **Dado** um sensor ativo,\
-   **Quando** ele enviar uma nova leitura,\
-   **Então** o sistema deve registrar a leitura com timestamp, valor e
    qualidade.

### 2. Avaliação de Limites

-   **Dado** um conjunto de limites vinculados a um silo,\
-   **Quando** uma leitura de sensor for recebida,\
-   **Então** o sistema deve avaliar se os valores estão dentro ou fora
    da faixa permitida.

### 3. Geração de Alertas

-   **Dado** que uma leitura viola um limite,\
-   **Quando** a condição persistir além da janela configurada,\
-   **Então** o sistema deve criar ou atualizar um alerta relacionado ao
    limite e ao sensor.

### 4. Encerramento de Alertas

-   **Dado** um alerta aberto,\
-   **Quando** os valores voltarem ao normal por um tempo suficiente
    (histerese/janela),\
-   **Então** o sistema deve fechar o alerta.

### 5. Integração com Supervisório

-   **Dado** um painel de monitoramento,\
-   **Quando** novos dados forem processados,\
-   **Então** o sistema deve atualizar widgets em tempo real (ex.:
    Blynk, dashboard web).

### 6. Controle de Atuadores

-   **Dado** um alerta crítico,\
-   **Quando** houver uma ação configurada,\
-   **Então** o sistema deve enviar comando ao atuador (ligar
    ventilador, vibrador, etc.) e registrar a ação.

### 7. Auditoria

-   **Dado** qualquer evento relevante (login, cadastro, limite, alerta,
    ação),\
-   **Quando** ele ocorrer,\
-   **Então** o sistema deve registrar logs para auditoria e análise
    futura.

------------------------------------------------------------------------

## 📌 Observações

-   Os sensores considerados: **DHT22 (umidade), DS18B20 (temperatura em
    múltiplos pontos), MQ-135 (gases), HC-SR04 (nível)**.\
-   A arquitetura segue o fluxo: **Sensores → Dispositivo (ESP32) →
    Backend → Banco de Dados → Dashboard/Alertas**.\
-   Os limites são definidos por **Silo ⇄ Limite (N:N)**, permitindo
    reuso de regras entre silos.\
-   Alertas sempre vinculam **qual limite foi violado** e **qual sensor
    disparou**.

------------------------------------------------------------------------

*Fonte conceitual: Rafael Florenciano Ferreira, UEMS, 2024*\
*Fonte prática: modelo de dados oficial (`modelo_de_dados.drawio`)*
