# 🖥️ Devices Manager API — Backend

* **API REST desenvolvida em Node.js + TypeScript + Express + Prisma + PostgreSQL, com autenticação JWT, validações robustas e arquitetura modular.**
* **Projeto de portfólio com foco em boas práticas e padrões utilizados em empresas de tecnologia.**

---

## 🚀 Tecnologias Utilizadas

* **Node.js**
* **TypeScript**
* **Express**
* **Prisma ORM**
* **PostgreSQL**
* **JWT (JSON Web Token)**
* **Zod (Validações)**
* **Docker (Deploy futuro)**
* **Jest (Testes – futuro)**

---

```
📁 Estrutura do Projeto
src/
 ├─ modules/
 │   ├─ auth/
 │   │   ├─ auth.controller.ts
 │   │   ├─ auth.schema.ts
 │   │   └─ auth.service.ts
 │   └─ devices/
 │       ├─ device.controller.ts
 │       ├─ device.schema.ts
 │       └─ device.service.ts
 ├─ middlewares/
 │   └─ auth.middleware.ts
 ├─ lib/
 │   └─ prisma.ts
 ├─ routes.ts
 └─ server.ts

```

## 🔐 Autenticação
* **Login**
* **POST /auth/login**

---

## 📦 Endpoints — Devices
* **Método	Rota	Descrição**
* **GET	/devices	Lista todos os dispositivos**
* **POST	/devices	Cria um dispositivo**
* **PUT	/devices/:id	Atualiza um dispositivo**
* **DELETE	/devices/:id	Remove um dispositivo**

---

## Todas as rotas são protegidas por JWT.

## 🗄️ Banco de Dados (Prisma)
```
model Device {
  id        Int      @id @default(autoincrement())
  name      String
  model     String
  status    String
  createdAt DateTime @default(now())
}
```

## ▶️ Como rodar o projeto
* **npm install**
* **npx prisma migrate dev**
* **npm run dev**


## API disponível em:

http://localhost:3333

## 🌱 Variáveis de Ambiente

## Crie um .env:
* **DATABASE_URL="postgresql://user:password@localhost:5432/devices"**
* **JWT_SECRET="minha_chave_secreta"**
