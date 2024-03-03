const { json } = require("body-parser");
const readDB = require("../controllers/readDB");
const writeDB = require("../controllers/writeDB");
const { use } = require("../routes/UserRouter");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
    
    console.log(req.body);

    try {

        let users = await readDB("./db/users.json");

        const user = users.find(user => user.email === req.body.email)

        if(user) return res.status(401).json({
            error: "User exists"
        });

        users.push({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const writeStatus = await writeDB(users, "./db/users.json");

        console.log(writeStatus);

        res.status(200).json({
            message: "Signup successful"
        });
        
    } catch (error) {
        console.log(error);
    }
}

async function signIn(req, res) {

    console.log(req.body);
    
    try {
        
        let users = await readDB("./db/users.json");

        const user = users.find(user => user.email === req.body.email);

        if(!user) return res.status(401).json({
            error: "User doesn't exist"
        });

        if(user.password !== req.body.password) res.status(401).json({
            error: "Invalid Password"
        });

        if(user.password === req.body.password) {

            const token = jwt.sign(user.email, process.env.JWT_SECRET);

            res.cookie("token", token);

            res.status(200).json({
                message: "Log in successful"
            });
        }

    } catch (error) {
        console.log(error);
    }
}

async function deleteUser(req, res) {
    
    console.log(req.body);
    
    try {
        
        let users = await readDB("./db/users.json");

        const user = users.find(user => user.email === req.body.email);

        if(!user) return res.status(401).json({
            error: "User: " + req.body.email + " doesn't exist"
        })

        users = users.filter(user => user.email !== req.body.email);

        const writeStatus = await writeDB(users, './db/users.json');
        
        console.log(writeStatus);

        res.status(200).json({
            message: "User: " + req.body.email + " deleted"
        });

    } catch (error) {
        console.log(error);
    }
}

async function sendUsers(req, res) {

    try {
        
        let users = await readDB("./db/users.json");

        res.status(200).json(users);

    } catch (error) {
        console.log(error);
    }
    
    console.log(req.authData);
}


module.exports = { createUser, deleteUser, sendUsers, signIn }