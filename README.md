# defi-lending-dapp

## Implantação na testnet Sepolia e GitHub Pages

### Passo 1: Deploy do smart contract usando Hardhat

npx hardhat run scripts/deploy.js --network sepolia

Salve o endereço gerado (0x1234...).

### Passo 2: Configurar a carteira MetaMask

Rede: Testnet Sepolia

Carregar a MetaMask com saldo ETH de teste: use um faucet oficial da Sepolia.

### Passo 3: Publicar no GitHub Pages

Crie um repositório defi-lending-dapp.

Faça upload de index.html e app.js.

Vá em Settings → Pages → Branch: main /root.

Acesse: [https://adrianotavares.github.io/defi-lending-dapp/](https://adrianotavares.github.io/defi-lending-dapp/)

