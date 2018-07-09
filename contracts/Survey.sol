pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract Survey {

  string[]  public question;
  mapping (uint => string[]) public choice;
  mapping (address => mapping (uint => string)) public answer;

  constructor() public {

  }

  function addQuestionAndChoice(string _question, string[] _choices) public {
    uint256 idx = question.push(_question) - 1;
    for (uint256 i = 0; i < _choices.length; i++) {
      choice[idx].push(_choices[i]);
    }
  }

  // 답변 등록

  // 전체 내용 출력
  function getSurvey() view public returns(string){

    return "";
  }

}
