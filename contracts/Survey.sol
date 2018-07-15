pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./SurveyBase.sol";
import "./SurveyController.sol";
import "./DSurveyToken.sol";
import "./DSurveyTokenReceiver.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Survey is Ownable, SurveyBase, DSurveyTokenReceiver{
  SurveyController public controller; // 설문 컨트롤러
  string public title; // 설문조사 제목
  string public imgUrl; // 설문조사 대표 이미지
  uint public categoryIdx; // 설문조사 카테고리
  uint public reward; // 보상 토큰 개수

  string[] internal question; // 질문 목록
  mapping (uint => string[]) internal choice; // 질문 별 보기 목록
  mapping (address => mapping (uint => string)) internal answer; // 사용자의 질문 별 답변
  mapping (address => bool) public isAnsweredUser; // 답변을 등록한 사용자 인지 확인
  mapping (address => bool) public isBoughtUser; // 설문을 구매한 사용자 인지 확인
  address[] internal answeredUsers; // 답변을 등록한 사용자 목록
  address[] internal bougtUsers;    // 구매자 목록
  mapping (uint => string[]) internal answersPerQuestion; // 질문 별 답변 목록


  // 설문 조사 owner만 실행 가능
  modifier sendReward() {
    require(!isAnsweredUser[msg.sender]);
    require(token.balanceOf(this) >= reward);
    _;
    token.transfer(msg.sender, reward);
  }

  // 소유자 혹은 구매자만
  modifier onlyOwnerAndBuyer() {
    require(msg.sender == owner || isBoughtUser[msg.sender]);
    _;
  }

  // 준비 중인 설문만
  modifier onlyPrepare(address _surveyAddress) {
    require(Status(controller.getSurveyStatus(_surveyAddress)) == Status.Prepare);
    _;
  }

  // 진행 중인 설문만
  modifier onlyIng(address _surveyAddress) {
    require(Status(controller.getSurveyStatus(_surveyAddress)) == Status.Ing);
    _;
  }

  // 판매 중인 설문만
  modifier onlyOnSale(address _surveyAddress) {
    require(Status(controller.getSurveyStatus(_surveyAddress)) == Status.OnSale);
    _;
  }

  // 생성자
  constructor(
    address _controller,
    address _newOwner,
    uint _categoryIdx,
    string _title,
    address _token,
    uint _reward
  )
  public
  {
    transferOwnership(_newOwner);
    controller = SurveyController(_controller);
    categoryIdx = _categoryIdx;
    title = _title;
    token = DSurveyToken(_token);
    reward = _reward;
  }

  // 답변을 등록한 사용자 목록
  function getAnsweredUsers() view public onlyOwnerAndBuyer returns(address[]) {
    return answeredUsers;
  }

  // 질문 당 사용자들이 등록한 답변 목록
  function getAnswersPerQuestion(uint _idx) view public onlyOwnerAndBuyer returns(string[]) {
    return answersPerQuestion[_idx];
  }

  // 참여자 수
  function getAnsweredUsersNum() view public returns(uint) {
    return answeredUsers.length;
  }

  // 토큰 잔액
  function getTokenState() view public returns(uint) {
    return token.balanceOf(this);
  }

  // 설문지 가격
  function calcSurveyPrice() view public returns(uint) {

    // answeredUsers 참여자 수
    // bougtUsers 구매수




    // 참여자 와 판매수
    return reward;
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
    isAnsweredUser[msg.sender] = true;

    // 컨트롤러의 사용자별 답변 설문 리스트에 추가
    controller.addAnsweredSurvey(msg.sender, this);
  }

  // 나머지 토큰 모두 출금
  function withdraw() public onlyOwner {
    token.transfer(msg.sender, token.balanceOf(this));
  }

  // 설문지 구매
  function buySurvey(address _from, uint _value) public {
    require(!isBoughtUser[_from]);

    uint value = calcSurveyPrice();
    require(_value == value);

    isBoughtUser[_from] = true;
    bougtUsers.push(_from);
  }
  
  function onDSurveyTokenReceived (
    address _from,
    uint _value
  )
  public returns(bytes4)
  {
    buySurvey(_from, _value);
    return DSURVEY_TOKEN_RECEIVED;
  }

}
