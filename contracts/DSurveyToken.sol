pragma solidity ^0.4.24;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/BurnableToken.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/AddressUtils.sol";
import "./DSurveyTokenReceiver.sol";

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `StandardToken` functions.
 */
contract DSurveyToken is StandardBurnableToken, CappedToken, PausableToken {
  using AddressUtils for address;

  bytes4 internal constant DSURVEY_TOKEN_RECEIVED = 0x3eed4dd4;

  string public constant name = "dSurveyToken"; // solium-disable-line uppercase
  string public constant symbol = "DST"; // solium-disable-line uppercase
  uint8 public constant decimals = 18; // solium-disable-line uppercase

  uint256 public constant INITIAL_SUPPLY = 1e10 * (10 ** uint256(decimals));
  uint256 public constant CAPPED_SUPPLY = 2e10 * (10 ** uint256(decimals));

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  constructor() CappedToken(CAPPED_SUPPLY) public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    emit Transfer(0x0, msg.sender, INITIAL_SUPPLY);
  }

  function safeTransfer(address _to, uint256 _value) public {
    transfer(_to, _value);
    require(checkAndCallSafeTransfer(_to, _value));
  }

  function checkAndCallSafeTransfer(
    address _to,
    uint256 _value
  )
  internal
  returns (bool)
  {
    if (!_to.isContract()) {
      return true;
    }
    bytes4 retval = DSurveyTokenReceiver(_to).onDSurveyTokenReceived(msg.sender, _value);
    return (retval == DSURVEY_TOKEN_RECEIVED);
  }
}
