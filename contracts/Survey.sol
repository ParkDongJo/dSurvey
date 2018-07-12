pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./DSurveyToken.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Survey is Ownable {

  DSurveyToken public token; // 토큰 컨트랙트
  string public title; // 설문조사 제목
  string public imgUrl; // 설문조사 대표 이미지
  uint public categoryIdx; // 설문조사 카테고리
  uint public reward; // 보상 토큰 개수

  string[] internal question; // 질문 목록
  mapping (uint => string[]) internal choice; // 질문 별 보기 목록
  mapping (address => mapping (uint => string)) internal answer; // 사용자의 질문 별 답변
  mapping (address => bool) internal userExistList;
  address[] internal answeredUsers; // 답변을 등록한 사용자 목록
  mapping (uint => string[]) internal answersPerQuestion; // 질문 별 답변 목록


  // 설문 조사 owner만 실행 가능
  modifier sendReward() {
    require(!userExistList[msg.sender]);
    require(token.balanceOf(this) >= reward);
    _;
    token.transfer(msg.sender, reward);
  }

  // 생성자
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
  function addQuestionAndChoices(string _question, string[] _choices) public onlyOwner {
    uint256 idx = question.push(_question) - 1;
    for (uint i = 0; i < _choices.length; i++) {
      choice[idx].push(_choices[i]);
    }
  }

  // 답변 등록
  function setAnswers(string[] _answers) public sendReward {
    // 사용자 별 답변 목록 및 질문 별 답변 목록에 추가
    for (uint i = 0; i < _answers.length; i++) {
      answer[msg.sender][i] = _answers[i];
      answersPerQuestion[i].push(_answers[i]);
    }
    // 답변 한 사용자 목록에 추가
    answeredUsers.push(msg.sender);
    userExistList[msg.sender] = true;
  }

  // 나머지 토큰 모두 출금
  function withdraw() public onlyOwner {
    token.transfer(msg.sender, token.balanceOf(this));
  }

}
