const mongoose = require('mongoose');
const Answerschema = mongoose.Schema({
    ans: Object,
    ansUserId: String 
});
const Questionschema = mongoose.Schema({
    userId: String,
    QuestionId: String,
    title: String,
    body: Object,
    tags: [String],
    answers: [Answerschema],
});
module.exports = mongoose.model('Question', Questionschema);