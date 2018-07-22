pragma solidity ^0.4.24;

contract DSurveyTokenReceiver {
  bytes4 internal constant DSURVEY_TOKEN_RECEIVED = 0x3eed4dd4;
  function onDSurveyTokenReceived(
    address _from,
    uint _value
  )
  public
  returns(bytes4);
}
