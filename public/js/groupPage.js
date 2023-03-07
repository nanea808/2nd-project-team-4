$(() => {
  const claimButtons = $(".claim-btn");
  const loggedInUserId = $('#lists').attr("data-logged-in-user");
  console.log(loggedInUserId);

  // Claim button function
  const clickHandler = function () {
    return function () {
      // Simple if statement to toggle textContent
      if (this.textContent === "Claim") {
        this.textContent = "Unclaim";
      } else if (this.textContent === "Unclaim") {
        this.textContent = "Claim";
      }
    };
  };

  const showList = (event) => {
    const lists = $("#lists").children();
    const element = event.target;
    if (element.matches("li")) {
      // console.log(element.dataset.user)

      // Show list based on user clicked on
      for (const list of lists) {
        console.log(list);
        if (list.dataset.owner === element.dataset.user) {
          list.style.display = "inline";
        } else {
          list.style.display = "none";
        }
      }

      // Loop through buttons and mark as claimed when user is clicked
      for (const button of claimButtons) {
        if (button.dataset.claimedUser) {
          console.log(button.dataset.claimedStatus + button.dataset.claimedUser);
          if ( // If item is claimed and purchased by logged in user 
            loggedInUserId === button.dataset.claimedUser &&
            button.dataset.claimedStatus === "purchased"
          ) {
            // Then don't allow user to unclaim item
            button.disabled = true;
            button.textContent = "Purchased";
          } else if ( // If item is claimed by logged in user but not purchased yet
            loggedInUserId === button.dataset.claimedUser &&
            button.dataset.claimedStatus === "assigned"
          ) {
            // Then allow user to unclaim item
            button.textContent = "Unclaim";
          } else {
            // If item is claimed but not by current logged in user
            // Mark as claimed and disable button
            button.disabled = true;
            button.textContent = "Claimed";
          }
        }
      }
    }
  };

  // event handler
  claimButtons.click(clickHandler());
  $(".list-group").children().click(showList);
});
