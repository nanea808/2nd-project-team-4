$(() => {
    const redirectGroup = (event) => {
        const element = event.target;
        
        if (element.matches("p")) {
            document.location = `/group/${element.dataset.groupId}`
            // console.log(element.dataset.groupId);
        }
    }

    const redirectList = (event) => {
        const element = event.target;
        
        if (element.matches("p")) {
            document.location = `/list/${element.dataset.listId}`
            // console.log(element.dataset.groupId);
        }
    }

    // show group and list add forms
    function renderGroupForm() {
        $('#addGroup-div').children().removeClass('visually-hidden');
    };
    
    function renderListForm() {
        $('#addList-div').children().removeClass('visually-hidden');
    };

    // create new group
    function createGroup() {
        const newGroupTitle = $('#group-title').val().trim();
        const inviteeName = $('#groupUser-name').val().trim();
        const inviteeEmail = $('#groupUser-email').val().trim();
    };

    // create new list
    function createList() {
    };
    
    $('#new-group-btn').click(renderGroupForm);
    $('#new-list-btn').click(renderListForm);

    $('#new-group-save-btn').click(createGroup);
    $('#new-list-save-btn').click(createList);

    $('#groups-col').children().eq(1).click(redirectGroup);
    $('#lists-col').children().eq(1).click(redirectList);
});