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
  phone_number TEXT NOT NULL
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
  remaining_count integer NOT NULL
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

INSERT INTO shops (name) VALUES ('Admin');
INSERT INTO customers (name, email, phone_number) VALUES
  ('ryan', 'ryan_fake@gmail.com', '123-123-1234'),
  ('fiona', 'fiona_fake@gmail.com', '234-234-2345'),
  ('mat C', 'mat_fake@gmail.com', '345-345-3456'),
  ('rysa', 'rysa_fake@gmail.com', '456-456-4567');
INSERT INTO services (service) VALUES 
  ('blow-dry'),
  ('coloring'),
  ('scalp care');
INSERT INTO shop_per_customer VALUES 
  (1,1),
  (1,2),
  (1,3),
  (1,4);


-- run psql postgres < schema.sql