// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Results {

  mapping (string => string[8]) hashes;
  address owner;

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOfficial (address sender) {
    require(
      sender == owner,
      "Only officials may add hashes"
    );
    _;
  }

  function set
    (string memory _hash, uint _sem, string memory _roll)
    public
    onlyOfficial(msg.sender)
  {
    string memory tempHash;
    tempHash = _hash;

    hashes[_roll][_sem] = tempHash;
  }

  function get(string memory _roll, uint _sem)
    public
    view
    returns(string memory)
  {
    return hashes[_roll][_sem];
  }
}