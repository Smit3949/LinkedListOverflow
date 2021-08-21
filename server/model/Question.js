const mongoose = require('mongoose');
const Answerschema = mongoose.Schema({
    ans: String,
    ansUserId: String 
});
const Questionschema = mongoose.Schema({
    userId: String,
    QuestionId: String,
    title: String,
    body: String,
    tags: [String],
    answers: [Answerschema],
});
module.exports = mongoose.model('Question', Questionschema);