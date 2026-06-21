# Documentação da API - Twitter Clone

## Base URL
```
http://localhost:5000/api
```

## Headers Necessários
```
Content-Type: application/json
Authorization: Bearer <token> (para endpoints protegidos)
```

---

## 🔐 Autenticação

### Registrar Novo Usuário
```http
POST /auth/register
```

**Request:**
```json
{
  "username": "usuario123",
  "email": "usuario@email.com",
  "password": "senha123",
  "fullName": "Usuário Teste"
}
```

**Response (201):**
```json
{
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@email.com",
    "full_name": "Usuário Teste"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Fazer Login
```http
POST /auth/login
```

**Request:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@email.com",
    "full_name": "Usuário Teste",
    "profile_picture": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Obter Perfil Atual
```http
GET /auth/profile
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "username": "usuario123",
  "email": "usuario@email.com",
  "full_name": "Usuário Teste",
  "bio": "Descrição do perfil",
  "profile_picture": "url_foto",
  "cover_picture": "url_capa",
  "location": "São Paulo, Brasil",
  "website": "www.website.com",
  "followers_count": 100,
  "following_count": 50,
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

## 📝 Tweets

### Criar Tweet
```http
POST /tweets
Authorization: Bearer <token>
```

**Request:**
```json
{
  "content": "Olá, este é meu primeiro tweet!",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response (201):**
```json
{
  "message": "Tweet criado com sucesso",
  "tweet": {
    "id": 42,
    "content": "Olá, este é meu primeiro tweet!",
    "image_url": "https://example.com/image.jpg",
    "likes_count": 0,
    "retweets_count": 0,
    "replies_count": 0,
    "created_at": "2024-01-20T15:30:00Z"
  }
}
```

---

### Obter Tweet por ID
```http
GET /tweets/:tweetId
```

**Response (200):**
```json
{
  "id": 42,
  "content": "Olá, este é meu primeiro tweet!",
  "image_url": "https://example.com/image.jpg",
  "likes_count": 5,
  "retweets_count": 2,
  "replies_count": 1,
  "created_at": "2024-01-20T15:30:00Z",
  "user_id": 1,
  "username": "usuario123",
  "full_name": "Usuário Teste",
  "profile_picture": "url_foto"
}
```

---

### Obter Timeline
```http
GET /tweets/timeline?page=1&limit=20
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (opcional): Página dos resultados (padrão: 1)
- `limit` (opcional): Quantidade de tweets por página (padrão: 20)

**Response (200):**
```json
{
  "tweets": [
    {
      "id": 42,
      "content": "Olá, este é meu primeiro tweet!",
      "image_url": null,
      "likes_count": 5,
      "retweets_count": 2,
      "replies_count": 1,
      "created_at": "2024-01-20T15:30:00Z",
      "user_id": 1,
      "username": "usuario123",
      "full_name": "Usuário Teste",
      "profile_picture": "url_foto"
    }
  ],
  "page": 1,
  "limit": 20
}
```

---

### Deletar Tweet
```http
DELETE /tweets/:tweetId
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Tweet deletado com sucesso"
}
```

---

### Curtir/Descurtir Tweet
```http
POST /tweets/:tweetId/like
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Tweet curtido",
  "liked": true
}
```

---

## 👥 Usuários

### Buscar Usuários
```http
GET /users/search?q=usuario
```

**Query Parameters:**
- `q` (obrigatório): Termo de busca (mínimo 2 caracteres)

**Response (200):**
```json
[
  {
    "id": 1,
    "username": "usuario123",
    "full_name": "Usuário Teste",
    "profile_picture": "url_foto",
    "bio": "Descrição"
  }
]
```

---

### Obter Perfil do Usuário
```http
GET /users/:userId
```

**Response (200):**
```json
{
  "id": 1,
  "username": "usuario123",
  "email": "usuario@email.com",
  "full_name": "Usuário Teste",
  "bio": "Descrição do perfil",
  "profile_picture": "url_foto",
  "cover_picture": "url_capa",
  "location": "São Paulo, Brasil",
  "website": "www.website.com",
  "followers_count": 100,
  "following_count": 50,
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### Atualizar Perfil
```http
PUT /users/profile
Authorization: Bearer <token>
```

**Request:**
```json
{
  "fullName": "Novo Nome",
  "bio": "Nova descrição",
  "location": "Rio de Janeiro",
  "website": "www.newsite.com",
  "profilePicture": "url_nova_foto",
  "coverPicture": "url_nova_capa"
}
```

**Response (200):**
```json
{
  "message": "Perfil atualizado com sucesso",
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@email.com",
    "full_name": "Novo Nome",
    "bio": "Nova descrição",
    "profile_picture": "url_nova_foto",
    "cover_picture": "url_nova_capa",
    "location": "Rio de Janeiro",
    "website": "www.newsite.com"
  }
}
```

---

### Seguir/Deixar de Seguir Usuário
```http
POST /users/:targetUserId/follow
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Usuário seguido com sucesso",
  "following": true
}
```

---

### Obter Seguidores
```http
GET /users/:userId/followers?page=1&limit=20
```

**Query Parameters:**
- `page` (opcional): Página dos resultados (padrão: 1)
- `limit` (opcional): Quantidade de seguidores por página (padrão: 20)

**Response (200):**
```json
{
  "followers": [
    {
      "id": 2,
      "username": "seguidor1",
      "full_name": "Seguidor Um",
      "profile_picture": "url_foto",
      "bio": "Bio do seguidor"
    }
  ],
  "page": 1,
  "limit": 20
}
```

---

## Códigos de Erro

| Código | Erro | Descrição |
|--------|------|-----------|
| 400 | Bad Request | Requisição inválida ou parâmetros faltando |
| 401 | Unauthorized | Token inválido, expirado ou não fornecido |
| 403 | Forbidden | Acesso negado (ex: deletar tweet de outro usuário) |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro no servidor |

---

## Exemplos de Uso

### Com cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "password": "senha123"
  }'
```

**Criar Tweet:**
```bash
curl -X POST http://localhost:5000/api/tweets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "content": "Olá mundo!"
  }'
```

---

## Limitações

- Tweets limitados a 280 caracteres
- Máximo 20 tweets por página por padrão
- Máximo 20 seguidores por página por padrão
- Mínimo 2 caracteres para busca de usuários

---

Desenvolvido para fins educacionais 📚
