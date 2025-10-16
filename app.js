const contractAddress = "0x63BFa9D9d1a33cE51A6F7aFD79fd2EC88193B3A5";
const abi = [
  "function deposit() payable",
  "function borrow(uint256 amount)",
  "function repay() payable",
  "function getPoolBalance() view returns (uint256)",
  "function deposits(address) view returns (uint256)",
  "function loans(address) view returns (uint256)",
  "function interestRate() view returns (uint256)"
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
    
    // Exibir seção de informações do usuário
    document.getElementById("userInfo").style.display = "block";
    
    // Atualizar saldo do contrato após conectar
    await updateContractBalance();
    
    // Atualizar informações do usuário após conectar
    await updateUserInfo();
    
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
      await updateContractBalance();
      await updateUserInfo();
      document.getElementById("depositValue").value = "";
      log("Depósito realizado!");
    } catch (err) {
      log("Erro ao depositar: " + err.message);
    }
}

async function borrow() {
 try {
      const value = document.getElementById("borrowValue").value;
      const tx = await contract.borrow(ethers.parseEther(value));
      await tx.wait();
      await updateContractBalance();
      await updateUserInfo();
      document.getElementById("borrowValue").value = "";
      log("Empréstimo recebido!");
    } catch (err) {
      log("Erro ao fazer empréstimo: " + err.message);
    }
}

async function repay() {
  try {
      const value = document.getElementById("repayValue").value;
      const tx = await contract.repay({ value: ethers.parseEther(value) });
      await tx.wait();
      await updateContractBalance();
      await updateUserInfo();
      document.getElementById("repayValue").value = "";
      log("Empréstimo quitado!");
    } catch (err) {
      log("Erro ao quitar empréstimo: " + err.message);
    }
}

async function updateContractBalance() {
  try {
    if (!contract) {
      // Se não há contrato conectado, criar uma instância apenas para leitura
      const provider = new ethers.BrowserProvider(window.ethereum);
      const readOnlyContract = new ethers.Contract(contractAddress, abi, provider);
      const balance = await readOnlyContract.getPoolBalance();
      document.getElementById("contractBalance").textContent = ethers.formatEther(balance);
    } else {
      const balance = await contract.getPoolBalance();
      document.getElementById("contractBalance").textContent = ethers.formatEther(balance);
    }
  } catch (err) {
    document.getElementById("contractBalance").textContent = "Erro ao carregar";
    console.error("Erro ao buscar saldo do contrato:", err);
  }
}

async function updateUserInfo() {
  try {
    if (!contract || !signer) {
      return;
    }

    const userAddress = await signer.getAddress();
    
    // Buscar depósitos do usuário
    const userDeposits = await contract.deposits(userAddress);
    document.getElementById("userDeposits").textContent = ethers.formatEther(userDeposits);
    
    // Buscar empréstimos do usuário
    const userLoans = await contract.loans(userAddress);
    document.getElementById("userLoans").textContent = ethers.formatEther(userLoans);
    
    // Calcular valor a quitar com juros
    const interestRate = await contract.interestRate();
    const debt = userLoans + (userLoans * interestRate / 100n);
    document.getElementById("debtWithInterest").textContent = ethers.formatEther(debt);
    
  } catch (err) {
    console.error("Erro ao buscar informações do usuário:", err);
    document.getElementById("userDeposits").textContent = "Erro";
    document.getElementById("userLoans").textContent = "Erro";
    document.getElementById("debtWithInterest").textContent = "Erro";
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

// Função que executa quando a página carrega
window.addEventListener('load', async () => {
  // Buscar saldo do contrato ao carregar a página
  await updateContractBalance();
  log("dApp carregado! Conecte sua carteira para interagir.");
});
