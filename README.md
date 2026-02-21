# 📚 Sistema de Gerenciamento de Biblioteca

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)

Este é um projeto Full-Stack desenvolvido para gerenciar o acervo de uma biblioteca. Ele permite a criação, listagem, atualização e exclusão (CRUD) de livros, contando com uma API robusta e um frontend interativo.

## 🚀 Tecnologias Utilizadas

### Backend (API)
A API foi construída utilizando a arquitetura MSC (Model-Service-Controller) para garantir separação de responsabilidades e código limpo.

* **Node.js** com **Express**
* **Zod** para validação rigorosa de dados (Schemas)
* **Tratamento de Erros Global** via Middlewares
* Armazenamento em memória (Repository Pattern)

### Frontend
* **React** com **Vite**
* **Axios** para consumo da API REST
* Roteamento com React Router Dom

## ✨ Funcionalidades

### 📋 **CRUD Completo de Livros**

- ✅ **Cadastrar** novos livros com validação
- ✅ **Listar** todos os livros com sistema de busca
- ✅ **Visualizar** detalhes de livros específicos
- ✅ **Editar** informações de livros existentes
- ✅ **Excluir** livros com confirmação

### 📖 **Campos do Livro**

- **ID único** (gerado automaticamente)
- **Título** (obrigatório)
- **Número de páginas** (obrigatório, número positivo)
- **Código ISBN** (obrigatório, único no sistema)
- **Editora** (obrigatório)

### 🔍 **Funcionalidades Avançadas**

- **Sistema de busca** por título, editora ou ISBN
- **Validação em tempo real** nos formulários
- **Estados de loading** durante operações
- **Tratamento de erros** robusto
- **Interface responsiva** para diferentes dispositivos
- **Feedback visual** para ações do usuário

## 🛠️ Instalação e Configuração

### **Pré-requisitos**

- Node.js (versão 14 ou superior)
- npm ou yarn

### **Instalação**


# Clonar o repositório
git clone <url-do-repositorio>
cd SEU_REPOSITORIO

# Instalar dependências do backend
cd backend
npm install

# Voltar para a raiz e instalar dependências do frontend
cd ../frontend
npm install


## 🚀 Como Executar

Para que a aplicação funcione completamente, você precisará de dois terminais abertos simultaneamente.

Backend (Terminal 1)

cd backend
npm run dev 

Frontend (Terminal 2)

cd frontend
npm run dev

## 🌐 Acessos

### **Desenvolvimento Local**

Após iniciar os serviços, você poderá acessar:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **API Docs:** http://localhost:3000/api/livros

👨‍💻 Autor
Rafael Victor Desenvolvedor de Software em formação.

**📚 Biblioteca Online - Sistema completo de gerenciamento de livros** 🚀
