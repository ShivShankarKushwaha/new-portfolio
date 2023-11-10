const express = require('express');
const app = express();
const bp = require('body-parser');
const port = process.env.PORT || 5500;
const sendMail = require('./SendMail');
const database =require('./database');
app.use(bp.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname+'/build'));


app.get("/", (req, res) =>
{
    res.sendFile(__dirname+'/build/index.html');
})

app.post("/sendMail", async (req, res) =>
{
    console.log(req.body);
    let responce = await sendMail(req.body);
    console.log('responce', responce);
    if (responce.status === 200) {
        let msg =new database({
            name:req.body.name,
            email:req.body.email,
            message:req.body.message,
            date:new Date()
        });
        let responce1 = await msg.save();
        if(!responce1)
        {
            return res.status(400).json({ message: 'data not saved in database' });

        }
        return res.status(200).json({ message: 'Success' });
    }
    else {
        return res.status(300).json({ message: 'mail not sent' });
    }
})
app.get("*",(req,res)=>
{
    res.sendFile(__dirname+"/build/index.html");
})
app.listen(port, () => { console.log('listening on port', port); })