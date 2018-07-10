pragma solidity ^0.4.24;

import "./Survey.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SurveyController is Ownable {

  enum Status {Prepare, Ing, Complete, OnSale}

  address[] internal surveyList;
  mapping (address => Status) internal surveyStatus;
  mapping (address => address[]) internal ownedSurveyList;

  // 설문 조사 owner만 실행 가능
  modifier onlySurveyOwner(address _surveyAddress) {
    require(msg.sender == Survey(_surveyAddress).owner());
    _;
  }

  constructor() public {

  }

  // 설문 조사 생성
  function createSurvey() public returns(address) {
    address newSurveyAddress = address(new Survey(msg.sender));

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

  // 설문 조사 리스트
  function getSurveyList() public view returns(address[]) {
    return surveyList;
  }

  // 지갑주소 당 보유 설문 리스트
  function getOwnedSurveyList(address _surveyAddress) public view returns(address[]) {
    return ownedSurveyList[_surveyAddress];
  }

  // 설문 조사 상태
  function getSurveyStatus(address _surveyAddress) public view returns(uint8) {
    return uint8(surveyStatus[_surveyAddress]);
  }
}
