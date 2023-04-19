const express = require('express'),
    dbOperation = require('./dbFiles/dbOperation'),
    cors = require('cors');
const hotel = require('./dbFiles/hotel');

const API_PORT = process.env.PORT || 5000;
const app = express();

// defining some varaibales for mongoDB
let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/api', async (req, res) => {
    const result = await dbOperation.createEmployee(req.body.name)
    console.log('body: ', result);
    res.send(result.recordset);
})

app.post('/hello', async (req, res) => {
    await dbOperation.createThenGet(req.body)
    const result = await dbOperation.getEmployees(req.body.TenKS)
    console.log('body: ', result);
    res.send(result.recordset);
});

app.post('/test', async (req, res) => {
    await dbOperation.createThenGet(req.body)
    const result = await dbOperation.getAllEmployees(req.body)
    // console.log('body: ', result);
    res.send(result.recordset);
});

app.post('/delete', async (req, res) => {
    await dbOperation.createThenGet(req.body)
    const result = await dbOperation.deleteEmployee(req.body.MaKS)
    console.log('body: ', result);
    res.send(result.recordset);
});

// let Pam = new hotel('M_Bac5', 'Muong Thanh Grand Bac Ninh', 'Hai Phong', 'M_Bac');
// console.log(Pam)

// dbOperation.createThenGet(Pam)
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => console.trace(err))

// dbOperation.getEmployees().then(res => {
//     console.log(res)
// })

// dbOperation.createThenGet(Pam);

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));