pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./DSurveyToken.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Survey is Ownable {

  DSurveyToken public token;
  string public title;
  string public imgUrl;
  uint public categoryIdx;
  uint public reward;

  string[] internal question; // 질문 목록
  mapping (uint => string[]) internal choice; // 질문 별 보기 목록
  mapping (address => mapping (uint => string)) internal answer; // 사용자의 질문 별 답변
  address[] internal answeredUsers; // 답변을 등록한 사용자 목록
  mapping (uint => string[]) internal answersPerQuestion; // 질문 별 답변 목록

  // 생성자
  // SurveyController가 기본 owner로 설정되어서 요청자로 owner를 변경함
  // 이걸 실행하지 않고 요청자가 owner가 되게 하려면 controller에서 호출 할 때
  // delegateCall로 생성자를 호출해야 함
  constructor(
    address _newOwner,
    uint _categoryIdx,
    string _title,
    address _token,
    uint _reward
  )
  public
  {
    transferOwnership(_newOwner);
    categoryIdx = _categoryIdx;
    title = _title;
    token = DSurveyToken(_token);
    reward = _reward;
  }

  // 답변을 등록한 사용자 목록
  function getAnsweredUsers() view public returns(address[]) {
    return answeredUsers;
  }

  // 질문 당 사용자들이 등록한 답변 목록
  function getAnswersPerQuestion(uint _idx) view public returns(string[]) {
    return answersPerQuestion[_idx];
  }

  // 전체 내용 출력
  function getQuestionAndChoices(uint _idx) view public returns(string, string[]){
    return (question[_idx], choice[_idx]);
  }

  // 질문과 선택지 입력
  function addQuestionAndChoices(string _question, string[] _choices) public {
    uint256 idx = question.push(_question) - 1;
    for (uint i = 0; i < _choices.length; i++) {
      choice[idx].push(_choices[i]);
    }
  }

  // 답변 등록
  function setAnswers(string[] _answers) public {
    // 사용자 별 답변 목록 및 질문 별 답변 목록에 추가
    for (uint i = 0; i < _answers.length; i++) {
      answer[msg.sender][i] = _answers[i];
      answersPerQuestion[i].push(_answers[i]);
    }
    // 답변 한 사용자 목록에 추가
    answeredUsers.push(msg.sender);
  }

  // 나머지 토큰 모두 출금
  function withdraw() public onlyOwner {
    token.transfer(msg.sender, token.balanceOf(this));
  }

}
