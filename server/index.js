const express = require('express');
const app = express();
const db = require('../database/index');
const helper = require('./helper');

const port = process.env.PORT || 3000

app.use(express.json());

app.get('/shop/login/:shopName', (req, res) => {
  let shopName = req.url.split('/')[3];
  console.log('got login request!')
  db.findShop(shopName)
    .then(data => res.status(200).send(JSON.stringify(data[0])))
    .catch(err => res.status(500).send(err));
})

app.get('/shop/:shopId/:searchName', (req, res) => {
  let shopId = req.url.split('/')[2];
  let searchName = req.url.split('/')[3].toLowerCase();
  // console.log(shopId, searchName);
  db.findCustomer(shopId, searchName)
    .then(data => {
      // console.log(data);
      if(data == undefined) {
        res.status(200).send(JSON.stringify([]))
      } else {
        res.status(200).send(JSON.stringify(data))
      }
    })
    .catch(err => res.status(500).send(err));
})

app.get('/customer/:shopId/:customerId', (req, res) => {
  // let shopId = req.url.split('/')[2];
  let customerId = req.url.split('/')[3];
  db.bringCusInfo(customerId)
    .then(data => helper.dataStructure(data))
    .then(data => res.status(200).send(JSON.stringify(data)))
    .catch(err => res.status(500).send(err)); 
})

app.post('/customer/update', (req, res) => {
  console.log(req.body, 'it should contain service Id!!');
  db.usePackage(req.body.packageId, req.body.signature, req.body.date)
    .then(() => res.status(200).send('db updated!'))
    .catch((err) => res.status(500).send(err));
  //req.body { packageId: 2 }
  // { packageId: 1,
  //   signature: 'Asdf',
  //   date: '2018-07-09T20:46:08.843Z' } 'it should contain service Id!!'
})

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;