### README para o Projeto React Ecommerce

Este é o repositório do frontend para o projeto de Ecommerce desenvolvido em React.

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado o Node.js e o Docker em sua máquina.

### Configuração do Backend

1. **Clonar o repositório do backend**
   ```
   git clone https://github.com/an-gabriel/ecommerce-server
   ```

2. **Instalar Dependências**
   ```
   cd ecommerce-server
   npm install
   ```

3. **Iniciar o Backend com Docker**
   ```
   docker-compose up --build -d
   ```

   Este comando utilizará Docker Compose para construir e iniciar o banco de dados necessário para o backend.

4. **Iniciar o Backend**
   ```
   npm run dev
   ```

   Este comando iniciará o servidor backend. Certifique-se de que o backend está sendo executado na porta adequada para que o frontend possa se conectar corretamente.

### Configuração do Frontend

1. **Clonar o repositório do frontend**
   ```
   git clone https://github.com/an-gabriel/ecommerce-web
   ```

2. **Instalar Dependências**
   ```
   cd ecommerce-web
   npm install
   ```

3. **Iniciar o Servidor de Desenvolvimento**
   ```
   npm start
   ```

   Este comando iniciará o servidor de desenvolvimento do React. Quando solicitado, confirme que deseja abrir o projeto em uma porta diferente da porta do backend.

### Funcionalidades

- **Descrição das Funcionalidades**
  - CRUD pedidos
  - CRUD endereço
  - CRUD cliente
  - CRUD produto 

### Tecnologias Utilizadas

- **React**: Utilizado para construir a interface do usuário.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **React Router**: Para navegação entre páginas.
- **Styled Components e MUI**: Para estilização dos componentes.
- **ESLint e Prettier**: Ferramentas para garantir código limpo e padronizado.

### Estrutura do Projeto

A estrutura do projeto segue os princípios de componentização e boas práticas de desenvolvimento React, visando modularidade e reutilização de código.

```
ecommerce-web/
│
├── public/             # Arquivos públicos
├── src/                # Código-fonte do frontend
│   ├── client/         # api de comunicação com o backend.
│   ├── components/     # Componentes React reutilizáveis
│
└── README.md           # Este arquivo
```

### Licença

Este projeto está licenciado sob a [Licença XYZ]. Veja o arquivo LICENSE para mais detalhes.