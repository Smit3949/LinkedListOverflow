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
        mapping(string => Answer) answers;
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

    // fetch all question

    // tip answer
}
