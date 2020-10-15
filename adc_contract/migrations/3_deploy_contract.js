const AdvertiseNFT = artifacts.require("AdvertiseNFT");

function transAmount(amount){
  const num = amount * Math.pow(10, 18);
  const numAsHex = "0x" + num.toString(16);
  return numAsHex;
}

module.exports = function(deployer) {
  deployer.deploy(AdvertiseNFT,
    '0xc182F8B634D617e95407032A6774677A2C2532D7', //sushiToken地址
    transAmount(100),
    transAmount(10)
    );
};


