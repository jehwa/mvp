const pgp = require('pg-promise')();


const db = pgp({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || 'mvp',
  user: process.env.PG_USER || 'postgres',
});

const findShop = (name) => {
  const query = `select id from shops where name='${name}'`
  return db.manyOrNone(query)
    .catch(err => console.log(err, 'is it an error?'));
}

const findCustomer = (shopId, name) => {
  const query = `select spc.customer_id, c.name from shop_per_customer spc inner join customers c on spc.customer_id=c.id where spc.shop_id=${shopId} and c.name like '%${name}%';`
  return db.many(query).catch(err => console.log(err));
}

module.exports = {
  findShop, findCustomer
}