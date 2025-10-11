# DeFi lending dApp

Este projeto é um DApp de empréstimos descentralizados (DeFi Lending) na testnet Sepolia, com front-end publicado no GitHub Pages.

## Sumário

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Deploy do Smart Contract](#deploy-do-smart-contract)
- [Configuração da MetaMask](#configuração-da-metamask)
- [Publicação do Front-End no GitHub Pages](#publicação-do-front-end-no-github-pages)
- [Uso](#uso)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuições](#contribuições)
- [Licença](#licença)

## Visão Geral

O DeFi Lending DApp permite que usuários depositem ativos como garantia e tomem empréstimos de forma automatizada através de contratos inteligentes Ethereum. O objetivo é ser um exemplo simples de como implementar e interagir com contratos DeFi.

## Pré-requisitos

- Node.js >= 18.x
- [Hardhat](https://hardhat.org/)
- Conta MetaMask configurada na testnet Sepolia
- ETH de teste (Sepolia Faucet)
- GitHub account

## Deploy do Smart Contract

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Compile os contratos:

   ```bash
   npx hardhat compile
   ```

3. Faça o deploy na Sepolia:

   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. Anote o endereço do contrato gerado, por exemplo: `0x1234...`.

## Configuração da MetaMask

- Adicione a **testnet Sepolia** à sua carteira MetaMask.
- Obtenha ETH de teste em um [faucet oficial da Sepolia](https://sepoliafaucet.com/).
- Importe a conta desejada e certifique-se de ter saldo suficiente para interagir com o DApp.

## Publicação do Front-End no GitHub Pages

1. Crie o repositório `defi-lending-dapp` no GitHub.
2. Faça upload dos arquivos `index.html` e `app.js` (e demais dependências do front-end).
3. Vá em **Settings → Pages** e configure:
   - Branch: `main`
   - Pasta: `/root` (diretório raiz)
4. Acesse sua aplicação em:  
   [https://adrianotavares.github.io/defi-lending-dapp/](https://adrianotavares.github.io/defi-lending-dapp/)

## Uso

- Abra o site publicado no GitHub Pages.
- Conecte sua carteira MetaMask à testnet Sepolia.
- Interaja com o DApp: faça depósitos, peça empréstimos, consulte seus saldos e liquidações.

## Tecnologias Utilizadas

- **Solidity** — Contratos inteligentes
- **Hardhat** — Ambiente de desenvolvimento Ethereum
- **MetaMask** — Carteira para interação com dApps
- **Ethers.js** — Conexão Web3 front-end
- **GitHub Pages** — Hospedagem do front-end

## Contribuições

Contribuições são bem-vindas! Abra issues e pull requests para melhorias, correções ou sugestões.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
