const express=require('express');
const app=express();
const port=process.env.port || 5000;
const path=require('path');
const cors = require('cors');
const mongoose=require('mongoose');
require('./models/model')
require('./models/post')
require('./models/notice')
require('./models/award')

app.use(express.json())
app.use(require("./routes/CreatePost"))
app.use((require("./routes/user")))
app.use(cors({
    origin: 'https://pillai-social.onrender.com'
}));

app.use(require("./routes/auth"))
mongoose.connect("mongodb+srv://v1374:Viveksam2113@cluster0.uj4htru.mongodb.net/?retryWrites=true&w=majority")

mongoose.connection.on("connected",()=>{
    console.log("Connected");
})

mongoose.connection.on("error",()=>{
    console.log(" NOt Connected");
})




app.use(express.static(path.join(__dirname,"./frontend/build")))


app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})
app.listen(port, '0.0.0.0', () => {
  console.log('Server is running on http://192.168.0.104:5000');
});
