const express = require("express");
const app = express();

const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require("./routes"));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//to log mongo queries being executed
mongoose.set("debug", true);


app.listen(PORT, ()=>console.log(`Connected on localhost: ${PORT}`));