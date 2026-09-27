const express = require('express');
const app = express();
const port = 8000;

const mongoose = require("mongoose");

const { brotliCompressSync } = require('zlib');
const { error } = require('console');
const { type } = require('os');

//Mongodb Connection
mongoose
    .connect('mongodb://127.0.0.1:27017/youtube-db-1')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log('Mongo Error : ', err));

    
//----> Schema
const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        require : true,
    },
    last_name : {
        type : String,
    },
    email : {
        type : String,
        require : true,
        unique : true,        
    },
    job_title : {
        type : String,
    },
    gender : {
        type : String,
    },
    },{ timestamps: true }
);

const User = mongoose.model('user', userSchema);


//Middleware
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    fs.appendFile("log.txt", `${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n`,(err, data) => {
        next();
    });
});


//Handling GET request from the user
app.get('/api/users', async(req, res) => {
    return res.json(await User.find({})); 
});

app.get('/users', async(req, res) => {
    const dbAllUsers = await User.find({});
    const html = `
    <ul>
        ${dbAllUsers.map(user => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});


app.route('/api/users/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);
        if(!user)  return res.status(404).json({ error : "user not found" });
        return res.json(user); 
    }).patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, {last_name : "changed"})

        return res.json({ status: "success" });
    }).delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id)

        return res.json({ status: "success" });
    }
);

app.post('/api/users', async (req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(404).json({message : "few fields are missing..."})
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
    });

    console.log("result", result);

    return res.status(201).json({message: "success"})
});


app.listen(port, () => console.log(`Server started at port ${port}`))