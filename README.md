# Canil Zannine

Sistema de gerenciamento para o Canil Zannine, desenvolvido com Next.js e Prisma.

## 🚀 Começando

### Pré-requisitos

- Node.js 18.0.0 ou superior
- npm ou yarn
- SQLite (já incluído no Node.js)

### 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd canil-zannine
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="seu_segredo_secreto_aqui"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Inicie o banco de dados e execute as migrações**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Execute o seeder para criar o usuário de teste**
   ```bash
   npm run seed
   # ou
   yarn seed
   ```

6. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

7. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🔑 Credenciais de Teste

Após executar o seeder, as seguintes credenciais estarão disponíveis:

- **Email:** teste@teste.com
- **Senha:** teste123

## 🛠 Estrutura do Projeto

```
canil-zannine/
├── prisma/
│   ├── migrations/    # Migrações do banco de dados
│   ├── schema.prisma  # Esquema do banco de dados
│   └── seed.ts        # Dados iniciais
├── src/
│   ├── app/           # Rotas da aplicação
│   ├── components/    # Componentes React
│   └── lib/           # Utilitários e configurações
├── .env               # Variáveis de ambiente (não versionado)
└── package.json       # Dependências e scripts
```

## 📦 Comandos Úteis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a versão de produção
- `npm start` - Inicia o servidor de produção
- `npm run seed` - Executa o seeder do banco de dados
- `npx prisma studio` - Abre o Prisma Studio para visualizar o banco de dados

## 🔄 Banco de Dados

O projeto utiliza SQLite com Prisma ORM. Para visualizar e gerenciar o banco de dados, você pode usar o Prisma Studio:

```bash
npx prisma studio
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça o push da branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## ✨ Agradecimentos

- Equipe de desenvolvimento
- Todos os contribuidores que ajudaram neste projeto
