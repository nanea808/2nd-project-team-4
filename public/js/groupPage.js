$(() => {
  const claimButtons = $(".claim-btn");

  console.log(claimButtons);

  // Claim button function
  const clickHandler = function () {
    return function () {
      // Simple if statement to toggle textContent
      this.textContent === "Claim"
        ? (this.textContent = "Unclaim")
        : (this.textContent = "Claim");
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
        
      }
    }
  };

  // event handler
  claimButtons.click(clickHandler());
  $(".list-group").children().click(showList);
});
