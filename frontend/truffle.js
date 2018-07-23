var HDWalletProvider = require("truffle-hdwallet-provider");
// npm install truffle-hdwallet-provider
var mnemonic = "rent oyster equal sun domain mosquito annual skull sting despair book sphere"; // 12 word mnemonic

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 500000,
      network_id: "*" // Match any network id
    }
  },
  ropsten: {
    provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/", 0),
    network_id: 3,
    gas: 500000
  } // live:
};
