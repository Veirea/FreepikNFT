// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract FreepikNFT is ERC721URIStorage {
    uint256 public tokenCounter;
    mapping(uint256 => uint256) public remainingViews;

    constructor() ERC721("FreepikNFT", "FPK") {
        tokenCounter = 0;
    }

    function mint(string memory tokenURI) public {
        uint256 tokenId = tokenCounter;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        remainingViews[tokenId] = 5; // 5 lượt xem
        tokenCounter++;
    }

    function viewImage(uint256 tokenId) public returns (string memory) {
        require(ownerOf(tokenId) == msg.sender, "Not NFT owner.");
        require(remainingViews[tokenId] > 0, "No views left.");
        remainingViews[tokenId]--;
        return tokenURI(tokenId);
    }

    function getRemainingViews(uint256 tokenId) public view returns (uint256) {
        return remainingViews[tokenId];
    }
}
