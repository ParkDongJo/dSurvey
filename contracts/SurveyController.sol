pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./Survey.sol";
import "./DSurveyToken.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SurveyController is Ownable {

  enum Status {Prepare, Ing, Complete, OnSale}

  DSurveyToken public token;
  string[] internal categories;
  address[] internal surveyList;
  mapping (address => Status) internal surveyStatus;
  mapping (address => address[]) internal ownedSurveyList;

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

  // 지갑주소 당 보유 설문 리스트
  function getOwnedSurveyList(address _surveyAddress) public view returns(address[]) {
    return ownedSurveyList[_surveyAddress];
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
    require(token.allowance(msg.sender) >= _totToken);
    address newSurveyAddress = address(new Survey(msg.sender, _categoryIdx, _title, address(token), _reward));
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

  // 카테고리 추가
  function addCategory(string _newCategory) public onlyOwner {
    categories.push(_newCategory);
  }
}
