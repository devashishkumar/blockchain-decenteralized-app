// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Campaign {
    uint256 public numOfCampaigners;

    mapping(uint256 => address) public campaigners;

    receive() external payable {}

    function transfer() external payable {
        campaigners[numOfCampaigners] = msg.sender;
    }

    function withdraw(uint256 withdrawalAmount) external {
        require(withdrawalAmount <= 2000000000000000000, "Cannot Withdraw");
        payable(msg.sender).transfer(withdrawalAmount);
    }
}
