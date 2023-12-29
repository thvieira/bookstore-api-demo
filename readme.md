# Bookstore Demo API

Esta é uma API de demonstração desenvolvida para exercícios de automação de testes com Robot Framework. Foi construída utilizando JavaScript com [ExpressJS](https://expressjs.com/), persistência em memória com [LowDB](https://github.com/typicode/lowdb) e autenticação [JWT](https://jwt.io).

Esta API possui dois serviços, `/auth` para autenticação e `/books` para gerenciamento de livros no catálogo da livraria.

## Subir o container diretamente do DockerHub

```sh
$ docker run -d -p 3000:3000 --name bookstore-api-demo-from-hub thvieiraid/bookstore-api-demo:latest
```

## Subir container localmente

Primeiramente, construa a imagem Docker: 

```sh
$ docker build . -t="bookstore-api-demo"
```

Então execute uma instância do container Docker: 

```sh
$ docker run -d -p 3000:3000 --name bookstore-api-demo bookstore-api-demo
```

## Autenticação

Os dados de autenticação na API são configurados no arquivo `.env` e por padrão são:

```sh
DEFAULT_USER = AnaTerra
DEFAULT_PASS = ana123
```

Realize a autenticação através do serviço `/auth` e utilize o token JWT gerado através do cabeçalho `x-access-token`.