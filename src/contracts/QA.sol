pragma solidity >=0.4.21 <0.9.0;
pragma experimental ABIEncoderV2;

contract QA {
    // Structure of Post
    mapping(string => Question) public questions;

    string[] public Ids;

    struct Question {
        address payable userId;
        string[] tags;
        string title;
        string body;
        Answer[] answers;
    }

    struct Answer {
        address payable ansUserId;
        string ans;
        uint256 tipAmount;
    }

    event QuestionAdded(
        address payable userId,
        string[] tags,
        string title,
        string body
    );

    event tipAns(
        address payable userId,
        string[] tags,
        string title,
        string body,
        Answer[] answers
    );

    event addsAns(address payable ansUserId, string ans, uint256 tipAmount);

    // create question
    function addQuestion(
        string memory _QuestionId,
        string memory _title,
        string memory _body,
        string[] memory _tags
    ) public {
        Question storage que = questions[_QuestionId];
        que.userId = msg.sender;
        que.title = _title;
        que.body = _body;
        for (uint256 i = 0; i < _tags.length; i++) {
            que.tags.push(_tags[i]);
        }
        emit QuestionAdded(msg.sender, que.tags, que.title, que.body);
    }

    // create answer
    function addAnswer(string memory _QuestionId, string memory _ans) public {
        Question storage que = questions[_QuestionId];
        Answer memory ans = Answer(msg.sender, _ans, 0);
        que.answers.push(ans);
        emit addsAns(msg.sender, _ans, 0);
    }

    // fetch all question

    // tip answer
    function tipAnswer(string memory QuestionId, uint256 id) public payable {
        Answer memory _answer = questions[QuestionId].answers[id];
        address payable _author = _answer.ansUserId;
        address(_author).transfer(msg.value);
        _answer.tipAmount += msg.value;
        questions[QuestionId].answers[id] = _answer;
        emit tipAns(
            msg.sender,
            questions[QuestionId].tags,
            questions[QuestionId].title,
            questions[QuestionId].body,
            questions[QuestionId].answers
        );
    }
}
