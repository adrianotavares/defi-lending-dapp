const contractAddress = “0xCB8Fe185138Df60e5B05De2468D80E1bEe6E38eD”;
const abi = [
  “function deposit() payable”,
  “function borrow(uint256 amount)”,
  “function repay() payable”,
  “function getPoolBalance() view returns (uint256)”
];

let signer, contract;

async function connectWallet() {
  await window.ethereum.request({ method: ‘eth_requestAccounts’ });
  const provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);
  log(”Carteira conectada!”);
}

async function deposit() {
  const value = document.getElementById(”depositValue”).value;
  const tx = await contract.deposit({ value: ethers.parseEther(value) });
  await tx.wait();
  log(”Depósito realizado!”);
}

async function borrow() {
  const value = document.getElementById(”borrowValue”).value;
  const tx = await contract.borrow(ethers.parseEther(value));
  await tx.wait();
  log(”Empréstimo recebido!”);
}

async function repay() {
  const value = document.getElementById(”repayValue”).value;
  const tx = await contract.repay({ value: ethers.parseEther(value) });
  await tx.wait();
  log(”💸 Empréstimo quitado!”);
}

function log(msg) {
  document.getElementById(”log”).textContent = msg;
}
