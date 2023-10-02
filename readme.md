# Bookstore Demo API

Esta é uma API de demonstração desenvolvida para exercícios de automação de testes com Robot Framework. Foi construída utilizando JavaScript com [ExpressJS](https://expressjs.com/), persistência em memória com [LowDB](https://github.com/typicode/lowdb) e autenticação [JWT](https://jwt.io).

## Run from docker hub

```sh
$ docker run -d -p 3000:3000 --name bookstore-api-demo-from-hub thvieiraid/bookstore-api-demo:latest
```

## Run from local docker

First, build the Docker image: 

```sh
$ docker build . -t="bookstore-api-demo"
```

Then run with Docker: 

```sh
$ docker run -d -p 3000:3000 --name bookstore-api-demo bookstore-api-demo
```
