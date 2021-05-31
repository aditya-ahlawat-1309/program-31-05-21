// importing
import express from "express";
import mongoose from 'mongoose';
import Messages from "./dbMessages.js";
import Pusher from "pusher";
//app config

const app = express();
const port = process.env.PORT || 9000;


const pusher = new Pusher({
  appId: "1194228",
  key: "2dd4f40cbd038ab9dc79",
  secret: "40b33bbe275539bf968d",
  cluster: "eu",
  useTLS: true
});


//middleware

app.use(express.json());

//DB config

const connection_url = 'mongodb+srv://admin:8901459471@cluster0.ibuxh.mongodb.net/WHATSAPP-BACKEND-MERN-1?retryWrites=true&w=majority';

mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.once("open" , () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);
    });
});

// ????



//api routes
app.get('/',(req,res) => res.status(200).send('hello world'));


app.post('/messages/sync', (req, res) => {

    dbMessages.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    dbMessages.create(dbMessage, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }else{
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})

//listen
app.listen(port,() => console.log(`Listening on localhost : ${port}`));

