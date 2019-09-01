var SimpleStorage = artifacts.require("./Blog.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
