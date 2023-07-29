const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const hostname="0.0.0.0"
const port = process.env.PORT || 3000;
const url ="mongodb+srv://ram:ram@cluster0.qf40oxe.mongodb.net/members?retryWrites=true&w=majority"

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
mongoose.set('strictQuery', true);


//uncomment for localhost

// mongoose.connect('mongodb://localhost:27017/mydb',{
//     useNewUrlParser: true,
//     useUnifiedTopology:true
// });

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
});




var db= mongoose.connection;

db.on('error',function(){
    console.log("Error in connecting to database.")
})
db.once('open',function(){
    console.log("connected to database.")
})


app.post("/submit",function(req,res){
    let name =req.body.name;
    let email =req.body.email;
    let number =req.body.number;
    let whatsapp =req.body.whatsapp;
    let course=req.body.course
    

    let data={
        "name":name,
        "email":email,
        "number":number,
        "whatsapp":whatsapp,
        "course":course
    }

    db.collection('users').insertOne(data,function(err,collection){
        if(err){
            throw err;
        }
    });
    
    return res.redirect('thanks.html')
})

app.get("/",function(req,res){
    res.set({
        "Allow-access-Allow-Origin:":'*'
    })
    return res.redirect('index.html')
}).listen(port,hostname);

app.use((req,res,next)=>{
    res.status(404).redirect('error.html');
});

console.log(`listening on port ${port}`);
