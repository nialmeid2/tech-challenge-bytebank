Esse projeto foi feito como entrega do tech challenge da primeira etapa do curso de pós graduaçãoem front-end da  Pós Tech-FIAP. Projeto feito por: Nicolas Elviani Lemos de Almeida (solo)

## Como rodar localmente

Rodar esse porjeto exige o uso da linha de comando. Sempre que algum comando for citado na lista abaixo, tenha em mente que se trata de comando do CMD aberto no diretório do projeto.

Como rodar esse projeto localmente:

1. Instale na sua máquina o banco de dados Postgres (Link: https://www.postgresql.org/download/). A aplicação é feita para rodar nele. Lembre-se bem da senha que definir no processo de instalação pq ela será importante depois.
	1. Se a senha definida contiver caracteres especiais (@ por exemplo), vá nesse link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent e digite a senha que escolheu. O que for retornado por ele é o que será usado na string de conexão

2. Na linha de comando, use `npm i` para instalar as dependências.

3. Crie um arquivo `.env` no diretório raiz da aplicação. É nele que estará contido tanto a string de conexão com o postgres (DATABASE_URL) quanto a complexidade da sua SaltKey para hashear a senha do usuário (SALT_ROUNDS), mas evite um número mto grande para que a aplicação não fique irresponsiva; Por questões de segurança, arquivos .env nunca são subidos para o repositório remoto

	1. Exemplo de string de conexão no arquivo .env: `DATABASE_URL="postgresql://postgres:MinhaSenha3%40%40@localhost:5432/bank_db?schema=public"`
	2. Exemplo de SALT_ROUNDS no .env: `SALT_ROUNDS=6`
	
4. Na linha de comando, use `npx prisma migrate dev` para gerar a sua base de dados na sua instalação do postgres

5. Na linha de comando, use `npm run dev` para rodar o projeto

6. Acesse a URL retornada pelo `npm run dev` no seu navegador