require('dotenv').config({path: "./config.env"})
const express= require('express')
const app = express()
const bodyParser=require('body-parser');
const connectDB  = require('./config/db')
const morgan = require("morgan");
const cors = require("cors");
const path = require("path")

app.use(express.static(path.join(__dirname, 'client/build')));
connectDB()
// app.use(express.json())

const talkToChatbot = require("./chatbot");


app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));
app.use(cors());
app.use(morgan("dev"));


app.use('/api/auth',require('./routes/auth'))
app.use('/api/private',require('./routes/private'))

app.post("/chatbot", function (req, res, next) {
    const message = req.body.message;
    console.log("message" + message);
  
    talkToChatbot(message)
      .then((response) => {
        res.send({ message: response });
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
        res.send({
          error: "Error occured here"
        });
      });
  });


const PORT = process.env.PORT||5000;




app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

