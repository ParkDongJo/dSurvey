pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;


contract Survey {

  struct userAnswer {
    address user;
    string answer;
  }

  string[]  public question;
  mapping (uint => string[]) public choice;
  mapping (address => mapping (uint => string)) public answer;
  mapping (uint => userAnswer[]) public userAnwsers;

  constructor() public {

  }

  // 질문과 선택지 입력
  function addQuestionAndChoice(string _question, string[] _choices) public {
    uint256 idx = question.push(_question) - 1;
    for (uint256 i = 0; i < _choices.length; i++) {
      choice[idx].push(_choices[i]);
    }
  }

  // 전체 내용 출력
  function getSurvey(uint _idx) view public returns(string, string[]){
    return (question[_idx], choice[_idx]);
  }

  // 질문 당 각 유저와 대답 출력
  function getUserAnswer(uint _idx) view public returns(address, string) {
    return (userAnswers[_idx].user, userAnswers[_idx].answer);
  }

  // 답변 등록
  function setAnswer(string[] _answers) {
    for (uint256 i = 0; i < _answers.length; i++) {
        answer[msg.sender][i] = _answers[i];
    }
  }

}
