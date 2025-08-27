# Node Auth API

API de autenticação desenvolvida em **Node.js**, usando **Express**, **Prisma**, **JWT** e **Bcrypt**.  

## Funcionalidades
- Cadastro de usuários (`POST /users/register`)
- Login com geração de token JWT (`POST /users/login`)
- Listagem de usuários (rota protegida) (`GET /users/list-users`)

## Como usar
1. Instale dependências: `npm install`  
2. Configure o arquivo `.env` com `DATABASE_URL` e `JWT_SECRET`  
3. Rode as migrações: `npx prisma migrate dev`  
4. Inicie o servidor: `npm start`  

Servidor: `http://localhost:3000`
