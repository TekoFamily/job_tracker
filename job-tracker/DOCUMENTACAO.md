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

---

## 5. Interface e Experiência do Usuário (UI/UX)

A aplicação foi rigorosamente projetada para entregar uma experiência de ponta (nível *Enterprise*), utilizando padrões modernos de design e micro-interações:

1. **Roteamento SPA (Single Page Application):**
   - Para evitar erros de 404 ao recarregar rotas em produção (como no Vercel), o projeto inclui um arquivo `vercel.json` com regras de *rewrite*, forçando todos os caminhos a serem resolvidos pelo arquivo físico `index.html` gerado no build do React.
2. **Notificações em Tempo Real (Toasts):**
   - Utiliza a biblioteca `sonner` para disparar feedbacks visuais de sucesso ou erro (ex: credenciais inválidas, currículo salvo, vaga movida com sucesso) no canto da tela, engajando o usuário instantaneamente.
3. **Loading States (Skeleton Screens):**
   - Ao puxar as vagas remotas na página `/jobs` (o que pode demorar devido às APIs externas HTTP), a aplicação renderiza um `SkeletonJobCard`. Essa animação de "shimmer" carrega um esqueleto cinza com o mesmo formato do card original, melhorando a percepção de espera.
4. **Dashboard e Data Visualization (Analytics):**
   - **Gráficos (Recharts):** O painel de candidaturas possui um gráfico animado de rosca (Pie Chart) renderizado através do componente `ResponsiveContainer`, que compila visualmente qual a proporção de cada *status* de candidatura que o usuário detém.
   - **Kanban Board (`@hello-pangea/dnd`):** As vagas aplicadas são organizadas num sistema de drag-and-drop (Arrastar e Soltar) inspirado no Trello e Jira. O usuário pode alterar em tempo real o status de uma aplicação arrastando fisicamente o *Card* de uma coluna para a outra. O `onDragEnd` processa a mudança na UI de forma Otimista e em segundo plano comunica a API Backend para persistir a mudança de status da vaga no banco de dados da aplicação.

---

## 6. Exportação para IAs (Interoperabilidade de Dados)

Pensando no fluxo moderno de busca por empregos, o **Job Tracker** foi desenhado para tratar o currículo do usuário não como um documento estático PDF, mas sim como um conjunto de **dados estruturados (JSON)** armazenados de forma persistente.

Isso habilita uma funcionalidade extremamente poderosa: a capacidade de exportar ou copiar o *payload* (o JSON) do currículo em "cru" com um clique. 

**Caso de Uso Real (Engenharia de Prompt):**
Um candidato encontra a vaga dos sonhos, mas percebe que a descrição de suas experiências precisa destacar palavras-chave específicas daquela empresa.
Ele copia o JSON do seu currículo do *Job Tracker* e fornece a uma inteligência artificial generativa (como ChatGPT, Claude ou Gemini) com o seguinte comando:
> *"Aja como um recrutador sênior. Aqui estão os dados do meu currículo no formato estruturado JSON. Eu copiei os requisitos da Vaga X. Reescreva as descrições da minha experiência no JSON dando ênfase nas habilidades requeridas pela vaga sem inventar dados, e me devolva o JSON validado."*

Uma vez devolvido o código, o usuário apenas "substitui" a carga de dados de volta no *Job Tracker* (ou em ferramentas que aceitem importação JSON), e a aplicação compila automaticamente em um novo PDF lindamente diagramado, perfeitamente adaptado para o filtro do ATS (Applicant Tracking System) daquela empresa contratante.

Isso transforma a aplicação de um simples "gerador de PDFs" em um verdadeiro **Hub de Gerenciamento de Dados de Carreira Assistido por IA**.
