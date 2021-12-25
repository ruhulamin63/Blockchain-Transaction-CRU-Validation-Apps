const sha256 = require('crypto-js/sha256'); //hash generate2

class Block{
    constructor (index, timestamp, data, previousHash = ''){
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    //node-modules install command => npm install --save crypto-js

    calculateHash(){
        return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){

        while(this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined : " + this.hash);
    }
}

class BlockChain{

    constructor (){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2; //proof of work
    }

    createGenesisBlock(){
        return new Block(0, "24/12/2022", "Genesis block", "0");
    }

    getnewBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getnewBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    // isChainValidateCheck() {

    //     for(let i=1; i<this.chain.length; i++){
    //         const currentBlock = this.chain[i];
    //         const previousBlock = this.chain[i-1];
    
    //         if(currentBlock.hash != currentBlock.calculateHash()){
    //             return false;
    //         }
    
    //         if(currentBlock.previousHash != previousBlock.hash){
    //             return false;
    //         }
    //     }
    
    //     return true;
    // }
}

let Coin = new BlockChain();

console.log('Mining block 1... ');
Coin.addBlock(new Block(1, "12/12/2021", {amount:100}));

console.log('Mining block 2... ');
Coin.addBlock(new Block(2, "12/12/2021", {amount:500}));

//console.log(JSON.stringify(Coin, null, 100));

// console.log('Is blockchain valid ? ' + Coin.isChainValidateCheck());

// Coin.chain[1].data = {amount: 10};
// console.log('Is blockchain valid ? ' + Coin.isChainValidateCheck());