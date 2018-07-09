pragma solidity ^0.4.24;

contract Survey {
    string[]  public question;
    mapping (uint => string[]) public choice;
    mapping (address => mapping (uint => string)) public answer;

    constructor() public {

    }

    function addQuestion(string _question) public returns(uint256) {
      uint idx = question.push(_question) - 1;
      return idx;
    }

    function addChoice(uint idx, string _choice1) public {
      choice[idx].push(_choice1);
    }

    function addChoice(
      uint idx,
      string _choice1,
      string _choice2
    )
      public
    {
      choice[idx].push(_choice1);
      choice[idx].push(_choice2);
    }

    function addChoice(
      uint idx,
      string _choice1,
      string _choice2,
      string _choice3
    )
      public
    {
      choice[idx].push(_choice1);
      choice[idx].push(_choice2);
      choice[idx].push(_choice3);
    }

    function addChoice(
      uint idx,
      string _choice1,
      string _choice2,
      string _choice3,
      string _choice4
    )
      public
    {
      choice[idx].push(_choice1);
      choice[idx].push(_choice2);
      choice[idx].push(_choice3);
      choice[idx].push(_choice4);
    }

    // 답변 등록

    // 전체 내용 출력
    function getQuestions(uint _idx) view public returns(string, string[]){
      return (question[_idx], choice[_idx]);
    }



}
