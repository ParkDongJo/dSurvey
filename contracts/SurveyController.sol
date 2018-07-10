pragma solidity ^0.4.24;

import "./Survey.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SurveyController is Ownable {

  enum Status {Ing, Complete, OnSale}

  string[] internal categories;
  address[] internal surveyList;
  mapping (address => Status) internal surveyStatus;
  mapping (address => address[]) internal ownedSurveyList;

  // 설문 조사 owner만 실행 가능
  modifier onlySurveyOwner(address _surveyAddress) {
    require(msg.sender == Survey(_surveyAddress).owner());
    _;
  }

  constructor(string[] _categories) public {
    this.categories = categories;
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
  function createSurvey(uint _categoryIdx) public {
    address newSurveyAddress = address(new Survey(msg.sender, _categoryIdx));

    require(newSurveyAddress != address(0));
    surveyList.push(newSurveyAddress);
    surveyStatus[newSurveyAddress] = Status.Ing;

    require(msg.sender != address(0));
    ownedSurveyList[msg.sender].push(newSurveyAddress);
  }

  // 설문 조사 종료
  function completeSurvey(address _surveyAddress) public onlySurveyOwner(_surveyAddress) {
    require(surveyStatus[_surveyAddress] == Status.Ing);
    surveyStatus[_surveyAddress] = Status.Complete;
  }

  // 카테고리 추가
  function addCategory(string _newCategory) onlyOwner {
    categories.push(_newCategory);
  }
}
