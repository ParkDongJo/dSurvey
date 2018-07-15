pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./SurveyBase.sol";
import "./Survey.sol";
import "./DSurveyToken.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SurveyController is Ownable, SurveyBase {

  string[] internal categories; // 설문 카테고리
  address[] internal surveyList; // 모든 설문 목록
  mapping (address => Status) internal surveyStatus; // 모든 설문 상태
  mapping (address => address[]) internal ownedSurveyList; // 사용자 별 생성한 설문 목록
  mapping (address => address[]) internal answeredSurveyList; // 사용자 별 답변한 설문 목록
  mapping (address => address[]) internal boughtSurveyList; // 사용자 별 구매한 설문 목록

  // 설문 조사 owner만 실행 가능
  modifier onlySurveyOwner(address _surveyAddress) {
    require(msg.sender == Survey(_surveyAddress).owner());
    _;
  }

  constructor(string[] _categories, address _tokenAddress) public {
    categories = _categories;
    token = DSurveyToken(_tokenAddress);
  }

  // 설문 조사 리스트
  function getSurveyList() public view returns(address[]) {
    return surveyList;
  }

  // 사용자 별 보유 설문 리스트
  function getOwnedSurveyList(address _userAddress) public view returns(address[]) {
    return ownedSurveyList[_userAddress];
  }

  // 사용자 별 답변 설문 리스트
  function getAnsweredSurveyList(address _userAddress) public view returns(address[]) {
    return answeredSurveyList[_userAddress];
  }

  // 사용자 별 구매 설문 리스트
  function getBoughtSurveyList(address _userAddress) public view returns(address[]) {
    return boughtSurveyList[_userAddress];
  }

  // 카테고리 리스트
  function getCategories() public view returns(string[]) {
    return categories;
  }

  // 설문 조사 상태
  function getSurveyStatus(address _surveyAddress) public view returns(uint8) {
    return uint8(surveyStatus[_surveyAddress]);
  }

  // 설문 조사 생성
  function createSurvey(
    uint _categoryIdx,
    string _title,
    uint _totToken,
    uint _reward
  )
  public returns(address)
  {
    require(token.allowance(msg.sender, this) >= _totToken);
    address newSurveyAddress = address(new Survey(this, msg.sender, _categoryIdx, _title, address(token), _reward));
    token.transferFrom(msg.sender, newSurveyAddress, _totToken);

    require(newSurveyAddress != address(0));
    surveyList.push(newSurveyAddress);
    surveyStatus[newSurveyAddress] = Status.Prepare;

    require(msg.sender != address(0));
    ownedSurveyList[msg.sender].push(newSurveyAddress);

    return newSurveyAddress;
  }

  // 설문 조사 시작
  function startSurvey(address _surveyAddress) public onlySurveyOwner(_surveyAddress) {
    require(surveyStatus[_surveyAddress] == Status.Prepare);
    surveyStatus[_surveyAddress] = Status.Ing;
  }

  // 설문 조사 종료
  function completeSurvey(address _surveyAddress) public onlySurveyOwner(_surveyAddress) {
    require(surveyStatus[_surveyAddress] == Status.Ing);
    surveyStatus[_surveyAddress] = Status.Complete;
  }

  // 설문 조사 판매
  function sellSurvey(address _surveyAddress) public onlySurveyOwner(_surveyAddress) {
    require(surveyStatus[_surveyAddress] == Status.Complete);
    surveyStatus[_surveyAddress] = Status.OnSale;
  }

  // 카테고리 추가
  function addCategory(string _newCategory) public onlyOwner {
    categories.push(_newCategory);
  }

  // 답변한 설문 추가
  function addAnsweredSurvey(address _userAddress, address _surveyAddress) public {
    Survey survey = Survey(_surveyAddress);
    require(survey.isAnsweredUser(_userAddress));
    answeredSurveyList[_userAddress].push(_surveyAddress);
  }

  // 구매한 설문 추가
  function addBoughtSurvey(address _userAddress, address _surveyAddress) public {
    Survey survey = Survey(_surveyAddress);
    require(survey.isBoughtUser(_userAddress));
    boughtSurveyList[_userAddress].push(_surveyAddress);
  }
}
