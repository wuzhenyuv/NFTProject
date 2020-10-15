const AdcToken = artifacts.require("AdcToken");
const AdcPool = artifacts.require("AdcPool");
const AdvertiseNFT = artifacts.require("AdvertiseNFT");

module.exports = function(deployer,network,accounts) {
  // 布署SushiToken
  deployer.deploy(AdcToken).then((AdcTokenInstance)=>{
    // 布署主厨合约
    return deployer.deploy(AdcPool,
      AdcTokenInstance.address, //sushiToken地址
      accounts[0], //开发人员地址
      '100000000000000000000', //每块创建的SUSHI令牌
      '8851261', //SUSHI挖掘开始时的块号
      '18851261' //奖励结束块号
      ).then(async (AdcPoolInstance)=>{
        //将SushiToken的Owner权限交给主厨合约
        await AdcTokenInstance.transferOwnership(AdcPoolInstance.address);
        console.log(await AdcTokenInstance.owner());
      });
  });
};
