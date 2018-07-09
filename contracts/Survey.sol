pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract Survey {

  string[]  public question;
  mapping (uint => string[]) public choice;
  mapping (address => mapping (uint => string)) public answer;

  constructor() public {

  }

  // 질문과 선택지 입력
  function addQuestionAndChoice(string _question, string[] _choices) public {
    uint256 idx = question.push(_question) - 1;
    for (uint256 i = 0; i < _choices.length; i++) {
      choice[idx].push(_choices[i]);
    }
  }

  // 질문과 선택지 출력
  function getSurvey() view public returns(string){

    return "";
  }

  // 답변 등록
  function setAnswer(string[] _answers) {
    for (uint256 i = 0; i < _answers.length; i++) {
        answer[msg.sender][i] = _answers[i];
    }
  }

}
