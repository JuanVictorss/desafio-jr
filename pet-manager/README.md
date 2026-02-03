# 🐾 Interato Pet Manager

Sistema de gerenciamento de pets desenvolvido como **desafio técnico para a vaga de Desenvolvedor Fullstack Jr na Interato**.

O projeto consiste em uma **Dashboard (SPA)** segura onde usuários podem **cadastrar, listar e gerenciar seus animais de estimação**, com forte foco em **segurança**, **experiência do usuário (UX)** e **boas práticas de código**.

![Preview](./public/preview.png)

---

## 🚀 Tecnologias e Ferramentas

### 🧠 Core

* **Next.js 16.1** (App Router)
* **React 19**

### 🎨 Estilização & UI

* **Tailwind CSS v4**
* **Shadcn UI**
* **Lucide Icons**
* **Sonner** (Toasts)

### 🗄️ Backend & Banco de Dados

* **PostgreSQL**
* **Prisma ORM**

### 🔐 Autenticação & Segurança

* **NextAuth.js v5 (Beta)** — Strategy: Credentials
* **bcryptjs** — Hash de senhas

### ✅ Validação & Forms

* **Zod**
* **React Hook Form**

### ⚙️ Infraestrutura

* **Docker**
* **Docker Compose**

### ⚡ UX & Performance

* **use-debounce** — Otimização de buscas

---

## ⚙️ Funcionalidades Implementadas

* ✅ **Autenticação Completa**

  * Cadastro e Login seguros
  * Senhas criptografadas com bcrypt

* ✅ **CRUD de Pets**

  * Criar, listar, editar e excluir pets

* ✅ **Busca Inteligente**

  * Filtro em tempo real com debounce
  * Ignora maiúsculas/minúsculas e acentos

* ✅ **Segurança de Dados**

  * 🔒 **Soft Delete:** pets excluídos não são removidos do banco (`isActive: false`)
  * 🔐 **Row Level Security:** usuários só podem editar/excluir seus próprios pets (validação no backend)

* ✅ **Auditoria de Ações**

  * Logs automáticos em `AuditLog` para:

    * Login
    * Criação
    * Atualização
    * Exclusão

---

## 🏗️ Decisões Arquiteturais

### 1️⃣ Server Actions (Next.js)

Foi utilizado o **Server Actions** em vez de rotas de API tradicionais.

**Benefícios:**

* Tipagem de ponta a ponta (type safety)
* Menos boilerplate
* Redução do uso de `useEffect`
* Melhor organização entre frontend e backend

---

### 2️⃣ Soft Delete (`isActive`)

Nenhum dado é removido fisicamente do banco de dados.

**Vantagens:**

* Preserva histórico
* Garante integridade referencial
* Permite futuras funcionalidades como:

  * Lixeira
  * Restauração de registros

---

### 3️⃣ Busca Insensitive (Acentos)

O PostgreSQL é sensível a acentos por padrão.

Para melhorar a UX **sem depender de extensões como `unaccent`**, as strings são **normalizadas na camada de serviço (Server Actions)**.

Essa abordagem é performática e suficiente para o escopo do projeto.

---

## 📦 Como Rodar o Projeto

### 📋 Pré-requisitos

* **Node.js v18+**
* **Docker** (opcional, mas recomendado para o banco de dados)

---

### ▶️ Passo a Passo

#### 1️⃣ Clone o repositório

```bash
git clone https://github.com/Juanvictorss/desafio-jr.git
cd desafio-jr/pet-manager
```

---

#### 2️⃣ Instale as dependências

```bash
npm install
```

---

#### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo **`.env`** na raiz do projeto:

```env
# Banco de dados (Docker)
# user: admin | pass: adminpassword | db: petmanager
DATABASE_URL="postgresql://admin:adminpassword@localhost:5432/petmanager?schema=public"

# NextAuth
AUTH_SECRET="chave-secreta-super-segura-123"
```

---

#### 4️⃣ Suba o banco de dados (Docker)

```bash
docker-compose up -d
```

* PostgreSQL: **localhost:5432**
* Adminer (UI): **[http://localhost:8080](http://localhost:8080)**

---

#### 5️⃣ Execute as migrations

```bash
npx prisma migrate dev
```

---

#### 6️⃣ Inicie a aplicação

```bash
npm run dev
```

Acesse:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🚀 Próximos Passos (Roadmap)

O projeto atual atende aos requisitos do MVP. Para uma versão 2.0, a infraestrutura de banco de dados já está preparada para suportar:

- [ ] **Perfil Completo:** Cadastro de telefone, documento e endereço do usuário.
- [ ] **Detalhes do Pet:** Upload de fotos (`photoUrl`), porte (`size`) e descrição detalhada.
- [ ] **Recuperação de Senha:** Fluxo de "Esqueci minha senha".
- [ ] **Acessibilidade:** Implementação de modo alto contraste e revisão WCAG.
- [ ] **Dashboards:** Gráficos de quantidade de pets por tipo/raça.
- [ ] **Testes:** Implementação de testes automatizados (Unitários e de Integração).
---

## 📄 Licença

Este projeto foi desenvolvido **exclusivamente para fins de avaliação técnica**.

---

## 👨‍💻 Autor

Desenvolvido por **JUAN VICTOR SOUZA SILVA** 
- 📧 **E-mail:** juanvictoficial@gmail.com
- 📱 **WhatsApp:** (87)99142-6531
- 🔗 **Linkedin:** [linkedin.com/juanvictor-ss/](https://www.linkedin.com/in/juanvictor-ss/)