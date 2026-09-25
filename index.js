const fs = require('fs');


const express = require('express')
const app = express();
const port = 8000;

const users = require("./MOCK_DATA.json")

//Middleware
app.use(express.urlencoded({extended: false}));


//Handling GET request from the user
app.get('/api/users', (req, res) => {
    return res.json(users); 
});

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});


app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id == id);
        if(user === undefined)  return res.status(404).json({ status: "error", message: "User does not exists" });
        return res.json(user); 
    }).patch((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        users[userIndex] = {
            ...users[userIndex],
            ...req.body
        };
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "error" });
            }
            return res.json({
                status: "success",
                user: users[userIndex]
            });
        });
    }).delete((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        users.splice(userIndex, 1);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "error" });
            }
            return res.json({
                status: "success",
                message: "User deleted"
            });
        });
    }
);

app.post('/api/users',(req, res) => {
    const body = req.body;
    users.push({id: users.length + 1, ...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if(err) return res.status(500).json({ status: "error" });
        return res.status(200).json({ status: "success" });
    });
    
});


app.listen(port, () => console.log(`Server started at port ${port}`))