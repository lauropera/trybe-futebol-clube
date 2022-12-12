# ⚽ Trybe Futebol Clube

![Preview do Trybe Futebol Clube](./images/project-preview.png)

## 📡 Objetivo

Essa aplicação tem como objetivo ser um site informativo sobre partidas e classificações de futebol. Você pode consultar como está o andamento de partidas, se estiver logado pode adicionar ou editar uma partida.

<br />

## ⚙️ Tecnologias e Ferramentas

<div>
  <img
    src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"
    alt="HTML5"
  >
  <img
    src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"
    alt="CSS3"
  >
  <img
    src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"
    alt="JavaScript"
  >
  <img
    src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"
    alt="React"
  >
  <img
    src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"
    alt="React Router"
  >
  <img
    src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"
    alt="Docker"
  />
  <img
    src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"
    alt="MySQL"
  >
  <img
    src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"
    alt="Node.js"
  >
  <img
    src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"
    alt="TypeScript"
  />
  <img
    src="https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white"
    alt="Mocha"
  />
  <img
    src="https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white"
    alt="Chai"
  />
  <img
    src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"
    alt="Express.js"
  />
    <img
    src="https://img.shields.io/badge/Sequelize-1572b6?style=for-the-badge&logo=sequelize&logoColor=white"
    alt="Sequelize"
  />
  <img
    src="https://img.shields.io/badge/Json%20Web%20Tokens-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"
    alt="Json Web Tokens"
  />
</div>

<br />

# 🚀 Instalação e execução

<details>
<summary>Instalação e execução com Docker</summary>
<br />

Para rodar está aplicação é necessário ter **Git**, **Docker** e o **Docker Compose** instalados no seu computador. O Docker Compose precisa estar na versão **1.29** ou superior.

Para conseguir executar os comandos do abaixo também é necessário que seu sistema operacional tenha um terminal Bash instalado. Caso você esteja utilizando Linux ou macOS, o Bash já vem instalado por padrão. Porém, se o seu sistema for Windows, você pode [aprender como instalar](https://dicasdeprogramacao.com.br/como-instalar-o-git-no-windows/).

### 1 - Clone o repositório:

```
git clone git@github.com:lauropera/trybe-futebol-clube.git
```

### 2 - Na raíz do projeto, suba os containers do frontend (`app_frontend`), backend (`app_backend`) e o banco de dados (`db`) com o comando:

    npm run compose:up

Os containers estão mapeados nas seguintes portas:

- app_frontend: 3000
- app_backend: 3001
- db: 3002

Para parar os containers, na pasta raiz do projeto execute o comando:

    npm run compose:down

### 3 - Acessando o Frontend

Para acessar o frontend, vá em seu navegador acesse a rota:

    http://localhost:3000

### 4 - Usuários para fazer login

Nessa aplicação é necessário fazer o login com um email e senha. A tabela abaixo disponibiliza usuários pré-cadastrados para o acesso:

| Email             | Senha        |
| ----------------- | ------------ |
| admin@admin.com   | secret_admin |
| user@user.com     | secret_user  |

</details>
<br />

# ☕ Testes

### Para você pode ver a cobertura dos testes utilize os seguintes comandos:

Entre no terminal container do backend

    docker exec -it app_backend sh

Execute o comando para ver a cobertura

    npm run test:coverage

Para poder sair do terminal do container execute o comando dentro do próprio

    exit

<br />

#

<div>
  <p align="center">🍐</p>
</div>
