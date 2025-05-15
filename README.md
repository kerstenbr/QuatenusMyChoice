![Logo](https://i.imgur.com/MTVXJmQ.png)

O Quatenus MyChoice é uma ferramenta interna da Quatenus Brasil, usada pra facilitar e simplificar a visualização das famílias de produtos e auxiliar o usuário a entender melhor o produto.

## Screenshots

Página inicial:
![Screenshot](https://i.imgur.com/Txrj46i.png)

Pesquisa:
![Screenshot](https://i.imgur.com/8PGYWhl.png)

Informação sobre a família de produto 'Fleet Basic':
![Screenshot](https://i.imgur.com/RogpZLM.png)

Página do estoque:
![Screenshot](https://i.imgur.com/hRruS9F.png)

Informação do que deve ser enviado para o produto 'FT.BASIC - Carro':
![Screenshot](https://i.imgur.com/0cz7OfO.png)

## Stack utilizada

**Frontend:** React, Bootstrap

**Backend:** Node, Express

**Database:** MongoDB

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

Para o backend:

`DB_URI` - URI do mongodb

`SECRET_JWT` - Hash string, ex: yajznbmahjd

`SECRET_JWT_EXP` - Expiração do token JWT, ex: 24h

Opcional:

`PORT` - Padrão é 5555

Para o frontend:

`VITE_BASE_URL` - URL base do site, ex: http://localhost:3000

Opcional:

`VITE_GA_LINK` - Link para a pasta que contém os Guias de Ativação

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
  GET /api/families/search?name={name}
```

| Parâmetro | Tipo     | Descrição        |
| :-------- | :------- | :--------------- |
| `name`    | `string` | **Obrigatório**. |

#### Retorna uma família pelo id

```http
  GET /api/families/{id}
```

| Parâmetro | Tipo       | Descrição        |
| :-------- | :--------- | :--------------- |
| `id`      | `ObjectId` | **Obrigatório**. |

#### Baixa um arquivo excel contendo todas as famílias

```http
  GET /api/families/download
```

| Parâmetro | Tipo     | Descrição                                                         |
| :-------- | :------- | :---------------------------------------------------------------- |
| `token`   | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

#### Cria uma família

```http
  POST /api/families/
```

| Parâmetro | Tipo     | Descrição                                                         |
| :-------- | :------- | :---------------------------------------------------------------- |
| `token`   | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

name, qbmCode e desc são obrigatórios. Exemplo de `body` a ser enviado:

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
  "products": [
    {
      "name": "Fleet Teste",
      "qbmCode": "ft.teste",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      "price": {
        "withMembership": ["1000", "120", "115", "110"],
        "noMembership": ["200", "195", "190", "185", "180"],
        "renovation": ["150", "160", "170"],
        "closure": "100",
      },
      "telemetry": {
        "digital": "3",
        "analog": "2"
      }
    },
    {
      "name": "Fleet Teste 2",
      "qbmCode": "ft.teste.2",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      "price": {
        "withMembership": ["1000", "120", "115", "110"],
        "noMembership": ["200", "195", "190", "185", "180"],
        "renovation": ["150", "160", "170"],
        "closure": "200",
      }
    }
  ]
}
```

#### Cria famílias via arquivo excel

```http
  POST /api/families/upload
```

| Parâmetro | Tipo          | Descrição                                                         |
| :-------- | :------------ | :---------------------------------------------------------------- |
| `file`    | `xls ou xlsx` | **Obrigatório**. Arquivo excel que será lido                      |
| `token`   | `string`      | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

#### Editar uma família

```http
  PUT /api/families/{id}
```

| Parâmetro | Tipo       | Descrição                                                         |
| :-------- | :--------- | :---------------------------------------------------------------- |
| `id`      | `ObjectId` | **Obrigatório**.                                                  |
| `token`   | `string`   | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

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

| Parâmetro | Tipo       | Descrição                                                         |
| :-------- | :--------- | :---------------------------------------------------------------- |
| `id`      | `ObjectId` | **Obrigatório**.                                                  |
| `token`   | `string`   | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

### Usuários:

#### Retorna todos os usuários

```http
  GET /api/user/
```

| Parâmetro | Tipo     | Descrição                                                         |
| :-------- | :------- | :---------------------------------------------------------------- |
| `token`   | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

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

| Parâmetro | Tipo       | Descrição                                   |
| :-------- | :--------- | :------------------------------------------ |
| `id`      | `ObjectId` | **Obrigatório**.                            |
| `token`   | `string`   | **Obrigatório no Header**. Token do usuário |

#### Editar um usuário

```http
  PUT /api/user/{id}
```

| Parâmetro | Tipo       | Descrição                                                         |
| :-------- | :--------- | :---------------------------------------------------------------- |
| `id`      | `ObjectId` | **Obrigatório**.                                                  |
| `token`   | `string`   | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

Exemplo de `body` a ser enviado:

```json
{
  "email": "email@email.com"
}
```

#### Deletar um usuário

```http
  DELETE /api/user/{id}
```

| Parâmetro | Tipo       | Descrição                                                         |
| :-------- | :--------- | :---------------------------------------------------------------- |
| `id`      | `ObjectId` | **Obrigatório**.                                                  |
| `token`   | `string`   | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

### Setores:

#### Retorna todos os setores

```http
  GET /api/role/
```

| Parâmetro | Tipo     | Descrição                                                         |
| :-------- | :------- | :---------------------------------------------------------------- |
| `token`   | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

#### Criar um setor

```http
  POST /api/role/
```

| Parâmetro | Tipo     | Descrição                                                         |
| :-------- | :------- | :---------------------------------------------------------------- |
| `token`   | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

Exemplo de `body` a ser enviado:

```json
{
  "name": "vendas",
  "active": true
}
```

### B.O.M:

#### Retorna todos os boms

```http
  GET /api/bom/
```

#### Retorna os boms que contém o produto procurado

```http
  GET /api/bom/search?qbmCode={qbmCode}
```

| Parâmetro | Tipo     | Descrição        |
| :-------- | :------- | :--------------- |
| `qbmCode` | `string` | **Obrigatório**. |

#### Retorna um bom pelo id

```http
  GET /api/bom/{id}
```

| Parâmetro | Tipo       | Descrição        |
| :-------- | :--------- | :--------------- |
| `id`      | `ObjectId` | **Obrigatório**. |

#### Baixa um arquivo excel contendo todos os boms

```http
  GET /api/bom/download
```

| Parâmetro | Tipo     | Descrição                                                         |
| :-------- | :------- | :---------------------------------------------------------------- |
| `token`   | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

#### Cria uma família

```http
  POST /api/bom/
```

| Parâmetro | Tipo     | Descrição                                                         |
| :-------- | :------- | :---------------------------------------------------------------- |
| `token`   | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

qbmCode é obrigatório. Exemplo de `body` a ser enviado:

```json
{
  "qbmCode": "FT.BASIC",
  "car": {
    "observation": "",
    "starsoftCode": ["00", "01", "02", "05"],
    "itens": ["RASTREADOR", "CHIP", "CHICOTE", "Kit de Instalação"],
    "unit": ["un", "un", "un", "kit"],
    "quantity": ["1", "1", "1", "1"]
  },
  "machine": {
    "observation": "",
    "starsoftCode": [],
    "itens": [],
    "unit": [],
    "quantity": []
  },
  "motorcycle": {
    "observation": "",
    "starsoftCode": [],
    "itens": [],
    "unit": [],
    "quantity": []
  },
  "truck": {
    "observation": "",
    "starsoftCode": [],
    "itens": [],
    "unit": [],
    "quantity": []
  },
  "vessel": {
    "observation": "",
    "starsoftCode": [],
    "itens": [],
    "unit": [],
    "quantity": []
  }
}
```

#### Cria boms via arquivo excel

```http
  POST /api/bom/upload
```

| Parâmetro | Tipo          | Descrição                                                         |
| :-------- | :------------ | :---------------------------------------------------------------- |
| `file`    | `xls ou xlsx` | **Obrigatório**. Arquivo excel que será lido                      |
| `token`   | `string`      | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

#### Editar um bom

```http
  PUT /api/bom/{id}
```

| Parâmetro | Tipo     | Descrição                                                         |
| :-------- | :------- | :---------------------------------------------------------------- |
| `token`   | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |

Exemplo de `body` a ser enviado:

```json
{
  "qbmCode": "FT.BASIC.TESTE2"
}
```

#### Deletar um bom

```http
  DELETE /api/bom/{id}
```

| Parâmetro | Tipo     | Descrição                                                         |
| :-------- | :------- | :---------------------------------------------------------------- |
| `token`   | `string` | **Obrigatório no Header**. Token do usuário, precisa ser um admin |
