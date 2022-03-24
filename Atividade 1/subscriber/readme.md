## Miniprojeto

  Trabalho realizado para a disciplina de Banco de Dados II, do curso de Análise e Desenvolvimento de Sistemas no IFPB.

## Utilização
  
  1. Execute npm i
  2. Execute npm start
  3. Modifique o arquivo .env com os parâmetros de conexão com o banco e de conexão com o cache da seguinte forma:

	TABLE_NAME = [nome da tabela dos produtos]
	TABLE_COLUMN1 = [nome do campo com o id do produto]
	TABLE_COLUMN2 = [nome do campo com o nome do produto]
	TABLE_COLUMN3 = [nome do campo com a quantidade do produto]
	TABLE_COLUMN4 = [nome do campo com o preço do produto]

	DB_USER = [usuário do postgres]
	DB_HOST = [host para efetuar a conexão com o postgres]
	DB_DATABASE = [nome do banco do postgres]
	DB_PASSWORD = [senha de usuário do postgres]
	DB_PORT = [porta com a qual é feita a conexão com o postgres]

	REDIS_HOST = [ip de conexão com o redis]
	REDIS_PORT = [porta de conexão com o redis]

	PORT = [porta de conexão com o server do node]

  4. A interação com o estoque de produtos se dá por meio dos seguintes links:

	localhost:[PORT]/insert/[id]/[nome]/[quantidade]/[preco] para inserir um novo produto no banco
	localhost:[PORT]/find/[id] para buscar um produto no cache, se tiver lá, ou no postgres, caso não esteja
	localhost:[PORT]/update/[id]/[novoid]/[nome]/[quantidade]/[preco] para atualizar um produto com dado id
	localhost:[PORT]/remove/[id] para excluir um item do banco e, se tiver no cache, do cache também

