pragma solidity 0.6.12;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// 具有治理功能的SushiToken 地址 0x6b3595068778dd592e39a122f4f5a5cf09c90fe2
// SushiToken with Governance.
contract AdcToken is ERC20("Advertise Token", "ADC"), Ownable {
    /// @notice 为_to创建`_amount`令牌。只能由所有者（MasterChef）调用
    /// @notice Creates `_amount` token to `_to`. Must only be called by the owner (MasterChef).
    function mint(address _to, uint256 _amount) public onlyOwner {
        // ERC20的铸币方法
        _mint(_to, _amount);
    }
}