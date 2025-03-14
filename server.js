const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Feedback = require('./models/fdb');

const app =express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/Coderone',{
    // userNewUrlParser: true,
    // useUnifiedTopology:true
})
.then(()=>console.log('mongodb connected'))
.catch(err=>console.error('mongodb connection error',err));

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('views'));

app.get('/',(req,res)=>{
    res.sendfile(__dirname,'/views/index.html');
});

app.post('/submit-feedback', async(req,res)=>
{
    
    const { name , contactnumber ,email, feedback: feedbacktext} = req.body;
    const newfeedback = new Feedback({
        name,
        contactnumber,
        email,
        feedback: feedbacktext
    });

    try {
        await newfeedback.save();
        console.log('feedback saved succesfully');
        res.send(`
            <html>
                <head>
                    <title>Feedback submitted</title>
                </head>
                <body>
                    <h1>thank you!</h1>
                    <p>your feedback has been succesfully submitted</p>
                    <a href="/">go back to form</a>
                </body>
            </html>`
        );
    }catch(err){
        console.error("error saving feedback",err);
        res.status(500).send('there was an error in submitting your feedback');
    }
});

app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
})



