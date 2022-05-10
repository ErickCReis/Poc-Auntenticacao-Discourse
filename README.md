### Requisitos

- Node >=14.17
- Preencher .env com
  - Api e frontend do Discouse
  - Chave de acesso de admin no Discourse
  - Secret do Discouse Connect
  - Auth api do Gran

### Rotas

- `/login`: Página de login do usuário, deve ser utilizada nas configurações do Discourse como `discourse_connect_url`;
- `/auth`: Executa o login do usuário e rediciona para o Discouse, é chamada ao enviar o formulário no login;
- `/post`: Cria um tópico no Discouse com os dados enviados no body da requisição.

```json
{
  "userId": "222222",
  "topic": {
    "title": "Teste criação de post por api",
    "raw": "Apenas um teste utilizando um api local",
    "category": 6
  }
}
```
