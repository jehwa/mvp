const express = require('express');
const app = express();
const db = require('../database/index');

const port = process.env.PORT || 3000

app.use(express.json());

app.get('/shop/:shopName', (req, res) => {
  let shopName = req.url.split('/')[2];
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
      if(data == undefined) {
        res.status(200).send(JSON.stringify([]))
      } else {
        res.status(200).send(JSON.stringify(data))
      }
    })
    .catch(err => res.status(500).send(err));

})

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;