const AdcPool = artifacts.require("AdcPool");

module.exports = function(deployer) {
  deployer.deploy(AdvertiseNFT,
    '0xc182F8B634D617e95407032A6774677A2C2532D7', //sushiToken地址
    100,
    10
    );
};


