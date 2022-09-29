/*
endpoint 2: пополнение баланса пользователя через демоверсию платежной системы 
postgres, без ORM, 2 таблицы: users с полем balance, payments
*/

CREATE TABLE users (
    id serial PRIMARY KEY, 
    username VARCHAR (50) NOT NULL,
    balance DECIMAL NOT NULL
);

CREATE TABLE payments (
    id VARCHAR (50) PRIMARY KEY,
    status VARCHAR (10) NOT NULL,
    amount DECIMAL NOT NULL
);
