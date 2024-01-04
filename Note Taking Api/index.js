const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded());
const port = 3000

app.get('/', (req, res) => {
  res.sendFile("pages/index.html", {root:__dirname})
})

app.get('/login', (req, res) => {
    res.sendFile("pages/login.html", {root:__dirname})
})

app.get('/signup', (req, res) => {
    res.sendFile("pages/signup.html", {root:__dirname})
})

app.post('/getnotes', (req, res) => {
    const {userToken} = req.body
    res.sendFile("pages/signup.html", {root:__dirname})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})