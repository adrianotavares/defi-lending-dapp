// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleLending {
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public loans;
    uint256 public interestRate = 10; // 10%

    // Depositar ETH no pool
    function deposit() external payable {
        require(msg.value > 0, “Envie algum valor”);
        deposits[msg.sender] += msg.value;
    }

    // Tomar emprestado até 50% do saldo do pool
    function borrow(uint256 amount) external {
        require(amount <= address(this).balance / 2, “Limite excedido”);
        loans[msg.sender] += amount;
        payable(msg.sender).transfer(amount);
    }

    // Quitar o empréstimo com juros
    function repay() external payable {
        uint256 debt = loans[msg.sender] + (loans[msg.sender] * interestRate / 100);
        require(msg.value >= debt, “Valor insuficiente”);
        loans[msg.sender] = 0;
    }

    // Consultar saldo total do pool
    function getPoolBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
