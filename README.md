# Twitter Clone - Documentação Completa

## 🎯 Visão Geral

Clone funcional completo do Twitter para fins educacionais, com todas as funcionalidades principais de uma rede social.

## 🚀 Stack Tecnológico

### Frontend
- **React 18** - UI interativa
- **Tailwind CSS** - Styling responsivo
- **React Router** - Navegação
- **Axios** - Requisições HTTP
- **React Icons** - Ícones

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação segura
- **bcryptjs** - Hash de senhas

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração

## ✨ Funcionalidades Implementadas

### Autenticação & Usuários
- ✅ Registro de novo usuário
- ✅ Login com JWT
- ✅ Perfis customizáveis
- ✅ Seguir/Deixar de seguir
- ✅ Sistema de seguidores
- ✅ Busca de usuários

### Tweets & Interações
- ✅ Criar tweets (máx 280 caracteres)
- ✅ Deletar tweets
- ✅ Likes/Unlikes
- ✅ Retweets
- ✅ Respostas/Comentários
- ✅ Upload de imagens
- ✅ Timeline feed personalizada

### Mensagens & Notificações
- ✅ Mensagens diretas (DMs)
- ✅ Conversas com histórico
- ✅ Notificações em tempo real
- ✅ Marcar notificações como lidas
- ✅ Contador de não lidas

### Descoberta & Exploração
- ✅ Trending topics
- ✅ Sugestões de seguir
- ✅ Busca global
- ✅ Feed de descobertas

## 📁 Estrutura do Projeto

```
twitter-clone/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── database.sql
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── tweetsController.js
│   │   │   ├── usersController.js
│   │   │   ├── repliesController.js
│   │   │   ├── messagesController.js
│   │   │   └── notificationsController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── tweetsRoutes.js
│   │   │   ├── usersRoutes.js
│   │   │   ├── repliesRoutes.js
│   │   │   ├── messagesRoutes.js
│   │   │   └── notificationsRoutes.js
│   │   ├── utils/
│   │   │   └── jwt.js
│   │   └── server.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Tweet.jsx
│   │   │   └── TweetComposer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Auth/
│   │   │       ├── Login.jsx
│   │   │       └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
│
├── docker-compose.yml
├── .gitignore
├── README.md
├── SETUP.md
└── API_DOCUMENTATION.md
```

## 🔧 Configuração

### Quick Start com Docker (Recomendado)

```bash
# Clonar repositório
git clone https://github.com/davidadrianofe/Twitter-clone-.git
cd Twitter-clone-

# Iniciar com Docker Compose
docker-compose up -d

# Acesse
Frontend: http://localhost:3000
Backend: http://localhost:5000
```

### Instalação Manual

**Backend:**
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Frontend (novo terminal):**
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

## 📊 Banco de Dados

### Tabelas Criadas
- `users` - Informações dos usuários
- `tweets` - Tweets publicados
- `replies` - Comentários/Respostas
- `likes` - Registro de likes
- `retweets` - Registro de retweets
- `followers` - Relacionamento de seguidores
- `direct_messages` - Mensagens diretas
- `notifications` - Notificações do sistema

## 🔐 Segurança

- Senhas criptografadas com bcryptjs
- Autenticação via JWT
- Tokens com expiração de 7 dias
- CORS habilitado
- Validação de entrada

## 📱 Design & UX

- Interface limpa inspirada no Twitter 2013
- Layout responsivo (mobile, tablet, desktop)
- Componentes reutilizáveis
- Transições suaves
- Ícones intuitivos

## 🎓 Aprendizados Principais

Este projeto demonstra:
- Desenvolvimento full-stack com Node.js + React
- Autenticação segura com JWT
- Padrão MVC no backend
- State management com Context API
- Hooks customizados
- Chamadas de API com Axios
- Design responsivo com Tailwind CSS
- Docker e containerização

## 🚧 Funcionalidades Futuras

- [ ] Notificações em tempo real com Socket.io
- [ ] Upload de imagens para CDN
- [ ] Hashtags automáticas
- [ ] Mencionar usuários (@username)
- [ ] Threads de tweets
- [ ] Likes em comentários
- [ ] Bloqueio de usuários
- [ ] Relatório de tweets
- [ ] Dark mode
- [ ] Filtros avançados

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
```bash
# Verificar se PostgreSQL está rodando
psql -U postgres -d twitter_clone
```

### Erro na autenticação
```bash
# Limpar localStorage no navegador
localStorage.clear()
```

### Erro ao criar tweet
- Máximo 280 caracteres
- Conteúdo não pode estar vazio

## 📚 Documentação Adicional

- [API Documentation](./API_DOCUMENTATION.md) - Detalhes de todos os endpoints
- [Setup Guide](./SETUP.md) - Passo-a-passo de instalação

## 👤 Autor

**David Adriano Ferrari dos Santos**
- CEO e Criador do Projeto
- Para fins educacionais

## ⚖️ Licença

MIT

## ⭐ Suporte

Gostou do projeto? Deixe uma estrela! ⭐

---

**Desenvolvido com ❤️ para fins educacionais**
