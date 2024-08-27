
![Logo](https://i.imgur.com/MTVXJmQ.png)

O Quatenus MyChoice é uma ferramenta interna da Quatenus Brasil. 
Usada pra facilitar e simplificar a visualização das famílias de produtos e auxiliar o usuário a entender melhor o produto.

## Screenshots

![App Screenshot](https://i.imgur.com/jax2qzQ.png)
![App Screenshot](https://i.imgur.com/7noOxyj.png)
![App Screenshot](https://i.imgur.com/hhvGZIv.png)

## Stack utilizada

**Frontend:** React, Bootstrap
**Backend:** Node, Express
**Database:** MongoDB

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

Para o backend:
`DB_URI`
`SECRET_JWT` 
`SECRET_JWT_EXP`

Opcional: `PORT`

Para o frontend:
`VITE_BASE_URL`

Opcional: `VITE_GA_LINK`


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/kerstenbr/QuatenusMyChoice.git
```

Entre no diretório do projeto

```bash
  cd quatenusmychoice
```

Instale as dependências do backend

```bash
  cd backend
```

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```
Instale as dependências do frontend
```bash
  cd frontend
```

```bash
  npm install
```

Inicie o servidor
```bash
  npm run dev
```

## Documentação da API

### Famílias:

#### Retorna todas as famílias

```http
  GET /api/families/
```

#### Retorna as famílias que contém o produto procurado

```http
  GET /api/families/search?name={}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. Retorna todas as famílias que contém o produto com o nome pesquisado |

#### Retorna uma família

```http
  GET /api/families/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `ObjectId` | **Obrigatório**. O ID da família que você quer |

#### Cria uma família

```http
  POST /api/families/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nome`      | `string` | **Obrigatório**. Nome da família de produtos |
| `token`      | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

Exemplo de `body` a ser enviado:

```json
{
  "name": "Fleet Teste",
  "qbmCode": "ft.teste",
  "bannerLink": "https://i.imgur.com/hANG5AI.png",
  "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  "observations": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "links": {
    "Google": "https://www.google.com/"
  },
  "canvaLink": "https://i.imgur.com/b8CiUT3.png",
  "addInfoLink": "https://i.imgur.com/7FcJhFx.png",
  "products": {
    "Fleet Teste": {
      "qbmCide": "ft.teste",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      "price": {
        "withMembership": [
          "1000",
          "120",
          "115",
          "110"
        ],
        "noMembership": [
          "200",
          "195",
          "190",
          "185",
          "180"
        ],
        "closure": "100",
        "renovationCLosure": "50"
      },
      "telemetry": {
          "digital": "3",
          "analog": "2"
      }
    },
    "Fleet Teste 2": {
      "qbmCide": "ft.teste.2",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      "price": {
        "withMembership": [
          "1000",
          "120",
          "115",
          "110"
        ],
        "noMembership": [
          "200",
          "195",
          "190",
          "185",
          "180"
        ],
        "closure": "200",
        "renovationCLosure": "150"
      }
    }
  }
}
```

#### Editar uma família

```http
  PUT /api/families/{id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `ObjectId` | **Obrigatório**. O ID da família que você quer |
| `token`      | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

Exemplo de `body` a ser enviado:

```json
{
  "name": "Fleet Teste Editado"
}
```

#### Deletar uma família

```http
  DELETE /api/families/{id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `ObjectId` | **Obrigatório**. O ID da família que você quer excluir|
| `token`      | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

### Usuários:

#### Retorna todos os usuários

```http
  GET /api/user/
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token`      | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

#### Registrar

```http
  POST /api/user/register
```

Exemplo de `body` a ser enviado:

```json
{
  "email": "email@email.com",
  "password": "123"
}
```
#### Login

```http
  POST /api/user/login
```
Exemplo de `body` a ser enviado:

```json
{
  "email": "email@email.com",
  "password": "123"
}
```

#### Encontrar usuário

```http
  GET /api/user/findUser/{id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `ObjectId` | **Obrigatório**. O ID do usuário que você quer encontrar|
| `token`      | `string` | **Obrigatório no Header**. Token do usuário |

#### Editar um usuário

```http
  PUT /api/user/{id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `ObjectId` | **Obrigatório**. O ID da usuário que você quer editar|
| `token`      | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

Exemplo de `body` a ser enviado:

```json
{
  "email": "email@email.com",
}
```

#### Deletar um usuário

```http
  DELETE /api/user/{id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `ObjectId` | **Obrigatório**. O ID do usuário que você quer excluir|
| `token`      | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

### Setores:

#### Retorna todos os setores

```http
  GET /api/role/
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token`      | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

#### Criar um setor

```http
  POST /api/role/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token`      | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

Exemplo de `body` a ser enviado:

```json
{
  "name": "vendas",
  "active": true
}
```
