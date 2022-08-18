const express = require('express')
express();
const { v4: uuidv4 } = require("uuid");
const app = express();
const axios = require('axios');
const cors = require ("cors");
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.listen();
// const { PORT, BACKEND_URL } = process.env;
// require("dotenv").config();
const mysql = require('mysql');
const fs = require('fs');
const PORT = 8081;
function readLeads() {
  const leads = fs.readFileSync('./leads.json');
  const parsedData = JSON.parse(leads);
  return parsedData;
}
const leads = readLeads();

function writeNewLead(data) {
fs.writeFileSync('./leads.json', JSON.stringify(data, space=4));
(err) => {
  if(err) throw err;
}
}
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    insecureAuth : true,
    database: 'good_greek_assesment_db'

  });
  connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

app.listen(PORT, function(err) {
    if(err) console.log('Error in server setup');
    console.log(`listening on port ${PORT}`)

})
app.get('/', (req, res)=> {
  res.send('Welcome to my assessment!')
})
app.get('/leads', function (req, res) {
  res.send(leads)
});

app.use(bodyParser.urlencoded({extended: true}))
app.post('/leads', (req, res)=> {
  const {
    firstName, 
    lastName, 
    phone, 
    email, 
    address} = req.body;

  const sqlInsert = "INSERT INTO leads (firstName, lastName, phone, email, address) VALUES (?, ?, ?, ?, ?);"
  connection.query(sqlInsert, [firstName, lastName, phone, email, address], (err, res)=> {
    console.log(res)
})});
app.get('/leads/get', (req, res)=> {
  const sqlSelect = 
  'SELECT * from leads';
  connection.query(sqlSelect, (err, result)=> {
    // console.log(res)
    res.send(result);
})});
app.delete('/delete/:firstName', (req, res)=> {
  const firstName = req.params.firstName;
  const sqlDelete = "DELETE from leads WHERE firstName = ?;"
  connection.query(sqlDelete, firstName, (err, res)=> {
    if (err) console.log(err)
})
})
// console.log(req.body);
//This is Useful for Server Only
// const newLead = {
//   // id: uuidv4(),
//   firstName: firstName,
//   lastName: lastName,
//   phone: phone,
//   email: email,
//   address: address
// };
// console.log(leads);
// const updatedLeads = [...leads, newLead];
// writeNewLead(updatedLeads);