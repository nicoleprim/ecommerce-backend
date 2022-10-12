## E-commerce Backend Shopper 🛒

Projeto que simula ecommerce que automatiza o processo de compras de produtos de supermercado. O usuário deve inserir nome, data de entrega e adicionar produtos que deseja ao carrinho. 

Desenvolvido para participação de processo seletivo de Desenvolvedora FullStack da Shopper.com.br.

### Tecnologias utilizadas:

- NodeJS
- TypeScript
- Express
- MYSQL
- Knex
- Jest

### Documentação Postman:
https://documenter.getpostman.com/view/21553035/2s83zmMNWm

### Deploy Heroku:
https://ecommerce-shopper.herokuapp.com/

## Endpoints

### Endpoint que retorna todos os produtos:
- Method: GET
- Path: `https://ecommerce-shopper.herokuapp.com/products`

Exemplo de retorno:
```
{
  "message": "Produtos renderizados com sucesso!",
  "products": [
    {
      "id": 19,
      "name": "ENERGÉTICO RED BULL ENERGY DRINK 250ML",
      "price": 7.29,
      "qty_stock": 907
    }
  ]
}
```

### Endpoint que retorna todos os pedidos:
- Method: GET
- Path: `https://ecommerce-shopper.herokuapp.com/orders`

Exemplo de retorno:
```
{
  "orders": [
    {
      "id": "09bdbd17-3c77-4272-9956-688518845cc6",
      "userName": "Fred",
      "deliveryDate": "2022-10-31T03:00:00.000Z",
      "products": [
        {
          "name": "GUARDANAPO DIA A DIA SCOTT 24X22CM C/ 50UN",
          "quantity": 3,
          "price": 2.59
        }
      ],
      "total": 7.77
    }
  ]
}
```

### Endpoint que cria pedidos:
- Method: POST
- Path: `https://ecommerce-shopper.herokuapp.com/orders/createorder`

Exemplo de entrada:
```
{
    "userName": "Nicole",
    "deliveryDate": "2022/12/11",
    "products": [
        {
            "id": 48,
            "quantity": 20
        }
    ]
}
```
Exemplo de retorno:
```
{
  "message": "Pedido realizado com sucesso"
}
```
Na realização de pedidos existem as seguintes validações:
- Caso não seja informado o nome do usuário:
```
{
  "message": "É obrigatório o preenchimento do campo 'nome'"
}
```
- Caso não seja informada a data de entrega:
```
{
  "message": "É obrigatório o preenchimento do campo 'data de entrega'"
}
```
- Caso não seja inserido nenhum produto no carrinho:
```
{
  "message": "Insira pelo menos um produto no carrinho para prosseguir"
}
```
- Caso a data de entrega informada não seja superior à três dias da data do pedido:
```
{
  "message": "Informe uma data futura. Conseguimos realizar a entrega a partir de 03 dias após a realização do pedido"
}
```
- Caso a quantidade de produtos solicitada seja maior do que a quantidade que existe em estoque:
```
{
  "message": "Não existe a quantidade solicitada de (nome do produto) em estoque. Temos (quantidade) produtos disponíveis para compra"
}
```

### Rodar o projeto:
Para rodar o projeto deve ser realizado o git clone, criar o arquivo .env e nesse arquivo informar os seguintes dados:
```
PORT =
DB_HOST =
DB_USER =
DB_PASSWORD =
DB_DATABASE =
```
Após, rodar os seguintes comandos:
```
npm install 
```
```
npm run migrations
```
```
npm run dev
```
Para testar:
```
npm run test
```

### Desenvolvido por <a href="https://www.linkedin.com/in/nicole-prim-478b6822b/"> Nicole Prim </a>
