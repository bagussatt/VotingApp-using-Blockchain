const contractAddress = "0xBD18553eDfF44896b332Ad69C8e83047dB9495e6";  // Ganti dengan alamat kontrak yang benar
const contractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [{"name": "", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{"name": "candidateId", "type": "uint256"}],
        "name": "getVotes",
        "outputs": [{"name": "", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{"name": "candidateId", "type": "uint256"}],
        "name": "vote",
        "outputs": [],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{"name": "", "type": "uint256"}],
        "name": "candidates",
        "outputs": [{"name": "name", "type": "string"}, {"name": "voteCount", "type": "uint256"}],
        "type": "function"
    }
];

let web3;
let contract;
let account;

async function loadBlockchainData() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        document.getElementById("account").innerText = account;

        contract = new web3.eth.Contract(contractABI, contractAddress);
        const candidatesCount = await contract.methods.candidatesCount().call();

        let candidatesDiv = document.getElementById("candidates");
        candidatesDiv.innerHTML = "";

        for (let i = 0; i < candidatesCount; i++) {
            const candidate = await contract.methods.candidates(i).call();
            const votes = await contract.methods.getVotes(i).call();

            let candidateElement = document.createElement("div");
            candidateElement.className = "card";
            candidateElement.innerHTML = `
                <h3>${candidate.name}</h3>
                <p>Votes: <span id="votes-${i}">${votes}</span></p>
                <button class="vote-btn" onclick="vote(${i})">Vote</button>
            `;
            candidatesDiv.appendChild(candidateElement);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

async function vote(candidateId) {
    await contract.methods.vote(candidateId).send({ from: account });
    const newVoteCount = await contract.methods.getVotes(candidateId).call();
    document.getElementById(`votes-${candidateId}`).innerText = newVoteCount;
}

window.onload = loadBlockchainData;
