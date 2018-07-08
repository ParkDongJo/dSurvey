pragma solidity ^0.4.24;

contract Survey {
    string[]  public question;
    mapping (uint => string[]) public choice;
    mapping (address => mapping (uint => string)) public answer;

    constructor() public {
    }
}
