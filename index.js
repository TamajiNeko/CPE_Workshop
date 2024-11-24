const express = require("express")
const body_parser = require("body-parser")
const db = require("./services/db")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express())
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))

app.get('/', async(req, res)=>{
    res.send("Hello")
})

app.get('/user', async(req, res)=>{
    const result = await db.query("select username,firstname,lastname from users")
    res.send(result)
})

app.get('/users', async (req, res) => {
    const { firstname } = req.query;

    if (firstname) {
        const result = await db.query("select * FROM users WHERE firstname = ?", [firstname]);
        res.json(result);
    }else {
        const result = await db.query("select * FROM users");
        res.json(result);
    }
})

app.get('/category', async(req, res)=>{
    const result = await db.query("select category_name FROM categories")
    res.send(result)})

app.get('/products', async(req, res)=>{
    const result = await db.query("SELECT product_name FROM products")
    res.send(result)})

app.get('/products_details', async(req, res)=>{
    const result = await db.query("select * FROM product_details")
    res.send(result)})

    app.get('/users', async (req, res) => {
        const { firstname } = req.query;
    
        if (firstname) {
            const result = await db.query("select * FROM users WHERE firstname = ?", [firstname]);
            res.json(result);
        } else {
            const result = await db.query("select * FROM users");
            res.json(result);
        }
    });    

app.post('/users', async(req, res)=>{
    const{username, password, firstname, lastname, email, phonenumber} = req.body

    const result = await db.query(`
        INSERT INTO users (username, password, firstname, lastname, email, phonenumber)
        VALUES(?, ?, ?, ?, ?, ?)
    `, [username, password, firstname, lastname, email, phonenumber])

    res.json(result)
})

app.listen(4013, ()=>{console.log("Server now ready")})