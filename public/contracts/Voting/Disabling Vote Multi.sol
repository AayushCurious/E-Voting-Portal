pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../math/DecimalMath.sol";
contract OneTokenOneVote is Ownable {
    using DecimalMath for uint256;

    event VotingCreated();
    event VotingValidated();
    event ProposalEnacted();
    event VoteCasted(address voter, uint256 votes);
    event VoteCanceled(address voter, uint256 votes);

    IERC20 public votingToken;
    mapping(address => uint256) public votes;
    address public targetContract;
    bytes public proposalData;
    uint256 public threshold;
    bool public passed;

    constructor(
        address _votingToken,
        address _targetContract,
        bytes memory _proposalData,
        uint256 _threshold
    ) public Ownable() {
        votingToken = IERC20(_votingToken);
        threshold = _threshold;
        targetContract = _targetContract;
        proposalData = _proposalData;
        emit VotingCreated();
    }

    modifier proposalPassed() {
        require(passed == true, "Cannot execute until vote passes.");
        _;
    }

    /// @dev Function to enact one proposal of this voting.
    function enact() external virtual proposalPassed {
        // solium-disable-next-line security/no-low-level-calls
        (bool success, ) = targetContract.call(proposalData);
        require(success, "Failed to enact proposal.");
        emit ProposalEnacted();
    }

    function vote(uint256 _votes) external virtual {
        votingToken.transferFrom(msg.sender, address(this), _votes);
        votes[msg.sender] = votes[msg.sender].addd(_votes);
        emit VoteCasted(msg.sender, _votes);
    }
   function cancel() external virtual {
        uint256 count = votes[msg.sender];
        delete votes[msg.sender];
        votingToken.transfer(msg.sender, count);
        emit VoteCanceled(msg.sender, count);
    }

    /// @dev Number of votes casted in favour of the proposal.
    function inFavour() public virtual view returns (uint256) {
        return votingToken.balanceOf(address(this));
    }

    /// @dev Number of votes needed to pass the proposal.
    function thresholdVotes() public virtual view returns (uint256) {
        return votingToken.totalSupply().muld(threshold, 4);
    }

    /// @dev Function to validate the threshold
    function validate() public virtual {
        require(
            inFavour() >= thresholdVotes(),
            "Not enough votes to pass."
        );
        passed = true;
        emit VotingValidated();
    }
}
