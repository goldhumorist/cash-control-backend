# Cash-control-backend

The Cash-control-backend is a API of Cash-Control web-service

---

## Setup

---

1. Install dependencies

   `npm install`

2. Build docker container for database

   `docker compose up`

3. Create .env file in root directory

   `.env`

4. Add all needed ENV variables in .env file

   > (example at the bottom)

5. Run application

   `npm run watch`

---

## ENV Variables

---

| Name        | example      |
| ----------- | ------------ |
| PORT        | 7777         |
| DB_HOST     | localhost    |
| DB_PORT     | 5432         |
| DB_NAME     | cash-control |
| DB_USER     | postgres     |
| DB_PASSWORD | postgres     |
| JWT_SECRET  | JWT Secret   |
