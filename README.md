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

# Rotas
Do Publisher:

POST /publish
* aceita um JSON com o seguinte formato:
```
{
	"channel": "Pitchulinhas",
	"message": {
		"user": "Pitchulinhas",
		"content": "Olá, Mundo!"
	}
}
```

DELETE /quit

# Rotas
Do Subscriber:

POST /subscribe

DELETE /subscribe

DELETE /quit
