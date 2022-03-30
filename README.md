# Sist-Dist
Atividades feitas na Disciplina Sistemas Distribuídos no Curso de ADS do IFPB - Campus Cajazeiras.

# Como utilizar
Ambos os arquivos .env devem ser configurados de acordo com o host e a porta do servidor do Redis, assim como com a porta que o express deverá estar rodando.
Exemplo:

```
REDIS_HOST = 172.19.0.2
REDIS_PORT = 6379

PORT = 3001
```

Após isso, é necessário iniciar os servidores Express (Um dos quais é utilizado para simular um amiguinho, e o outro, outro amiguinho :3).

# Rotas

POST /login
* aceita um JSON com o seguinte formato:
```{
	"username": "Diogo"
}
```

POST /publish
* aceita um JSON com o seguinte formato:
```{
	"message": {
		"user": {
			"id": 0,
			"username": "Diogo"
		},
		"content": "Olá, Mundo!"
	}
}
```

DELETE /quit
* serve para desconectar o cliente.
