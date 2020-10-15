pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./AdcToken.sol";

contract AdvertiseNFT is ERC721("Advertise NFT","AdsNFT"),Ownable{

  using SafeMath for uint256;
  uint256 private sequence = 0; //用于生成自增的token_id
  AdcToken private _adcToken; //Adc代币，消耗用于生成Adc
  uint256 private useOfAdc; //生成NFT需要消耗的Adc
  uint256 private nftFee;   //生成NFT需要交的手续费
  uint256 private nftDefaultPrice = 100; //NFT的默认售价为100 Adc
  // Token name
  string private _name;
  // Token symbol
  string private _symbol;


  mapping(uint => string) linkURLInfo;
  mapping(uint => uint) nftPrice;

  event CreateAdvertiseNFT(string tokenURI,string linkURL);
  event Transfer(uint256 tokenId);

   constructor(
        AdcToken adcToken,
        uint _useOfAdc,
        uint _nftFee
    ) public {
        _adcToken = adcToken;
        useOfAdc = _useOfAdc;
        nftFee = _nftFee;
    }

  //生成NFT根方法
  function _createAdvertiseNFT(string memory tokenURI,string memory linkURL) internal {
    sequence = sequence.add(1);      //生成token_id
    _safeMint(msg.sender,sequence);  //生成NFT
    _setTokenURI(sequence,tokenURI); //设置tokenURI
    linkURLInfo[sequence] = linkURL; //设置链接URL
    nftPrice[sequence] = nftDefaultPrice;
    emit CreateAdvertiseNFT(tokenURI,linkURL);  
  }

  //生成NFT方法，需要扣除一定数额的Adc币才可以
  function crateAdvertiseNFT(string memory tokenURI,string memory linkURL) public {
    require(_adcToken.balanceOf(msg.sender)>=(useOfAdc+nftFee),"ADC余额不足");
    _adcToken.approve(owner(), useOfAdc+nftFee);
    _adcToken.transferFrom(msg.sender,owner(),useOfAdc+nftFee); //转移ADC代币给合约创建者
    _createAdvertiseNFT(tokenURI,linkURL);
  }
  
  //设置扣除的adc数量和税率，税收接受地址，owner可以操作
  function setAdcFee(uint256 _useOfAdc,uint256 _nftFee) public onlyOwner {
    useOfAdc = _useOfAdc;
    nftFee = _nftFee;
  }

  //设置baseURI,owner可以操作
  function setBaseURI(string memory baseURI) public onlyOwner {
    _setBaseURI(baseURI);
  }
  
  //交易方法
  function transfer(uint256 tokenId) public{
    require(_adcToken.balanceOf(msg.sender)>=nftPrice[tokenId],"ADC余额不足以购买");
    _adcToken.transfer(ownerOf(tokenId),nftPrice[tokenId]); //转移ADC代币给合约创建者
    approve(msg.sender,tokenId);
    safeTransferFrom(ownerOf(tokenId),msg.sender,tokenId);
    emit Transfer(tokenId);
  }
  
  //查看账户下的第几个的linkURL
  function getLinkURL(uint256 tokenId) public returns (string memory){
     return linkURLInfo[tokenId];
  }

  //设置NFT的linkURL
  function setLinkURL(uint256 tokenId,string memory linkUrl) public{
    require(ownerOf(tokenId) == msg.sender,"仅限NFT拥有者可以修改");
    linkURLInfo[tokenId] = linkUrl;
  }

  //设置NFT价格，仅限拥有者
  function setNftPrice(uint256 tokenId,uint256 price) public{
    require(ownerOf(tokenId) == msg.sender,"仅限NFT拥有者可以修改");
    nftPrice[tokenId] = price;
  }

   
}