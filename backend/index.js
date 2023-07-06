const  connectToMongo=require('./db');
var cors=require('cors')

connectToMongo();
const express = require('express')
const app = express()

const port = 3005
app.use(cors())
app.use(express.json())



app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`InoteBook backend listening on port ${port}`)
})