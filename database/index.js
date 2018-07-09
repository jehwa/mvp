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

const bringCusInfo = (cusId) => {
  const query = `select c.name, c.email, c.phone_number, p.id, p.shop_id, p.customer_id, s.service, p.service_id, p.purchase_date, p.total_count, p.remaining_count, u.used_date, u.signature from customers c left join purchase p on c.id=p.customer_id left join used u on p.id=u.purchase_id left join services s on s.id=p.service_id where c.id=${cusId} and p.remaining_count > 0;`

  return db.any(query).catch(err => console.log(err));
}

module.exports = {
  findShop, findCustomer, bringCusInfo
}