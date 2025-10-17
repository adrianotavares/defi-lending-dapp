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
    
    // Verificar se está na rede Sepolia
    const network = await provider.getNetwork();
    const sepoliaChainId = 11155111;
    
    if (Number(network.chainId) !== sepoliaChainId) {
      // Tentar trocar para Sepolia automaticamente
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chainId em hex
        });
        log("Trocando para Sepolia Testnet...");
        // Aguardar um momento para a troca ser processada
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (switchError) {
        // Se a rede não estiver adicionada, adicionar Sepolia
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0xaa36a7',
                chainName: 'Sepolia Test Network',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['https://sepolia.infura.io/v3/'],
                blockExplorerUrls: ['https://sepolia.etherscan.io/']
              }]
            });
            log("Rede Sepolia adicionada! Conectando...");
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (addError) {
            log("Erro ao adicionar rede Sepolia. Mude manualmente para Sepolia Testnet.");
            return;
          }
        } else {
          log("Erro ao trocar rede. Mude manualmente para Sepolia Testnet.");
          return;
        }
      }
    }
    
    // Verificar novamente após a tentativa de troca
    const updatedNetwork = await provider.getNetwork();
    if (Number(updatedNetwork.chainId) !== sepoliaChainId) {
      log("❌ Este dApp funciona apenas na Sepolia Testnet. Por favor, troque a rede no MetaMask.");
      return;
    }
    
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    
    // Obter endereço da wallet
    const address = await signer.getAddress();
    document.getElementById("walletAddress").textContent = address;
    
    // Obter informações da rede
    const networkName = getNetworkName(updatedNetwork.chainId);
    document.getElementById("networkName").textContent = networkName;
    
    // Exibir seção de informações da wallet
    document.getElementById("walletInfo").style.display = "block";
    
    // Exibir seção de informações do usuário
    document.getElementById("userInfo").style.display = "block";
    
    // Atualizar saldo do contrato após conectar
    await updateContractBalance();
    
    // Atualizar informações do usuário após conectar
    await updateUserInfo();
    
    log("✅ Carteira conectada na Sepolia Testnet!");
  } catch (err) {
    log("Erro ao conectar: " + err.message);
  }
}

async function deposit() {
    try {
      if (!await validateNetwork()) return;
      
      const value = document.getElementById("depositValue").value;
      if (!value || parseFloat(value) <= 0) {
        log("Por favor, insira um valor válido para depositar.");
        return;
      }
      
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
      if (!await validateNetwork()) return;
      
      const value = document.getElementById("borrowValue").value;
      if (!value || parseFloat(value) <= 0) {
        log("Por favor, insira um valor válido para empréstimo.");
        return;
      }
      
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
      if (!await validateNetwork()) return;
      
      const value = document.getElementById("repayValue").value;
      if (!value || parseFloat(value) <= 0) {
        log("Por favor, insira um valor válido para quitação.");
        return;
      }
      
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

async function validateNetwork() {
  if (!window.ethereum || !signer) {
    log("Carteira não conectada! Conecte sua carteira primeiro.");
    return false;
  }
  
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    const sepoliaChainId = 11155111;
    
    if (Number(network.chainId) !== sepoliaChainId) {
      log("❌ Operação cancelada! Troque para Sepolia Testnet.");
      return false;
    }
    
    return true;
  } catch (err) {
    log("Erro ao validar rede: " + err.message);
    return false;
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

// Função para detectar mudanças de rede
function setupNetworkListener() {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', (chainId) => {
      const sepoliaChainId = '0xaa36a7'; // Sepolia em hex
      if (chainId !== sepoliaChainId) {
        log("❌ Rede alterada! Este dApp funciona apenas na Sepolia Testnet.");
        // Ocultar seções de informações do usuário
        document.getElementById("walletInfo").style.display = "none";
        document.getElementById("userInfo").style.display = "none";
        // Limpar variáveis de contrato
        signer = null;
        contract = null;
      } else {
        log("✅ Conectado na Sepolia Testnet! Clique em 'Conectar MetaMask' novamente.");
      }
    });

    // Detectar mudanças de conta
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        log("Carteira desconectada!");
        document.getElementById("walletInfo").style.display = "none";
        document.getElementById("userInfo").style.display = "none";
        signer = null;
        contract = null;
      }
    });
  }
}

// Função que executa quando a página carrega
window.addEventListener('load', async () => {
  // Configurar listeners de rede
  setupNetworkListener();
  
  // Buscar saldo do contrato ao carregar a página
  await updateContractBalance();
  log("dApp carregado! Conecte sua carteira para interagir.");
});
