const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
let db, collection
const url = "mongodb+srv://johannfolta:johannfolta@gofish-ggbng.mongodb.net/test?retryWrites=true&w=majority"
const dbName = "Scoreboard"

app.listen(5000, () => {
  MongoClient.connect(url, {useNewUrlParse: true}, (error, client) => {
    if (error){
      throw error
    }
    db = client.db(dbName)
    console.log("Connected to `" + dbName + "`!")
  })
})

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static("public"))

app.get("/", (req, res) => {
  db.collection("playerdata").find().toArray((err,result) => {
    if (err) return console.log(err)
    res.render("index.ejs", {playerdata: result})
  })
})

app.post('/newplayer', (req, res) => {
  db.collection('playerdata').save({addedplayer: req.body.player, score: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/scoreIncrease', (req, res) => {
  db.collection('playerdata')
  .findOneAndUpdate({addedplayer: req.body.addedplayer, score: req.body.score}, {
    $set: {
      score:req.body.score + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete("/removePlayerData", (req, res) => {
  db.collection("playerdata").findOneAndDelete({addedplayer: req.body.addedplayer},(err, result) => {
    if (err) return res.send(500, err)
    res.send("Message deleted!")
  })
})
