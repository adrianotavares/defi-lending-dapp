# DeFi lending dApp

Este projeto é um DApp de empréstimos descentralizados (DeFi Lending) na testnet Sepolia, com front-end publicado no GitHub Pages.

## Sumário

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Deploy do Smart Contract via Remix](#deploy-do-smart-contract-via-remix)
- [Configuração da MetaMask](#configuração-da-metamask)
- [Publicação do Front-End no GitHub Pages](#publicação-do-front-end-no-github-pages)
- [Uso](#uso)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuições](#contribuições)
- [Licença](#licença)

## Visão Geral

O DeFi Lending DApp permite que usuários depositem ativos como garantia e tomem empréstimos de forma automatizada através de contratos inteligentes Ethereum. O objetivo é ser um exemplo simples de como implementar e interagir com contratos DeFi.

[#7 DeFi na Prática: construindo um dApp de empréstimos na Blockchain](https://ethbeaga.substack.com/p/7-defi-na-pratica-construindo-um)

## Pré-requisitos

- Conta MetaMask configurada na testnet Sepolia
- ETH de teste (Sepolia Faucet)
- GitHub account

## Deploy do Smart Contract via Remix

1. **Acesse o [Remix IDE](https://remix.ethereum.org/).**

2. **Carregue o contrato `SimpleLending.sol`:**
   - Crie um novo arquivo chamado `SimpleLending.sol` na aba "File Explorer" do Remix.
   - Cole o conteúdo do contrato no arquivo.

3. **Compile o contrato:**
   - Selecione a versão do compilador Solidity adequada (ex: 0.8.28) na aba "Solidity Compiler".
   - Clique em "Compile SimpleLending.sol".

4. **Conecte sua MetaMask à testnet Sepolia:**
   - Garanta que a MetaMask está no navegador e conectada na rede Sepolia.

5. **Faça o deploy do contrato:**
   - Vá para a aba "Deploy & Run Transactions".
   - Selecione a conta MetaMask desejada.
   - Escolha "Injected Provider - MetaMask" como ambiente.
   - Clique em "Deploy" e aprove a transação na MetaMask.

6. **Anote o endereço do contrato gerado:**  
   - O Remix exibirá o endereço do contrato na seção "Deployed Contracts".
   - Use esse endereço para configurar o front-end.

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
- **Remix IDE** — Deploy do contrato na Sepolia
- **MetaMask** — Carteira para interação com dApps
- **Ethers.js** — Conexão Web3 front-end
- **GitHub Pages** — Hospedagem do front-end

## Contribuições

Contribuições são bem-vindas! Abra issues e pull requests para melhorias, correções ou sugestões.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
