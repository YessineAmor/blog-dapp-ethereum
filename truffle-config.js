const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // match any network
    }
  },
  compilers: {
    solc: {
      version: "0.5.11", // A version or constraint - Ex. "^0.5.0"
      // Can also be set to "native" to use a native solc
    }
  },
  plugins: ["truffle-security"]
};
