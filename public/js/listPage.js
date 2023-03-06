(function () {
  //create new item
  async function newItem(event) {
    event.preventDefault();

    const title = $("#item-title").val().trim();
    const description = $("#item-description").val().trim();
    const link = $("#item-link").val().trim();
    const status = "unassigned";
    const list_id = $(this).data("list_id");

    if (title) {
      const response = await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify({ title, description, link, status, list_id }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        location.reload();
      } else {
        alert("Failed to add an item.");
      }
    }
  }

  //delete item
  async function deleteItem(event) {
    event.preventDefault();
    const item_id = $(this).data("item_id");
    const response = await fetch(`/api/items/${item_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to delete an item.");
    }
  }

  //remove from a group
  async function updateGroups(event) {
    event.preventDefault();
    const group_id = $(this).data("group_id");
    const list_id = $(this).data("list_id");
    const response = await fetch(`/api/lists/${list_id}`, {
      method: "PUT",
      body: `{"removedGroup": "${group_id}"}`,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to delete from a group.");
    }
  }

  //add to a group
  async function addToGroup(event) {
    event.preventDefault();

    const group_id = $("#add-group").val();
    const list_id = $(this).data("list_id");

    const response = await fetch(`/api/lists/${list_id}`, {
      method: "PUT",
      body: `{"addedGroup": "${group_id}"}`,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to add to the selected group.");
    }
  }

  //change a list's title
  async function changeListTitle(event) {
    event.preventDefault();
    alert('test');
    const list_id = $(this).data("list_id");
    const newTitle = $('#new-list-title').val().trim();
    const response = await fetch(`/api/lists/${list_id}`, {
      method: "PUT",
      body: `{"title": "${newTitle}"}`,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to change the title of a list.");
    }
  }

  // show group and list add forms
  function showListTitleForm() {
    $("#listFormDiv").removeClass("visually-hidden");
  }

  $("#group-form").submit(addToGroup);
  $("#item-form").submit(newItem);
  $("#list-title-form").submit(changeListTitle);
  $("button[id^='item-del-btn']").click(deleteItem);
  $("button[id^='group-del-btn']").click(updateGroups);
  $("#list-title-btn").click(showListTitleForm);
})();
