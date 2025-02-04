// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidatesCount;

    event Voted(address indexed voter, uint candidateId);

    constructor(string[] memory candidateNames) {
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates[i] = Candidate(candidateNames[i], 0);
            candidatesCount++;
        }
    }

    function vote(uint candidateId) public {
        require(!voters[msg.sender], "Already voted");
        require(candidateId < candidatesCount, "Invalid candidate");

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;

        emit Voted(msg.sender, candidateId);
    }

    function getVotes(uint candidateId) public view returns (uint) {
        require(candidateId < candidatesCount, "Invalid candidate");
        return candidates[candidateId].voteCount;
    }
}
