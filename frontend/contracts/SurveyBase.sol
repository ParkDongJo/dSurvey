pragma solidity ^0.4.24;

import "./DSurveyToken.sol";

contract SurveyBase {
  enum Status {Prepare, Ing, Complete, OnSale}
  enum Action {Owned, Answered, Bought}

  DSurveyToken public token; // 토큰 컨트랙트
}
