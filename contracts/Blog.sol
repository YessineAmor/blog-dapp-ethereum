pragma solidity ^0.5.1;
pragma experimental ABIEncoderV2;
// Users can publish articles
// Users can comment on articles
// Users can like/dislike articles/comments
// Users can pay for their article to be featured
// Each post creation costs 0.001 ether
contract Blog {
  struct Submission{
    address payable writer;
    string title;
    string content;
    uint publishingDate;
    uint parentID;
    uint reward;
  }

  Submission[] public submissions;

    address owner = msg.sender;

    uint public postCreationCost = 0.001 ether;

    modifier ownerOnly{
        require(msg.sender == owner,"Only owner can call this function");
        _;
    }
    
  function publishSubmission(string memory _content,string memory _title, uint _parentID) public payable returns(uint) {
    require(msg.value>=postCreationCost,"Post creation cost is 0.001 ether");
    if(_parentID != 0) // 0 means no parent
    require(_parentID<submissions.length,"Parent ID doesn't point to a submission.");
    Submission memory newSubmission = Submission(msg.sender,_title,_content,now,_parentID,0);
    uint submissionID = submissions.push(newSubmission);
    return submissionID;
  }
  
  function rewardSubmission(uint _submissionID) public payable {
      require(_submissionID<submissions.length,"Submission doesn't exist");
      submissions[_submissionID].writer.transfer(msg.value);
      submissions[_submissionID].reward += msg.value;
  }
  
  function withdraw(uint _amount) public ownerOnly{
     require(_amount*(1 ether)<=address(this).balance*(1 ether));
      msg.sender.transfer(_amount *(1 ether));
    }
    
    function changePostCreationCost(uint _newValue) public ownerOnly{
        postCreationCost = _newValue;
    }
    
}                                                                                                         