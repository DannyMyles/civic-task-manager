const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require('cors');
const morgan = require('morgan');
const todoRoutes = require('./routes/todoRoutes')



app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
// Defined routes
app.get('/', (req, res)=>{
  res.send('Application up and Running!')
})
app.use('/api/v1', todoRoutes)


const port = process.env.PORT || 5000;

const server = async () => {
    try {
      await connectDB();
      app.listen(port, console.log(`Server running on Port: ${port}`));
    } catch (error) {
      console.log("Error connecting");
    }
  };
  server();