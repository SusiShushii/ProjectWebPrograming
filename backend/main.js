const express = require('express');
const path = require('path')
const mysql = require('mysql2')
const dotenv = require('dotenv');

const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const app = express();
app.use(cors())
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

dotenv.config()

const registerRoute = require('./registerService.js');
const loginRoute = require('./loginService.js');
const authenRoute = require('./authenService.js');
const insertRoute = require('./insert_service.js'); 
const deleteRoute = require('./delete_service.js');
const updateRoute = require('./update_service.js');
const getRoute = require('./getService.js');
const admin_login_Route = require('./login_admin_service.js');
const admin_register_Route = require('./register_admin_service.js');

app.use(router)

const connection = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE

})
connection.connect(function(err){
    if(err) {console.log("error at sql connection")
        throw err}
    else console.log("Database connected")
})

app.get("/", function(req, res){
    res.writeHead(200, {"Content-Type" : "text/plain"});
})

app.use("/register",registerRoute(connection));
app.use("/login",loginRoute(connection));
app.use("/authen",authenRoute(connection));
app.use("/insert",insertRoute(connection));
app.use("/delete",deleteRoute(connection));
app.use("/update",updateRoute(connection));
app.use("/get",getRoute(connection));
app.use("/admin-login",admin_login_Route(connection));
app.use("/admin-register",admin_register_Route(connection));

const port = process.env.PORT; 


app.listen(port, () => { 
console.log(`Server is running on port ${port}`); 
}); 

app.get('/')
