// fetch background img
/*
async function getBgImg() {
    const response = await fetch('https://api.unsplash.com//photos/random?client_id=MrBKjudpbn-DaRLVMzoMnS-_1SsFcfWXYBUaSGDkMlw')
    response.json()
    .then ( resp => {
        document.querySelector("body").style.backgroundImage = `url('${resp.urls.full}')`;
    });
};

// list of addEventListeners
window.addEventListener('load', getBgImg);
*/
document.addEventListener("DOMContentLoaded", getLocalStorage);
document.querySelector(".addToList").addEventListener('click', addToDo);
document.querySelector("ul").addEventListener('click', checkDoneOrDelete);
//document.querySelectorAll(".removeBtn").addEventListener('click', removeItem);

//variables to store input
// let toDoList = [];
let activeToDo = [];
let completedToDo = [];
// let id = 0;

function addToDo(e) {
    e.preventDefault();

    let id;
    if (localStorage.getItem("id") === null) {
        id = 0;
    } else {
        id = JSON.parse(localStorage.getItem("id"));
    }

    const txtInput = document.querySelector(".txt").value;

    if (txtInput === "") {
        alert("Please write a new task");
    } else {
        const inputToDo = {
            id: id,
            task: txtInput
        };

        // kalla på function för att antingen hämta tidigare sparade
        // och senaste id
        saveToLocalStorage(inputToDo);

        const span = document.createElement("span");
        const btn = document.createElement("button")
        const checkbox = document.createElement("input")
        const li = document.createElement("li");
        const ul = document.querySelector("ul");
        const form = document.querySelector("form");

        span.setAttribute("id", `${id}`);
        btn.classList.add("removeBtn");
        btn.setAttribute("id", `${id}`);
        //btn.setAttribute("onclick", `remove(${id})`);
        btn.textContent = "x";
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("checkbox");
        li.classList.add("toDoLi");

        li.textContent = txtInput;
        span.append(checkbox, li, btn);
        ul.appendChild(span);
        
        form.reset();
        id++;
        localStorage.setItem("id", JSON.stringify(id));

        // let savedToDos;
        // if (localStorage.getItem("toDos") === null) {
        //     toDoList = [];
        // } else {
        //     savedToDos = JSON.parse(localStorage.getItem("toDos"));
        // }
        // toDoList.push(savedToDos);
        // console.log(toDoList);

        //find current object in array from event
        //let todoObject = toDoList.find( ({id}) => id === this.parentElementId)

        //toDoList.splice(toDoList.indexOf("id: 3"))
        // object.input = inputObj;
        // console.log(inputObj);
        // inputObj.id = id;
        // inputObj.task = txtInput;
        // console.log("inne från function efter tillagd todo: ", toDoList);

    }
}

//function remove toDo and update localStorage
function removeItem(e) {
    const element = e.target.parentElement;
    // console.log("the targeted element: ", element);

    const elementId = e.target.id;
    console.log("targeted element id: ", elementId);
    
    const getSaved = JSON.parse(localStorage.getItem("toDos"));
    console.log("localStorage before: ", getSaved);
    
    const getIndex = getSaved.findIndex(x => x.id == elementId);
    console.log("index of deleted todo: ", getIndex);
    
    const deleted = getSaved.splice(getIndex, 1);
    console.log("the deleted element: ", deleted);
    console.log("localStorage after: ", getSaved);

    // let elementId = document.getElementById(`${el}`);
    // console.log("the targeted element: ", elementId);

    localStorage.setItem("toDos", JSON.stringify(getSaved));
    // localStorage.setItem("deleted", JSON.stringify(deleted));
    element.remove();

    // updateSaved.filter( e => {
    //     if (e.id == el {
    //         element.remove();
    //     } else {
    //         console.log("not working")
    //     }
    // });

    // let newSaving = updateSaved.splice(updateSaved.indexOf(`id: ${el - 1}`));
    // console.log(newSaving);
}


//function check if you click either done/checkbox or delete/cross
function checkDoneOrDelete(e) {
    if (e.target.classList == 'checkbox') {
        checkTodo(e);
    }
    if (e.target.classList == 'removeBtn') {
        removeItem(e);
    }
}

function checkTodo(e) {
    const listItem = e.target.parentElement.childNodes[1];
    console.log("targeted item: ", listItem);
    listItem.classList.toggle("done");

    //move done toDos from localStorage toDos to completed localStorage 
    const listId = e.target.parentElement.id
    console.log("targeted items ID: ", listId);

    const getSaved = JSON.parse(localStorage.getItem("toDos"));
    const indexOfItem = getSaved.indexOf( e => e.id == listId);
    console.log("index of done todo: ", indexOfItem);

    const doneToDo = getSaved.splice(indexOfItem, 1);
    console.log("the done todo: ", doneToDo);
    console.log("after splice: ", getSaved)

    //make this to a function like savetoLocal storage
    let completedToDo;
    if (localStorage.getItem("completed") === null) {
        completedToDo = [];
    } else {
        completedToDo = JSON.parse(localStorage.getItem("completed"));
    };
    completedToDo.push(doneToDo);
    localStorage.setItem("completed", JSON.stringify(completedToDo));
};

//unction to save new toDo to localStorage
function saveToLocalStorage(todo) {
    let toDoList;
    if (localStorage.getItem("toDos") === null) {
        toDoList = [];
    } else {
        toDoList = JSON.parse(localStorage.getItem("toDos"));
    }
    toDoList.push(todo);
    localStorage.setItem("toDos", JSON.stringify(toDoList));
};


// classlist.toggle();
// toDoList.indexof("0"); ?
// toDoList.splice("indexofnr", 1);
// toDoList.splice(toDoList.indexOf("3"), 1)

//function to write out saved toDos from localStorage on site
function getLocalStorage() {
    let toDoList;

    if (localStorage.getItem("toDos") === null) {
        toDoList = [];
    } else {
        toDoList = JSON.parse(localStorage.getItem("toDos"));
    };
    toDoList.forEach(element => {
        let span = document.createElement("span");
        let btn = document.createElement("button")
        let checkbox = document.createElement("input")
        let li = document.createElement("li");

        span.setAttribute("id", `${element.id}`);
        btn.classList.add("removeBtn");
        btn.setAttribute("id", `${element.id}`);
        // btn.setAttribute("onclick", `remove(${element.id})`);
        btn.textContent = "x";
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("checkbox");
        li.classList.add("toDoLi");

        li.textContent = element.task;
        span.append(checkbox, li, btn);
        document.querySelector("ul").appendChild(span);
    });
};





/*
    ************************
    ******* Att göra *******
    ************************

^    1. Fetcha bakgrundsbild
^    2. Lägg till todos i html
^    3. Lägg till todos i localStorage
^    4. Kunna ta bort todos från html
    5. Kunna ta bort todos från localStorage
    6. Flytta från localStorage från ex active -> completed
    7. Uppdatera en tillagd todo

    EXTRA
    * gör ny sida där

*/
