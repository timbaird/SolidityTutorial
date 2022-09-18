// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Counter{

    // store a numerical value
    // Increase the count
    // Decrease the count
    // Store a name / set name
    string public name;
    uint public count;
    address payable owner;

    constructor(string memory _name, uint _count){
        name = _name;
        count = _count;
        owner = payable(msg.sender);
    }

    // not used in this example
    /*
    modifier onlyOwner(){
        require(owner == msg.sender);
        _;
    }
    */

    function increment() public returns(uint newCount){
        count++;
        return count;
    }

    function decrement() public returns(uint newCount){
        count--;
        return count;
    }

    function getCount() public view returns(uint){
        return count;
    }

    function getName() public view returns(string memory){
        return name;
    }

    function setName(string memory _newName) public{
        name = _newName;
    }
}