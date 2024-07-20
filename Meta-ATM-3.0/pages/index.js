import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [color] = useState("yellow")
  useEffect(()=>{
   document.body.style.backgroundColor = color
  })
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }
  const blocktimeprint =()=>{
    alert(BlockTime)
  }
  const [BlockTime,setBlockTime] =useState(undefined);
  const getBlockTime =async()=>{
    if (atm){
      setBlockTime((await atm.blocktime()));
    }
  }

  const messagevalueprint =()=>{
    alert(MessageValue)
  }
  const [MessageValue,setMessageValue] =useState(undefined);
  const getMessageValue =async()=>{
    if (atm){
      setMessageValue((await atm.messagevalue()));
    }
  }
  const txgaspriceprint =()=>{
    alert(TxGasPrice)
  }
  const [TxGasPrice,setTxGasPrice] =useState(undefined);
  const getTxGasPrice =async()=>{
    if (atm){
      setTxGasPrice((await atm.txgasprice()));
    }
  }
  const txoriginprint =()=>{
    alert(TxOrigin)
  }
  const [TxOrigin,setTxOrigin] =useState(undefined);
  const getTxOrigin =async()=>{
    if (atm){
      setTxOrigin((await atm.txorigin()));
    }
  }
  const chainidprint =()=>{
    alert(ChainId)
  }
  const [ChainId,setChainId] =useState(undefined);
  const getChainId =async()=>{
    if (atm){
      setChainId((await atm.chainid()));
    }
  }
  const gaslimitprint =()=>{
    alert(GasLimit)
  }
  const [GasLimit,setGasLimit] =useState(undefined);
  const getGasLimit =async()=>{
    if (atm){
      setGasLimit((await atm.gaslimit()));
    }
  }
  const blocknumberprint =()=>{
    alert(BlockNumber)
  }
  const [BlockNumber,setBlockNumber] =useState(undefined);
  const getBlockNumber =async()=>{
    if (atm){
      setBlockNumber((await atm.blocknumber()));
    }
  }
  const gasleftprint =()=>{
    alert(GasLeft)
  }
  const [GasLeft,setGasLeft] =useState(undefined);
  const getGasLeft =async()=>{
    if (atm){
      setGasLeft((await atm.gas_left()));
    }
  }

  const [TransferAddress,SetTransferAddress]=useState(undefined);
  const transferaddresschange=event =>{
    SetTransferAddress(event.target.value)
  }

const [TransferAmount,SetTransferAmount]=useState(undefined);
const transferamountchange=event =>{
SetTransferAmount(event.target.value)
}
 
const transferamount = async() => {
  if (atm) {
    let tx = await atm.transfer(TransferAddress,TransferAmount);
    await tx.wait()
    getBalance();
  }
}
  
 
  
  const amountdeposit =async() =>  {
    if (atm) {
      let tx = await atm.deposit(DepositAmount);
      await tx.wait();
      getBalance();
    }
  }
  const [DepositAmount,SetDepositAmount]= useState(undefined);
 
  const depositchange = event =>{
    SetDepositAmount(event.target.value)
  }

  
  const amountwithdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(WithdrawAmount);
      await tx.wait()
      getBalance();
    }
  }
  const [WithdrawAmount,SetWithdrawAmount]= useState(undefined);
 
  const withdrawchange = event =>{
    SetWithdrawAmount(event.target.value)
  }


  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }
    if (BlockTime == undefined) {
      getBlockTime();
    }
    if (MessageValue == undefined) {
      getMessageValue();
    }
    if (TxGasPrice == undefined) {
      getTxGasPrice();
    }
    if (TxOrigin == undefined) {
      getTxOrigin();
    }if (ChainId == undefined) {
      getChainId();
    }
    if (GasLimit == undefined) {
      getGasLimit();
    }
    if (BlockNumber == undefined) {
      getBlockNumber();
    }
    if (GasLeft == undefined) {
      getGasLeft();
    }
    
    return (
      <div style="background:url('./banner-img-1.jpg')">
        background-image:url("banner-img-1.jpg");

        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        
        <input 
      type="text"
      placeholder="Deposit Amount"
      value={DepositAmount}
      onChange={depositchange}
      />
       <button style={{background:'green',color:'white'}} onClick ={()=>{
        amountdeposit()
        }}>Deposit</button>  

<input 
      type="text"
      placeholder="Withdraw Amount"
      value={WithdrawAmount}
      onChange={withdrawchange}
      />
       <button style={{background:'green',color:'white'}} onClick ={()=>{
        amountwithdraw() 
       }}>Withdraw</button>

   <input
        type="text"
        placeholder="Transfer Address"
        value={TransferAddress}
        onChange={transferaddresschange}
        />
        <input 
      type="text"
      placeholder="Withdraw Amount"
      value={TransferAmount}
      onChange={transferamountchange}
      />
        <button style={{background:'green',color:'white'}} onClick ={()=>{
          transferamount();
        }}>transfer</button>
        
        <button style={{background:'black',color:'white'}} onClick={()=>{
        blocktimeprint();
        getBlockTime();
        }}>Block Time</button>

        <button style={{background:'black',color:'white'}} onClick={()=>{
        messagevalueprint();
        getMessageValue();
        }}>Message_Value</button>

        <button style={{background:'black',color:'white'}} onClick={()=>{
        txgaspriceprint();
        getTxGasPrice();
        }}>Tx Gas Price</button>

        <button style={{background:'black',color:'white'}} onClick={()=>{
        txoriginprint();
        getTxOrigin();
        }}>Sender Address</button>

        <button style={{background:'black',color:'white'}} onClick={()=>{
        chainidprint();
        getChainId();
        }}>Chain Id</button>

        <button style={{background:'black',color:'white'}} onClick={()=>{
        gaslimitprint();
        getGasLimit();
        }}>Gas Limit</button>

        <button style={{background:'black',color:'white'}} onClick={()=>{
        blocknumberprint();
        getBlockNumber();
        }}>Block Number</button>

        <button style={{background:'black',color:'white'}} onClick={()=>{
        gasleftprint();
        getGasLeft();
        }}>Gas Left</button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM 3.0 !</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
          background :url('banner-img-1.jpg');
          background-repeat:no-repeat;
          background-position:center;
          background-size:cover;
      `}
      </style>
    </main>
  )
  
}
