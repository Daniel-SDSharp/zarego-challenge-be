## Description

API for zarego challenge. Handles data from https://data.world/adamhelsinger/globe-project.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints

### Leadership Controller

#### List All Leadership Data

- **Endpoint:** `GET /leadership/all`
- **Query Parameters:**
  - `page` (optional, default: 1) - The page number for pagination.
  - `rows` (optional, default: 50) - The number of rows per page.
- **Description:** Retrieves a paginated list of all leadership data.
- **Example:** GET http://localhost:3000/leadership/all?page=1&rows=50

#### Find Leadership Data by Selected Countries

- **Endpoint:** `GET /leadership/countries`
- **Query Parameters:**
  - `list` (required) - A comma-separated list of country IDs.
  - `page` (optional, default: 1) - The page number for pagination.
  - `rows` (optional, default: 50) - The number of rows per page.
- **Description:** Retrieves a paginated list of leadership data for the specified countries.
- **Example:** GET http://localhost:3000/leadership/countries?list=US,CA,MX&page=1&rows=50

### Country Controller

#### List All Countries

- **Endpoint:** `GET /countries`
- **Description:** Retrieves a list of all countries.
- **Example:** GET http://localhost:3000/leadership/countries

#### Find Country by Name

- **Endpoint:** `GET /countries/countries`
- **Query Parameters:**
  - `list` (required) - A comma-separated list of country names.
- **Description:** Retrieves the country details for the specified country names.
- **Example:** GET http://localhost:3000/countries/countries

### Imports Controller

#### Import Data from CSV

- **Endpoint:** `GET /imports`
- **Description:** Imports leadership and country data from a CSV file.
- **Example:** GET http://localhost:3000/imports


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
