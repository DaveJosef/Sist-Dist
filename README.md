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

Após isso, é necessário iniciar os dois servidores Express, tanto o publisher (utilizado para enviar mensagens nos canais), quanto o subscriber (que será notificado a cada mensagem nova nos canais nos quais estiver inscrito).

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
