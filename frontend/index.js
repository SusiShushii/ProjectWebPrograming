const express = require('express');
const path = require('path')
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const publicPath = path.join(__dirname);
console.log(publicPath)
const {PORT} = process.env
app.use(express.static(publicPath));
app.get('/',(req,res)=>{
    res.redirect(`http://localhost:${PORT}/html/home.html`)
});

app.get('/home',(req,res)=>{
    res.sendFile(`${publicPath}/html/home.html`);
});


app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
    }); 