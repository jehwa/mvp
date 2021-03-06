DROP DATABASE IF EXISTS mvp;

CREATE DATABASE mvp;

-- USE restaurant;
\c mvp;

CREATE TABLE shops(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE customers(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone_number TEXT NOT NULL,
  photo TEXT
);

CREATE TABLE services(
  id SERIAL PRIMARY KEY,
  service TEXT NOT NULL
);

CREATE TABLE purchase(
  id SERIAL PRIMARY KEY,
  shop_id integer REFERENCES shops(id),
  customer_id integer REFERENCES customers(id),
  service_id integer REFERENCES services(id),
  purchase_date DATE NOT NULL,
  total_count integer NOT NULL,
  remaining_count integer NOT NULL,
  amount integer NOT NULL
);

CREATE TABLE used(
  purchase_id integer REFERENCES purchase(id),
  used_date DATE NOT NULL,
  signature TEXT
);

CREATE TABLE shop_per_customer(
  shop_id integer REFERENCES shops(id),
  customer_id integer REFERENCES customers(id)
);

CREATE TABLE shop_per_service(
  shop_id integer REFERENCES shops(id),
  service_id integer REFERENCES services(id)
);

INSERT INTO shops (name) VALUES ('Admin');
INSERT INTO customers (name, email, phone_number, photo) VALUES
  ('ryan', 'ryan_fake@gmail.com', '123-123-1234', 'https://s3-us-west-1.amazonaws.com/picture-nerdstrom/0120cf15-e9af-4a6c-8e75-a165b3016c7d.jpg'),
  ('fiona', 'fiona_fake@gmail.com', '234-234-2345', null),
  ('mat C', 'mat_fake@gmail.com', '345-345-3456', null),
  ('rysa', 'rysa_fake@gmail.com', '456-456-4567', null);
INSERT INTO services (service) VALUES 
  ('blow-dry'),
  ('coloring'),
  ('scalp care');
INSERT INTO shop_per_customer VALUES 
  (1,1),
  (1,2),
  (1,3),
  (1,4);

INSERT INTO shop_per_service VALUES
  (1,1),
  (1,2),
  (1,3);

INSERT INTO purchase (shop_id, customer_id, service_id, purchase_date, total_count, remaining_count, amount) VALUES
  (1, 1, 1, '2018-3-5', 10, 7, 100),
  (1, 1, 1, '2018-5-7', 10, 10, 150),
  (1, 1, 2, '2018-5-7', 10, 10, 200);

INSERT INTO used VALUES
  (1, '2018-3-5', 'sign'),
  (1, '2018-4-1', 'sign2'),
  (1, '2018-5-3', 'sign3');


-- run psql postgres < schema.sql