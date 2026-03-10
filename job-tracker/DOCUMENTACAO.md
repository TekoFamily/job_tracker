# Documentação do Sistema: Job Tracker

O **Job Tracker** é uma aplicação Single Page Application (SPA) construída com **React** e **Vite**, projetada para ajudar profissionais a gerenciar suas candidaturas a vagas de emprego, visualizar recomendações de vagas e analisar o nível de compatibilidade de seus currículos com as oportunidades de mercado.

A aplicação se comunica com um backend próprio (hospedado no Render) e com APIs públicas externas (Remotive e Arbeitnow) para recomendações de vagas.

---

## 1. Arquitetura e Estrutura Principal

A stack tecnológica do front-end consiste em:
- **React 19** com **Vite** para o build e desenvolvimento rápido.
- **React Router DOM** para o gerenciamento das rotas pelo lado do cliente.
- **Axios** para as requisições HTTP gerenciando interceptores para autenticação.
- **Lucide React** para os ícones da interface.
- **CSS puro/módulos** (`index.css` e estilos específicos por página/componente).

As principais páginas (`/src/pages`) roteadas no `App.jsx` são:
- **/login**: Autenticação de usuário.
- **/register**: Criação de um novo usuário.
- **/dashboard**: Visão geral das candidaturas salvas e progresso.
- **/profile**: Configurações do perfil e meta de carreira.
- **/resume**: Visualização e análise do currículo.
- **/jobs**: Página de busca/recomendação de vagas que analisa a afinidade com o currículo salvo.

As rotas são protegidas pelo componente lógico `PrivateRoute`, que verifica a existência de credenciais (token) do usuário no `localStorage`.

---

## 2. Autenticação e API Backend

Toda a comunicação com a API backend (hospedada em `https://job-tracker-1-e7fg.onrender.com`) passa pelo módulo `api.js`, que injeta automaticamente o token JWT no cabeçalho `Authorization: Bearer <token>` de todas as requisições.

A estrutura de autenticação (`auth.js`) e armazenamento persistente manipulam o `localStorage` através da chave `job_tracker_user`:
- **Login (`/login`)**: Realiza `POST` para acessar o sistema e armazena os dados providos junto ao Token JWT.
- **Registro (`/usuarios`)**: Criação de novas contas.
- **Logout**: Limpeza da sessão.

O armazenamento de dados de candidaturas faz um CRUD através do arquivo `storage.js`, comunicando-se com a rota `/vagas` da API Node/Express/etc. 

---

## 3. Lógica de Vagas e Integração Externa (`jobService.js`)

A plataforma não depende apenas de vagas manuais inseridas pelo usuário; ela busca vagas remotas através de APIs externas utilizando requisições em paralelo (`Promise.allSettled`):
1. **Remotive API** (`https://remotive.com/api/remote-jobs`)
2. **Arbeitnow API** (`https://www.arbeitnow.com/api/job-board-api`)

Após o carregamento destas vagas, a classe de serviço passa os dados por funções **normalizadoras** (`normalizeRemotive` e `normalizeArbeitnow`). O objetivo desta normalização é assegurar que todas as vagas sigam o mesmo modelo de dados na interface (compostas por ID, título, empresa, localização, salário, origem, tags), independente da API.

Este serviço também infere o **nível de senioridade** (`detectLevel`) de cada vaga procurada verificando palavras-chave no título (intern, junior, senior, pleno).

---

## 4. Sistema de Matching do Currículo (`matcherService.js`)

Um dos maiores diferenciais da plataforma é o cálculo dinâmico do "Match" de um currículo do usuário com as vagas disponíveis. 

A pontuação é composta de três pesos principais definidos no sistema:
1. **Correspondência de Habilidades (60%)**: 
   - Procura as *tags* requisitadas pela vaga na seção de "skills" ou "resumo" do currículo do usuário. Retorna uma lista de "skills alcançadas" e uma lista de "*gaps*" (o que falta aprender). 
2. **Nível de Senioridade (20%)**:
   - Detecta automaticamente o nível do usuário a partir do seu resumo usando palavras-chave ("jr", "pleno", "senior"). Se o nível bater estritamente com o exigido pela vaga = ganho total dos 20%. 
   - Se o nível for compatível horizontalmente (ex: Pleno aplicando para vaga Júnior), recebe metade do ponto (+10%).
3. **Correspondência de Cargo/Título (20%)**:
   - Procura palavras-chave com mais de 3 letras do título da vaga e tenta achar no sumário ou no cargo atual que está gravado no currículo.

Essas lógicas juntas oferecem ao usuário o resultado visual da chance de ir bem em um processo seletivo (*score* em forma de porcentagem).
