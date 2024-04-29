const express = require("express") 
const cors = require("cors")
const mysql = require("mysql")
const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost", 
    user: "todomanager", 
    password: "wave", 
    database: "todo_app"
})


app.get("/", (req, res)=>{
    const sql = "SELECT * from tasks;"; 
    db.query(sql, (err, data)=> {
        if(err) return res.json(err) ;
        return res.json(data);
    })
})

app.listen(8080, () => {
    console.log("listening")
})