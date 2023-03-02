$(() => {
  const claimButtons = $(".claim-btn");

  const clickHandler = function () {
    return function () {
      this.textContent === "Claim"
        ? (this.textContent = "Unclaim")
        : (this.textContent = "Claim");
    };
  };

  const showList = (event) => {
    const lists = $("#lists").children();
    const element = event.target;
    if (element.matches("li")) {
      // console.log(element.dataset.user);
      for (const list of lists) {
        // console.log(list);
        if (list.dataset.owner === element.dataset.user) {
          list.style.display = "inline";
        } else {
          list.style.display = "none";
        }
      }
    }
  };

  console.log(claimButtons);

  claimButtons.click(clickHandler());
  $(".list-group").children().click(showList);
});
