const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Question = require('./model/Question');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors())
app.use(express.json())

const mongo_url = "mongodb+srv://smit:smit@cluster0.8uztj.mongodb.net/Questions?retryWrites=true&w=majority";
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log('connected to mongodb'))
.catch((error) => console.error(error));

app.get('/', (req, res) => {
    res.send("CodeColab Backend!")
});

app.listen(PORT, () => {
    console.log(`Running on 3001`);
})