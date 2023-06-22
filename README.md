# find-a-friend-api

A api focused on pet adoption logic, created using Nodejs + Typescript + SOLID principles  

This is a project used for study purposes only • [Samir El Hassan](https://github.com/samirelhassann)


## Language and Tools

<p align="left"> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

## Additional Libraries

- fastify
- prisma
- zod
- vitest

## Installation

Install all the packages

```bash
yarn install
```

start the postgres sql

```bash
docker compose up -d
```

Generate the prisma typescript and generate the local database

```bash
yarn prisma generate && yarn prisma migrate dev
```

## Usage

create a .env file following the values on .env.example, after that run:

```bash
yarn dev
```

## Test

Unit tests:

```bash
yarn test
```


### Application Rules

- [X] It must be possible to register a pet
- [X] It should be possible to list all pets available for adoption in a city
- [X] It should be possible to filter pets by their characteristics
- [X] It must be possible to view details of a pet for adoption
- [X] It must be possible to register as an ORG
- [X] Must be able to login as an ORG

### Business rules

- [X] To list the pets, we must inform the city
- [X] An ORG needs to have an address and a WhatsApp number
- [X] A pet must be linked to an ORG
- [X] The user who wants to adopt will contact the ORG via WhatsApp
- [X] All filters other than city are optional
- [X] For an ORG to access the application as admin, it needs to be logged in
