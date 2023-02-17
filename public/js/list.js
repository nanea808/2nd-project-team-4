(function() {  

    const newItem = async (event) => {
      event.preventDefault();

      const title = $('#item-title').val().trim();
      const description = $("#item-description").val().trim();
      const link = $("#item-link").val().trim();
      const status = "unassigned";
      const list_id = 1;
      
      if (title) {   
        const response = await fetch("/api/items", {
          method: "POST",
          body: JSON.stringify({ title, description, link, status, list_id }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          console.log("item added!");
          location.reload();
        } else {
          alert("Failed to add an item.");
        }
      }
    };

    // const deleteItem = async (event) => {
    //     event.preventDefault();
    //     const response = await fetch("api/items")
    // }

    //const deleteList

    //const deleteFromGroup

    //const addToGroup
    //need to 
    $("#item-form").submit(newItem);
  })();

  // front-end logic sending requests to delete lists from groups and items from lists. Form for adding items to a list. Add-to-group function.=