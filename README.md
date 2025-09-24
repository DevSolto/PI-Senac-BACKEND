# Projeto de PI - Monitoramento de Silos

## 📌 Descrição do Projeto
Este projeto tem como objetivo o desenvolvimento de um sistema de monitoramento de silos, construído em NestJS, que fornece dados em tempo real para dashboards e geração de alertas.

A solução foi pensada para atender às necessidades de gestão de armazenagem agrícola, permitindo que clientes visualizem informações importantes de seus silos com segurança, confiabilidade e escalabilidade.

Um dos principais diferenciais do sistema é a segurança dos dados:
- Cada organização tem acesso apenas aos seus próprios silos.
- Os dados são tratados de forma isolada, evitando qualquer vazamento de informações entre diferentes clientes.
- Integração com mecanismos de autenticação e autorização garante que apenas usuários autorizados possam consultar ou gerenciar os dados.

---

## 🚀 Funcionalidades
- Monitoramento de silos.
- Integração com sensores para coleta de dados (temperatura, umidade, volume, etc.).
- Exposição de APIs para consumo em dashboards.
- Sistema de alertas baseado em parâmetros críticos (ex: temperatura alta ou excesso de umidade).
- Isolamento de dados por silo e organização.
- Controle de acesso seguro com autenticação e autorização.

---

## 🛠️ Tecnologias Utilizadas
- NestJS (framework principal)
- TypeScript
- Node.js
- Banco de Dados
- Docker
- JWT

---


## ⚙️ Como Executar o Projeto

### Pré-requisitos
- Node.js (versão LTS recomendada)
- NPM ou Yarn
- Banco de dados configurado (PostgreSQL)

### Passo a passo
1. Clone o repositório:
   git clone https://github.com/DevSolto/PI-Senac-BACKEND.git
   cd monitoramento-silo

2. Instale as dependências:
   npm install

3. Configure o arquivo .env com as variáveis necessárias (exemplo):
   DATABASE_URL=postgresql://user:password@localhost:5432/monitoramento
   JWT_SECRET=seu_token_secreto

4. Execute o servidor em modo desenvolvimento:
   npm run start:dev

5. Acesse a aplicação em:
   http://localhost:3000

---

## 📊 Uso em Dashboards
A API expõe endpoints que podem ser consumidos por ferramentas de Business Intelligence (BI), como Power BI, Grafana ou dashboards personalizados.
Assim, o cliente pode acompanhar em tempo real:
- Níveis de estoque no silo.
- Condições internas (temperatura/umidade).
- Histórico de alertas e ocorrências.

---

## 🔒 Segurança
- Cada organização tem seus dados isolados.
- Implementação de autenticação baseada em JWT.
- Permissões específicas para usuários e administradores.
- Boas práticas de proteção contra injeção de SQL/NoSQL, XSS e CSRF.

---

## 📈 Possíveis Evoluções Futuras
- Integração com serviços de nuvem (Azure) para escalabilidade.
- Machine Learning para previsão de riscos (ex: deterioração dos grãos).
- Aplicativo mobile para notificações em tempo real.

---

## 👥 Equipe
Projeto desenvolvido como parte da disciplina de Projeto Integrador (PI) - SENAC.

Integrantes:
- Matheus
- Santiago
- Lygia


