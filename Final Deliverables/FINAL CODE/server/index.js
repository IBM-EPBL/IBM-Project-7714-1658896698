const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors');
const bodyParser=require('body-parser');

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'database12345',
    database:'crudeoil',
    multipleStatements:'true'
});



app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


//login page
app.post("/",(req,res)=>{
    const username=req.body.username
    const password=req.body.password

    db.query("SELECT * FROM users WHERE username=? AND password=?;",[username,password],(err,result)=>{
        if (result.length>0) {
            db.query("DELETE FROM redux; INSERT INTO redux(username) VALUES (?);",username,(err,result)=>{
                console.log(result)
            })
            res.send({message:"/home"})
        }
    })
})

//logout
app.delete("/logout",(req,res)=>{
    db.query("UPDATE users SET first_time_login=false WHERE username=(SELECT username from crudeoil.redux);DELETE FROM redux")
})

//register page
app.post("/register",(req,res)=>{
    const username=req.body.username
    const password=req.body.password

    db.query("SELECT * FROM users WHERE username=?;",username,(err,result)=>{
        if (result.length===0){
            db.query("INSERT INTO users(username,password,first_time_login) VALUES (?,?,true);",[username,password],(err,result)=>{
                console.log(result)
            })
            res.send({message: "successfully inserted"})
        }
    })
})

//user details
app.get("/userdetails",(req,res)=>{
    db.query("SELECT username FROM crudeoil.users WHERE username=(SELECT username from crudeoil.redux);",(err,result)=>{
        res.send(result)
    })
})

//home
app.get("/home",(req,res)=>{
    db.query("SELECT * FROM products LIMIT 5;",(err,result)=>{
        res.send(result)
    })
})


//details input
app.post("/detail",(req,res)=>{
    const day=req.body.day
    const month=req.body.month
    const year=req.body.year
    const prediction=req.body.prediction
    const algorithmUsed=req.body.algorithmUsed
    const accuracyScore=req.body.accuracyScore

    db.query("INSERT into history(day,month,year,prediction,algorithmUsed,accuracyScore,username,favorites) VALUES(?,?,?,?,?,?,(SELECT username FROM crudeoil.redux),0); DELETE h1 FROM history h1, history h2 WHERE h1.id > h2.id AND h1.day=h2.day AND h1.month=h2.month AND h1.year=h2.year AND h1.prediction=h2.prediction AND h1.algorithmUsed=h2.algorithmUsed AND h1.accuracyScore=h2.accuracyScore AND h1.username=h2.username; SET @count = 0; UPDATE history SET history.id = @count:= @count + 1; ALTER TABLE history AUTO_INCREMENT = 1;",[day,month,year,prediction,algorithmUsed,accuracyScore])
})

//history display
app.get("/historyDisplay",(req,res)=>{
    db.query("SELECT * FROM history WHERE username=(SELECT username FROM redux) ORDER BY dateAndTime DESC;",(err,result)=>{
        res.send(result)
    })
})

//add favorites
app.post("/addFavorites",(req,res)=>{
    const id=req.body.id
    const username=req.body.username   
    db.query("UPDATE history SET favorites=1 WHERE id=? AND username=?;",[id,username],(err,result)=>{     
    })
})
    
//favorites display
app.get("/favoritesDisplay",(req,res)=>{
    db.query("SELECT * FROM history WHERE username=(SELECT username FROM redux) AND favorites=1 ORDER BY dateAndTime DESC;",(err,result)=>{
        res.send(result)
    })
})

//remove favorites
app.post("/removeFavorites",(req,res)=>{
    const id=req.body.id
    const username=req.body.username   
    db.query("UPDATE history SET favorites=0 WHERE id=? AND username=?;",[id,username],(err,result)=>{     
    })
})

//feedback insert
app.post("/feedback",(req,res)=>{
    feedback=req.body.feedback
    db.query("INSERT INTO feedback(username,given_feedback) VALUES ((SELECT username FROM crudeoil.redux),?);",feedback)
})


//feedback display
app.get("/feedbackDisplay",(req,res)=>{
    db.query("SELECT * FROM feedback ORDER BY id DESC;",(err,result)=>{
        res.send(result)
    })
})

//feedback delete
app.post("/feedbackDelete/:id",(req,res)=>{
    const id=req.params.id
    db.query("DELETE FROM feedback WHERE username=(SELECT username FROM crudeoil.redux) AND id=?",id,(err,result)=>{
        res.send(result)
    })
})

//rating insert
app.post("/rating",(req,res)=>{
    const rating=req.body.rating
    db.query("UPDATE users SET rating=? WHERE username=(SELECT username FROM crudeoil.redux);",rating)
})

//rating display
app.get("/ratingDisplay",(req,res)=>{
    db.query("SELECT AVG(rating) AS rating FROM users;",(err,result)=>{
        res.send(result)
    })
})

//rating delete
app.post("/ratingDelete",(req,res)=>{
    db.query("UPDATE users SET rating=0 WHERE username=(SELECT username FROM crudeoil.redux);",(err,result)=>{
        res.send(result)
    })
})

//account display
app.get("/accountDisplay",(req,res)=>{
    db.query("SELECT * FROM users WHERE username=(SELECT username FROM crudeoil.redux);",(err,result)=>{
        res.send(result)
    })
})


//account delete
app.post("/accountDelete",(req,res)=>{
    db.query("DELETE FROM users WHERE username=(SELECT username FROM crudeoil.redux);",(err,result)=>{
        res.send(result)
    })
})


app.listen(3001,()=>{
    console.log("running on port 3001")
})