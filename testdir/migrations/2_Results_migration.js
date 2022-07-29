const Migrations = artifacts.require("Results");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
