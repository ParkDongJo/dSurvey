pragma solidity ^0.4.24;

/**
 * @title ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 *  from ERC721 asset contracts.
 *
 * @dev ERC721 토큰을 다루려는(=수신할 수 있으려면) 토큰은 반드시 이 규약을 구현해줘야 함.
 */
contract DSurveyTokenReceiver {
  /**
   * @dev Magic value to be returned upon successful reception of an NFT
   *  Equals to `bytes4(keccak256("onERC721Received(address,uint256,bytes)"))`,
   *  which can be also obtained as `ERC721Receiver(0).onERC721Received.selector`
   *
   * @dev 미리 계산해둔 정해진 return 값
   */
  bytes4 internal constant DSURVEY_TOKEN_RECEIVED = 0x3eed4dd4;

  /**
   * @notice Handle the receipt of an NFT
   * @dev The ERC721 smart contract calls this function on the recipient
   *  after a `safetransfer`. This function MAY throw to revert and reject the
   *  transfer. This function MUST use 50,000 gas or less. Return of other
   *  than the magic value MUST result in the transaction being reverted.
   *  Note: the contract address is always the message sender.
   *
   * @dev 규약상 반드시 50,000 gas 이하로 동작해야 함.
   *
   * @param _from The sending address
   * @param _tokenId The NFT identifier which is being transfered
   * @param _data Additional data with no specified format
   * @return `bytes4(keccak256("onERC721Received(address,uint256,bytes)"))`
   */
  function onDSurveyTokenReceived(
    address _from,
    uint _value
  )
  public
  returns(bytes4);
}
