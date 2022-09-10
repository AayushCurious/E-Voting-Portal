

pragma solidity ^0.6.0;
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "../math/DecimalMath.sol";
import "../access/Administered.sol";

constructor(
        address _root,
        address _targetContract,
        bytes memory _proposalData,
        uint256 _threshold
    ) public Administered(_root) {
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
    function enact() external virtual onlyAdmin proposalPassed {
        // solium-disable-next-line security/no-low-level-calls
        (bool success, ) = targetContract.call(proposalData);
        require(success, "Failed to enact proposal.");
        emit ProposalEnacted();
    }

    /// @dev Use this function to cast your vote.
    function vote() external virtual onlyUser {
        votes.add(msg.sender);
        emit VoteCasted(msg.sender);
    }

    /// @dev Use this function to cancel your vote.
    function cancel() external virtual onlyUser {
        votes.remove(msg.sender);
        emit VoteCanceled(msg.sender);
    }

    /// @dev Number of votes casted in favour of the proposal.
    function inFavour() public virtual view returns (uint256) {
        return votes.length();
    }

    /// @dev Number of votes needed to pass the proposal.
    function thresholdVotes() public virtual view returns (uint256) {
        return getRoleMemberCount(USER_ROLE).muld(threshold, 4);
    }

    /// @dev Function to validate the threshold
    function validate() public virtual onlyAdmin {
        require(
            inFavour() >= thresholdVotes(),
            "Not enough votes to pass."
        );
        passed = true;
        emit VotingValidated();
    }

  
  constructor(
        address _root,
        address _targetContract,
        bytes memory _proposalData,
        uint256 _threshold
    ) public Administered(_root) {
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
    function enact() external virtual onlyAdmin proposalPassed {
        // solium-disable-next-line security/no-low-level-calls
        (bool success, ) = targetContract.call(proposalData);
        require(success, "Failed to enact proposal.");
        emit ProposalEnacted();
    }

    /// @dev Use this function to cast your vote.
    function vote() external virtual onlyUser {
        votes.add(msg.sender);
        emit VoteCasted(msg.sender);
    }

    /// @dev Use this function to cancel your vote.
    function cancel() external virtual onlyUser {
        votes.remove(msg.sender);
        emit VoteCanceled(msg.sender);
    }

    /// @dev Number of votes casted in favour of the proposal.
    function inFavour() public virtual view returns (uint256) {
        return votes.length();
    }

    /// @dev Number of votes needed to pass the proposal.
    function thresholdVotes() public virtual view returns (uint256) {
        return getRoleMemberCount(USER_ROLE).muld(threshold, 4);
    }

    /// @dev Function to validate the threshold
    function validate() public virtual onlyAdmin {
        require(
            inFavour() >= thresholdVotes(),
            "Not enough votes to pass."
        );
        passed = true;
        emit VotingValidated();
    }
