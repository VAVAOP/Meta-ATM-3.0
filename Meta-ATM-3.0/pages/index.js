import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import banner from "../src/images/banner.jpg";

export default function HomePage() {
  const [color] = useState("yellow")
  useEffect(()=>{
   document.body.style.backgroundColor = color
  });
  useEffect(()=>{
   document.body.style.backgroundImage = `url('${banner}')`
  });
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
  // Data Functions//

  const blocktimeprint =()=>{
    alert(BlockTime)
  }
  const [BlockTime,setBlockTime] =useState(undefined);
  const getBlockTime =async()=>{
    if (atm){
      setBlockTime((await atm.blocktime()));
    }
  }
  const sendownerprint =()=>{
    alert(SendOwner)
  }
  const [SendOwner,setSendOwner] =useState(undefined);
  const getSendOwner =async()=>{
    if (atm){
      setSendOwner((await atm.sendowner()));
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
  //Simple And Compound Interest Function//
  const [Principle,SetPrinciple]=useState(undefined);
  const principlechange=event =>{
    SetPrinciple(event.target.value)
  }
  const [NoOfYear,SetNoOfYear]=useState(undefined);
  const noofyearchange=event =>{
    SetNoOfYear(event.target.value)
  }

  const compoundinterestprint =()=>{
    alert(CompoundInterest)
  }
  const [CompoundInterest,setCompoundInterest] =useState(undefined);
  const getCompoundInterest =async()=>{
    if (atm){
      setCompoundInterest((await atm.compoundInterest(Principle,NoOfYear)));
    }
  }


  const simpleinterestprint =()=>{
    alert(SimpleInterest)
  }
  const [SimpleInterest,setSimpleInterest] =useState(undefined);
  const getSimpleInterest =async()=>{
    if (atm){
      setSimpleInterest((await atm.simpleInterest(Principle,NoOfYear)));
    }
  }



   //Deposit And Withdraw Function//

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
    if (SendOwner == undefined) {
      getSendOwner();
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
      <div className="bg" style={{backgroundImage:`url(${require('../src/images/banner.jpg')})`}}>
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

<button style={{background:'black',color:'white'}} onClick={()=>{
        getBlockTime();
        blocktimeprint();
        }}>Block Time</button>

        <button style={{background:'black',color:'white'}} onClick={()=>{
        sendownerprint();
        getSendOwner();
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

        <div>
          <p>We Provide 80% Interest Rate !!!</p>
          <p>Calculate Simple And Compound Interest</p>

          <input 
      type="text"
      placeholder="Investing Amount"
      value={Principle}
      onChange={principlechange}
      />
        <input 
      type="text"
      placeholder="Number Of Years Investing"
      value={NoOfYear}
      onChange={noofyearchange}
      />

<button style={{background:'blue',color:'white'}} onClick={()=>{
        simpleinterestprint();
        getSimpleInterest();
        }}>Simple Interest</button>

<button style={{background:'blue',color:'white'}} onClick={()=>{
        compoundinterestprint();
        getCompoundInterest();
        }}>Compound Interest</button>

        </div>

        
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM 3.0!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
          .bg{
          background-image: url(../images/banner.jpg);
          background-size:cover;
          }
      `}
      </style>
    </main>
  )
}
