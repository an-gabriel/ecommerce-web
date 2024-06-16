# Use uma imagem Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do aplicativo
COPY . .

# Exponha a porta em que o aplicativo React será servido
EXPOSE 3000

# Comando para iniciar o aplicativo React
CMD ["npm", "start"]
