# Guia de Setup - Twitter Clone

## Pré-requisitos

- Node.js 16+ 
- PostgreSQL 12+
- npm ou yarn
- Docker (opcional)

## Setup Manual

### 1. Banco de Dados

Crie um banco de dados PostgreSQL:

```bash
createdb twitter_clone
```

Execute o script SQL para criar as tabelas:

```bash
psql twitter_clone < backend/src/config/database.sql
```

### 2. Backend

```bash
cd backend

# Copiar arquivo de configuração
cp .env.example .env

# Instalar dependências
npm install

# Iniciar servidor
npm run dev
```

O servidor estará rodando em `http://localhost:5000`

### 3. Frontend

Em outro terminal:

```bash
cd frontend

# Copiar arquivo de configuração
cp .env.example .env

# Instalar dependências
npm install

# Iniciar aplicação
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## Setup com Docker

```bash
# Na raiz do projeto
docker-compose up -d
```

Acesse:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- PostgreSQL: localhost:5432

## Estrutura do Projeto

```
twitter-clone/
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações (BD, JWT)
│   │   ├── controllers/     # Lógica de negócio
│   │   ├── middleware/      # Middlewares (autenticação)
│   │   ├── routes/          # Rotas da API
│   │   ├── utils/           # Utilitários
│   │   └── server.js        # Servidor principal
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas
│   │   ├── services/        # Serviços API
│   │   ├── context/         # Contexto (Autenticação)
│   │   ├── hooks/           # Custom Hooks
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── .env
│
└── docker-compose.yml       # Orquestração Docker
```

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/profile` - Obter perfil (requer autenticação)

### Tweets
- `POST /api/tweets` - Criar tweet
- `GET /api/tweets/:tweetId` - Obter tweet por ID
- `GET /api/tweets/timeline` - Obter timeline
- `DELETE /api/tweets/:tweetId` - Deletar tweet
- `POST /api/tweets/:tweetId/like` - Curtir/descurtir tweet

### Usuários
- `GET /api/users/search?q=termo` - Buscar usuários
- `GET /api/users/:userId` - Obter perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil
- `POST /api/users/:targetUserId/follow` - Seguir/deixar de seguir
- `GET /api/users/:userId/followers` - Obter seguidores

## Autenticação

A autenticação é feita através de JWT (JSON Web Tokens). Após fazer login, o token é armazenado no localStorage e enviado em todas as requisições no header:

```
Authorization: Bearer <token>
```

## Variáveis de Ambiente

### Backend (.env)

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=twitter_clone
PORT=5000
NODE_ENV=development
JWT_SECRET=sua_chave_secreta_super_segura
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Features Implementadas

- ✅ Autenticação com JWT
- ✅ Criar, editar e deletar tweets
- ✅ Timeline feed
- ✅ Sistema de likes
- ✅ Perfil de usuário
- ✅ Seguir/deixar de seguir usuários
- ✅ Busca de usuários
- ✅ Responsividade (Tailwind CSS)

## Features Futuras

- [ ] Comentários nos tweets
- [ ] Retweets
- [ ] Mensagens diretas
- [ ] Notificações em tempo real
- [ ] Upload de imagens
- [ ] Hashtags
- [ ] Trending topics

## Troubleshooting

### Erro de conexão com banco de dados
- Verifique se PostgreSQL está rodando
- Confirme as credenciais no arquivo .env
- Verifique se a porta 5432 não está em uso

### Erro na autenticação
- Limpe o localStorage: `localStorage.clear()`
- Verifique se o JWT_SECRET está correto
- Certifique-se de enviar o token nos headers

### Erro ao criar tweet
- Tweet vazio? Conteúdo é obrigatório
- Tweet com mais de 280 caracteres? Reduza o tamanho
- Verifique se está autenticado

## Suporte

Para dúvidas ou problemas, verifique a documentação da API ou os logs do servidor.

---

Desenvolvido para fins educacionais 📚
