// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "contracts/PriceConverter.sol";


error NotOwner();

contract FundMe {
    using PriceConverter for uint256;
    uint256 public constant MINIMUM_USD = 50 * 1e18;
    address[] public funders;
    mapping (address => uint256) public  addressToAmountFunded;
    address public immutable i_owner;

    constructor() {
        i_owner = msg.sender;
    }

    function fund() public payable {
        // set the ether value to greater than 1 Ether
        require( msg.value.getConversionRate() >= MINIMUM_USD,"Didn't send enough ether");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;

    }

    function withdraw() public ownerOnly{
        for(uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);

        // Tranfer
        // payable(msg.sender).transfer(address(this).balance);

        //send

        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess,"send failed");

        (bool callSucceess,) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSucceess,"call failed");
    }


    modifier ownerOnly {
        // require(msg.sender == owner, "Sender is not owner");
        if(msg.sender != i_owner){
            revert NotOwner();
        }
        _;
    }

    receive() external payable { 
        fund();
    }

    fallback() external payable {
        fund();
     }

}