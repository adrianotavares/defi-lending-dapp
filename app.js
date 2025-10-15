const contractAddress = "0x63BFa9D9d1a33cE51A6F7aFD79fd2EC88193B3A5";
const abi = [
  "function deposit() payable",
  "function borrow(uint256 amount)",
  "function repay() payable",
  "function getPoolBalance() view returns (uint256)"
];

let signer, contract;

async function connectWallet() {
  if (!window.ethereum) {
    log("MetaMask não encontrada. Instale a extensão!");
    return;
  }
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    
    // Obter endereço da wallet
    const address = await signer.getAddress();
    document.getElementById("walletAddress").textContent = address;
    
    // Obter informações da rede
    const network = await provider.getNetwork();
    const networkName = getNetworkName(network.chainId);
    document.getElementById("networkName").textContent = networkName;
    
    // Exibir seção de informações da wallet
    document.getElementById("walletInfo").style.display = "block";
    
    log("Carteira conectada com sucesso!");
  } catch (err) {
    log("Erro ao conectar: " + err.message);
  }
}

async function deposit() {
    try {
      const value = document.getElementById("depositValue").value;
      const tx = await contract.deposit({ value: ethers.parseEther(value) });
      await tx.wait();
      log("Depósito realizado!");
    } catch (err) {
      log("Erro ao conectar: " + err.message);
    }
}

async function borrow() {
 try {
      const value = document.getElementById("borrowValue").value;
      const tx = await contract.borrow(ethers.parseEther(value));
      await tx.wait();
      log("Empréstimo recebido!");
    } catch (err) {
      log("Erro ao conectar: " + err.message);
    }
}

async function repay() {
  try {
      const value = document.getElementById("repayValue").value;
      const tx = await contract.repay({ value: ethers.parseEther(value) });
      await tx.wait();
      log("Empréstimo quitado!");
    } catch (err) {
      log("Erro ao conectar: " + err.message);
    }
}

function getNetworkName(chainId) {
  const networks = {
    1: "Ethereum Mainnet",
    5: "Goerli Testnet", 
    11155111: "Sepolia Testnet",
    137: "Polygon Mainnet",
    80001: "Mumbai Testnet",
    56: "BSC Mainnet",
    97: "BSC Testnet",
    31337: "Localhost",
    1337: "Ganache"
  };
  
  return networks[Number(chainId)] || `Rede desconhecida (ID: ${chainId})`;
}

function log(msg) {
  document.getElementById("log").textContent = msg;
}
