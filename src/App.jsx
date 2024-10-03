import Login from './components/Login';
import { ethers } from 'ethers';
import './App.css';
import { useEffect, useState } from 'react';
import Connected from './components/Connected';
import { contractABI, contractAddress } from './constant/constant';
import Finished from './components/Finished';

const App = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [canVote, setCanVote] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  /* -------------------------- connect to metamask -------------------------- */
  async function connectToMetamask() {
    if (window.ethereum) {
      //check if metamask is installed
      try {
        // create a new provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        // // request account access
        // // await provider.send('eth_requestAccounts', []);
        // get the signer
        const signer = await provider.getSigner();
        const address = signer.address;
        setAccount(address);
        console.log('Connected to Metamask with address:', address);
        setIsConnected(true);
        canUserVote();
      } catch (error) {
        console.error('Error connecting to Metamask:', error);
      }
    } else {
      console.log('Metamask not installed');
    }
  }
  /* -------------------------- handle account change ------------------------- */
  const handleAccountChange = (accounts) => {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canUserVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  };
  /* -------------------------- handle metamask events ------------------------- */
  useEffect(() => {
    getCandidates();
    getCurrentStatus();
    getRemainingTime();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
      }
    };
  });
  /* ----------------------------- get candidates ----------------------------- */
  const getCandidates = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const candidates = await contractInstance.getAllVotesOfCandiates();
      const formattedCandidates = candidates.map((candidate, index) => {
        return {
          index: index,
          name: candidate[0],
          votes: parseInt(candidate[1].toString(), 10),
        };
      });
      setCandidates(formattedCandidates);
    }
  };
  /* --------------------------- get current status --------------------------- */
  const getCurrentStatus = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const status = await contractInstance.getVotingStatus();
      setVotingStatus(status);
    }
  };
  /* --------------------------- get remaining time --------------------------- */
  const getRemainingTime = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const remainingTime = await contractInstance.getRemainingTime();
      setRemainingTime(parseInt(remainingTime.toString(), 10));
    }
  };
  /* -------------------------- handle number change -------------------------- */
  const handleNumberChange = async (e) => {
    setNumber(e.target.value);
  };
  /* ------------------------- can user vote or not -------------------------- */
  const canUserVote = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const address = await signer.getAddress();
      const voteStatus = await contractInstance.voters(address);
      console.log(voteStatus, address);
      setCanVote(voteStatus);
    }
  };
  /* ------------------------------ handle vote ------------------------------ */
  const handleVote = async () => {
    if (window.ethereum) {
      setIsLoading(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const tx = await contractInstance.vote(number);
        await tx.wait();
        // Update voting status and candidates after successful vote
        await canUserVote();
        await getCandidates();
      } catch (error) {
        console.error('Error voting:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div>
      {votingStatus ? (
        isConnected ? (
          <Connected
            account={account}
            candidates={candidates}
            remainingTime={remainingTime}
            number={number}
            handleNumberChange={handleNumberChange}
            voteFunction={handleVote}
            showVoteButton={canVote}
            isLoading={isLoading}
          />
        ) : (
          <Login connectWallet={connectToMetamask} />
        )
      ) : (
        <Finished />
      )}
    </div>
  );
};
export default App;
