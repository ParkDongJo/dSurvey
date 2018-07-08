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

}
