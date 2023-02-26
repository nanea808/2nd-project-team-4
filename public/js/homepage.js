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
const newGroupBtn = document.querySelector('#new-group');
const addGroupDiv = document.querySelector('#addGroup-div');

const newListBtn = $('#new-list');
const addListDiv = document.querySelector('#addList-div');

function renderGroupForm() {
    addGroupDiv.setAttribute('class', 'container-fluid text-center')
};

newGroupBtn.on('click', renderGroupForm);

function createGroup() {
    const createGroupHandler = async(event) => {
        event.preventDefault();

        // save group
    }
};

function createList() {
    const createListHandler = async(event) => {
        event.preventDefault();

        // save list
    }
};

document.querySelector('#new-group').addEventListener('submit', createGroup);
document.querySelector('#new-list').addEventListener('submit', createList)
