pragma solidity ^0.4.24;

import "./DSurveyToken.sol";

contract SurveyBase {
  enum Status {Prepare, Ing, Complete, OnSale}

  DSurveyToken public token; // 토큰 컨트랙트
}
