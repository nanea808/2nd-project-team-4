const { create } = require("handlebars");

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

    $('#groups-col').children().eq(1).click(redirectGroup);
    $('#lists-col').children().eq(1).click(redirectList);
});

// add functionality to create new group and new list upon button click

function createGroup() {
    const createGroupHandler = async(event) => {
        event.preventDefault();
        const newGroupBtn = document.querySelector('#new-group');
        
        //on button click, render new group handlebars partial
    }
};

function createList() {
    const createListHandler = async(event) => {
        event.preventDefault();
        const newListBtn = $('#new-list');

        //on button click, render new list form
        
    }
}

document.querySelector('#new-group').addEventListener('submit', createGroup);

document.querySelector('#new-list').addEventListener('submit', createList)
