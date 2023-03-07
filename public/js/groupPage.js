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
  //change a list's title
  async function changeGroupTitle(event) {
    event.preventDefault();
    const group_id = $(this).data("group_id");
    const newTitle = $('#new-group-title').val().trim();
    const response = await fetch(`/api/groups/${group_id}`, {
      method: "PUT",
      body: `{"newTitle": "${newTitle}"}`,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to change the title of the group.");
    }
  }

    //remove from a group
    async function updateUsers(event) {
      event.preventDefault();
      const group_id = $(this).data("group_id");
      const user_id = $(this).data("user_id");
      const response = await fetch(`/api/groups/${group_id}`, {
        method: "PUT",
        body: `{"removedUser": "${user_id}"}`,
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert("Failed to delete from a group.");
      }
    }

  function showGroupTitleForm() {
    $("#groupFormDiv").removeClass("visually-hidden");
  }

  console.log(claimButtons);

  claimButtons.click(clickHandler());
  $(".list-group").children().click(showList);
  $("#group-title-form").submit(changeGroupTitle);
  $("#group-title-btn").click(showGroupTitleForm);
  $("button[id^='user-del-btn']").click(updateUsers);
});
