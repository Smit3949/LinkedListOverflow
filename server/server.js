const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const Question = require('./model/Question');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

const mongo_url = "mongodb+srv://smit:smit@cluster0.haxvy.mongodb.net/Questions?retryWrites=true&w=majority";
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log('connected to mongodb'))
.catch((error) => console.error(error));

app.get('/', (req, res) => {
    Question.find({})
        .then((data) => { res.send(data) })
        .catch((err) => { res.send(err); });
});

app.post('/addQuestion', (req, res) => {
    var data = {
        title: req.body.title,
        userId: req.body.userId,
        QuestionId: ''+uuidv4(),
        body: req.body.body,
        tags: req.body.tags,
        answers: []
    }
    Question.create(data)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    })
});

app.post('/editQuestion', (req, res) => {
    var data = {
        title: req.body.title,
        userId: req.body.userId,
        QuestionId: req.body.QuestionId,
        body: req.body.body,
        tags: req.body.tags,
        answers: req.body.answers
    }
    console.log(data);
    console.log(req.body.QuestionId);
    Question.findOneAndUpdate({ QuestionId: req.body.QuestionId }, {
        $set: {
            title: req.body.title,
            body: req.body.body,    
            tags: req.body.tags
        }
    }, )
    .then((result) => {
        console.log(result)
        res.send(result);
    }).catch((err) => {
        res.send(err);
    })
});

app.get('/find-question', (req, res) => {
    var qId = req.query.QuestionId;

    Question.find({QuestionId: qId})
        .then((data) => { console.log(data); res.send(data) })
        .catch((err) => { res.send(err); });
});


app.post('/addAnswer', (req, res) => {
    console.log(req.body);
    var qId = req.body.QuestionId;
    var data = req.body.body;

    Question.find({ QuestionId: qId }).then((data) => {
        var answers = data.answers;
        var newAnswer = {
            ansUserId: req.body.userId,
            ans: req.body.body
        };

        Question.updateOne({ QuestionId: qId }, { $addToSet: { answers: newAnswer } })
            .then((result) => {
                res.send(result);
                console.log(result);
            }).catch((err) => {
                res.send(err);
            })
    })
        .catch(err => res.send(err));
});



app.listen(PORT, () => {
    console.log(`Running on 3001`);
})