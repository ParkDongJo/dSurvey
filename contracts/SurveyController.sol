pragma solidity ^0.4.24;

import "./Survey.sol";

contract SurveyController {

    enum Status {Ing, Complete, OnSale}

    address[] public surveyList;
    mapping (address => Status) public surveyStatus;
    mapping (address => uint[]) public ownedSurveyList;

    constructor() public {

    }

    // 설문 조사 생성
    function createSurvey() public {

    }

    // 설문 조사 리스트
    function getSurveyList() view returns(address[]){
      return surveyList;
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
