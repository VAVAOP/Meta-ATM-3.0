// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;
    

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
  
    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        
    }
    
    function blocktime() public view returns(uint){
        return block.timestamp;
    }
    function messagevalue() payable  external returns(uint){
        return msg.value;
    }
    function txgasprice() public view returns(uint){
        return tx.gasprice;
    }
    function txorigin() public view returns(address){
        return tx.origin;
    }
    function chainid() public view returns(uint){
        return block.chainid;
    }
    function gaslimit() public view returns(uint){
        return block.gaslimit;
    }
    function blocknumber() public view returns(uint){
        return block.number;
    }
    function gas_left() public view returns (uint256){
        return gasleft();
    }

    function transfer(address payable recipient ,uint amount) public payable{
       
       amount=msg.value;

        recipient.transfer(msg.value);

        
    }

    function getBalance() public view returns(uint256){
        return balance;
    }
   


    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }
}

