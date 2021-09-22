pragma solidity >=0.4.21 <0.9.0;
pragma experimental ABIEncoderV2;

contract QA {
    // Structure of Post
    mapping(string => Question) public questions;
    uint256 public countids = 0;
    string[] public Ids;

    struct Question {
        address payable userId;
        string tags;
        string title;
        string body;
        uint256 cntAns;
        Answer[] answers;
    }

    struct Answer {
        address payable ansUserId;
        string ans;
        uint256 tipAmount;
    }

    event QuestionAdded(
        address payable userId,
        string tags,
        string title,
        string body
    );

    event tipAns(
        address payable userId,
        string tags,
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
        string memory _tags
    ) public {
        ++countids;
        Ids.push(_QuestionId);
        Question storage que = questions[_QuestionId];
        que.userId = msg.sender;
        que.title = _title;
        que.body = _body;
        que.tags = _tags;
        que.cntAns = 0;
        emit QuestionAdded(msg.sender, que.tags, que.title, que.body);
    }

    // create answer
    function addAnswer(string memory _QuestionId, string memory _ans) public {
        Question storage que = questions[_QuestionId];
        que.cntAns++;
        Answer memory ans = Answer(msg.sender, _ans, 0);
        que.answers.push(ans);
        emit addsAns(msg.sender, _ans, 0);
    }

    // tip answer
    function tipAnswer(string memory QuestionId, uint256 id) public payable {
        require(questions[QuestionId].answers.length > 0);
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
