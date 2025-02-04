const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
    deployer.deploy(Voting, ["Bagus", "Satrio", "Samudra", "Golput"]);
};
