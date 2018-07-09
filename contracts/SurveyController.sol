pragma solidity ^0.4.24;

import "./Survey.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SurveyController is Ownable {

  enum Status {Ing, Complete, OnSale}

  address[] public surveyList;
  mapping (address => Status) public surveyStatus;
  mapping (address => address[]) public ownedSurveyList;

  constructor() public {

  }

  // 설문 조사 생성
  function createSurvey() public {
    address newSurveyAddress = address(new Survey());

    require(newSurveyAddress != address(0));
    surveyList.push(newSurveyAddress);
    surveyStatus[newSurveyAddress] = Status.Ing;

    require(msg.sender != address(0));
    ownedSurveyList[msg.sender].push(newSurveyAddress);
  }

  // 설문 조사 리스트
  function getSurveyList() public view returns(address[]) {
    return surveyList;
  }

  // 설문 조사 종료
  function completeSurvey(address _surveyAddress) public {
    require(msg.sender == Survey(_surveyAddress).owner());
    surveyStatus[_surveyAddress] = Status.Complete;
  }

  // 지갑주소 당 보유 설문 리스트
  function getSurveyByAddr(address _address) view return() {
    uint[] list = ownedSurveyList[_address];
    address[] owned;

    for(uint i=0; i < list.length; i++ ) {
      owned.push(surveyList[list[i]]);
    }

    return owned;
  }

}
