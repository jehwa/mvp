
const dataStructure = (dataArr) => {
  let output = {
    customer_id: dataArr[0].customer_id,
    photo: dataArr[0].photo,
    name: dataArr[0].name,
    email: dataArr[0].email,
    phone_number: dataArr[0].phone_number,
}
dataArr.forEach(obj => {
    if(output[obj.service_id] === undefined) {
        output[obj.service_id] = {};
        output[obj.service_id][obj.id] = {packageId: obj.id, serviceId: obj.service_id, service: obj.service, purchase_date: obj.purchase_date, total_count: obj.total_count, remaining_count: obj.remaining_count, used: []}
    }
    if(output[obj.service_id] && !output[obj.service_id][obj.id]) {
       output[obj.service_id][obj.id] = {packageId: obj.id, serviceId: obj.service_id, service: obj.service, purchase_date: obj.purchase_date, total_count: obj.total_count, remaining_count: obj.remaining_count, used: []}            
    }
    if(output[obj.service_id] && output[obj.service_id][obj.id] && obj.used_date) {
        output[obj.service_id][obj.id].used.push({used_date: obj.used_date, signature: obj.signature});
    }      
  });
  return output;
}

module.exports = {
  dataStructure,
};