# Meta-ATM-3.0

This Is An Upgraded Project Version Which Demonstrates An Running Of An Simple Web3 Page With Solidity Contract By Connecting Wallet In Local Network Using React And Also Able To Performing Basic Functions Like Deposit,Withdraw And Transfer Hope You Find Its Usefull..

## Description

This is An Upgraded Version Of Meta Atm 2.0 .Which Include Some New Functions Like Transfer Function And Other Info Giving Information Like Gas Limit,Gas Left,Chain ID,Gas Consumed On Each Transction. And UI Also Improved With Adding Image And All Aslo Removing Unnecessary Functions 
This Program Shows What Are The Basic Function That You Need To Do Transactions Like Deposit , Withdraw and Transaction Also How You can Add Your own Functions To The smart Contract And Hoe You Can Bring The Value To The Front End And Also To Customise Your Web3 Page!!!!!


## Getting Started
* You Guys Can Start running This project One Any Online IDE That Support solidity Like (Gitpod,Remix)
* You Can Use Ofcourse Offline Softawres If You Prefer That Way I Suggest Using (VScode)
* After you Setup Your IDE You Can Start Working OnThe Files By Importing From This GitHub Page Or Cloning Directly 

### Executing program

After Going Through Important Files Like Contract(Assesment.sol),Index.js,deploy.js You Are REady To Fire Your Web3 Page Using React Follow these Instructions To Successfully run The Program
*First Add Two More Terminal (bash Terminals) By Clicking(+)icon On Terminal
*Inside The First Terminal Type The Following Code:
````
npm i
````
*Inside The Second Terminal Type The Following Code:
````
npx hardhat node
````
*Inside The Third Terminal Type The Following Code:
````
npx hardhat run --network localhost scripts/deploy.js
````
*After That Come Back To The Firt Terminal Type The Following Code To Launch The Front End:
````
npm run dev
````
*After this, the project will be running on your localhost. Typically at http://localhost:3000/

## Connect Wallet To The Page
*In Order To connect Wallet to Your Web3 Page You Need To Have A Wallet At First place (MetaMask Wallet Is Required)
*After that You Need To Get Your RPC URL Which Will Be Provided In Your Second Terminal
But If You Are Running The program On Online IDE Like Gitpod,Remix Instead Of RPC Url You Need Port URL Mainly Port(8475) Which Can Be Obtained From Port Tab Next To The Terminal
*For Other Details Of Net Work Follow Below Info
````
Name:Whatever You Like
Chain ID:31337
Currency Symbol:ETH
````
## Add Owners Account To the NetWork
*After Sucessfully Adding Your NetWork You Need To Import Owners Account To Your Newly Created NetWork
*For That Copy th Private Key Of Account No :"0" From The Second Terminal and Import It Yuor NetWork By Clickung On Add Account 
*After That You Are Ready To Call Any funtions On Contract Using The Buttons And Text Box Play With The Values And Change The Color of Button and WebPage
## Help
*After Sucessfully Deploying All The Steps There Is A Chance That Your Transcation Fails Due To Null Error
*To Fix NullError You Need To Clear The Tab Data Of Your Wallet By Clicking :
````
settings-->Advanced-->Network-->Clear activity tab data
````
Still Facing Some Unknown Error !!!Feel Free To Contact Me On My Gmail For Futher Clarification:
````
iamoneofthechoosen1@gmail.com
````

## Authors

Dabi 

## Liscence 
Dabi
