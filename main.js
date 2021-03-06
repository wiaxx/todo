// fetch background img
/*
async function getBgImg() {
    const response = await fetch('https://api.unsplash.com//photos/random?client_id=MrBKjudpbn-DaRLVMzoMnS-_1SsFcfWXYBUaSGDkMlw')
    response.json()
    .then ( resp => {
        document.querySelector("body").style.backgroundImage = `url('${resp.urls.full}')`;
    });
};
window.addEventListener('load', getBgImg);
*/

const updateLS = (array, key, value, storage) => {
    const index = array.findIndex( x => x[key] == value);
    const newArray = index >= 0 ? [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ] : array;

    localStorage.setItem(`${storage}`, JSON.stringify(newArray))

    return index >= 0 ? [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ] : array;
};

const updateToDo = (e, text) => {
    let toDoList = JSON.parse(localStorage.getItem('toDos'));
    let activeToDo = JSON.parse(localStorage.getItem('active'));

    let idOfElement = e.path[2].id;

    let indexOfUpdAll = toDoList.findIndex(x => x.id == idOfElement);
    toDoList[indexOfUpdAll].task = text;

    let indexOfUpdAct = activeToDo.findIndex(e => e.id == idOfElement)
    activeToDo[indexOfUpdAct].task = text;

    localStorage.setItem('toDos', JSON.stringify(toDoList));
    localStorage.setItem('active', JSON.stringify(activeToDo));
};

// create html element from saved todo list
const createHtmlElement = (list, done) => {
    list.forEach(element => {
        let span = document.createElement("span");
        let btn = document.createElement("button")
        let checkbox = document.createElement("input")
        let li = document.createElement("li");
        let input = document.createElement('input');

        span.setAttribute("id", `${element.id}`);
        btn.classList.add("removeBtn");
        btn.setAttribute("id", `${element.id}`);
        btn.textContent = "x";
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("checkbox");
        li.classList.add("toDoLi");
        input.classList.add('inputTxt');
        input.setAttribute('id', `i${element.id}`);
        input.readOnly = true;

        input.value = element.task;
        li.append(input);
        span.append(checkbox, li, btn);
        document.querySelector("ul").appendChild(span);
    });

    done.forEach(element => {
        let inputField = document.querySelector(`#i${element.id}`);
        inputField.classList.add('done');
    });
};

// get todos from localStorage and pass the list to function for create html
const getLocalStorage = () => {
    document.querySelector('ul').innerHTML = '';
    let toDoList = JSON.parse(localStorage.getItem('toDos')) || [];
    let doneList = JSON.parse(localStorage.getItem('completed')) || [];
    createHtmlElement(toDoList, doneList);
};

// save to do-input in localStorage
const saveToLocalStorage = (todo) => {
    let toDoList = JSON.parse(localStorage.getItem('toDos')) || [];
    toDoList.push(todo);
    localStorage.setItem("toDos", JSON.stringify(toDoList));

    let activeToDo = JSON.parse(localStorage.getItem('active')) || [];
    activeToDo.push(todo);
    localStorage.setItem("active", JSON.stringify(activeToDo));
};

// add to do-input on page
const addToDo = (e) => {
    e.preventDefault();

    let id = JSON.parse(localStorage.getItem('id')) || 0;

    const txtInput = document.querySelector(".txt").value;
    if (txtInput === "") {
        alert("Please write a new task");
        return;
    } else {
        const inputToDo = {
            id: id,
            task: txtInput
        };

        // save input to localStorage
        saveToLocalStorage(inputToDo);

        // create element to show input todo on page
        const span = document.createElement("span");
        const btn = document.createElement("button")
        const checkbox = document.createElement("input");
        const li = document.createElement("li");
        const input = document.createElement('input');
        const ul = document.querySelector("ul");
        const form = document.querySelector("form");

        span.setAttribute("id", `${id}`);
        btn.classList.add("removeBtn");
        btn.setAttribute("id", `${id}`);
        btn.textContent = "x";
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("checkbox");
        li.classList.add("toDoLi");
        input.classList.add("inputTxt");
        input.readOnly = true;

        input.value = txtInput;
        li.append(input);
        span.append(checkbox, li, btn);
        ul.appendChild(span);

        form.reset();
        id++;
        localStorage.setItem("id", JSON.stringify(id));
    };
};

//function check if you click either done/checkbox or delete/cross
const checkClickedBtn = (e) => {
    if (e.target.classList == 'checkbox') {
        checkTodo(e);
    };
    if (e.target.classList == 'removeBtn') {
        removeItem(e);
    };
    if (e.target.classList == 'inputTxt') {
        e.target.readOnly = false;
        let target = e.target;
        target.addEventListener('keydown', (e) => {
            if (e.keyCode == 13) {
                let updInput = document.querySelector(`#${e.target.id}`).value;
                if (updInput === '') {
                    alert('Please fill in the new name or delete the task');
                    return;
                } else {
                    updateToDo(e, updInput);
                };
            };
        });
    };
};

// remove item from page and localStorage
const removeItem = (e) => {
    const allSaved = JSON.parse(localStorage.getItem("toDos"));
    const active = JSON.parse(localStorage.getItem("active"));
    const done = JSON.parse(localStorage.getItem("completed"));
    
    const element = e.target.parentElement; // the element to remove from page
    const elementId = e.target.id; // id of target to search index of item in LS

    const allToDo = updateLS(allSaved, "id", elementId, "toDos");
    const activeToDo = updateLS(active, "id", elementId, "active");
    const doneToDo = updateLS(done, "id", elementId, "completed");

    //console.log(allToDo, activeToDo, doneToDo)
    element.remove();
};

const checkTodo = (e) => {
    const listItem = e.target.parentElement.childNodes[1].childNodes[0]; // the element to line-through
    if (listItem.classList == 'inputTxt done') {
        return;
    } else {
        listItem.classList.add('done')
        const getSaved = JSON.parse(localStorage.getItem("toDos"));
        const listId = e.target.parentElement.id // id of target to search index in LS
        const indexOfItem = getSaved.findIndex(x => x.id == listId); //find index in LS stored data to place in doneToDo
        const doneToDo = getSaved.slice(indexOfItem);
        const done = {
            id: doneToDo[0].id,
            task: doneToDo[0].task
        };
        let completedToDo = JSON.parse(localStorage.getItem("completed")) || [];
        completedToDo.push(done);
        localStorage.setItem("completed", JSON.stringify(completedToDo));

        let activeToDo = JSON.parse(localStorage.getItem('active'));
        const index = activeToDo.findIndex(x => x.id == listId); //find index in LS stored data to place in doneToDo
        activeToDo.splice(index, 1);
        localStorage.setItem("active", JSON.stringify(activeToDo));
    };
};

const showToDos = (array) => {
    const ul = document.querySelector('ul');
    ul.innerHTML = '';

    array.forEach(element => {
        let span = document.createElement("span");
        let btn = document.createElement("button")
        let checkbox = document.createElement("input")
        let li = document.createElement("li");
        let input = document.createElement('input');

        span.setAttribute("id", `${element.id}`);
        btn.classList.add("removeBtn");
        btn.setAttribute("id", `${element.id}`);
        btn.textContent = "x";
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("checkbox");
        li.classList.add("toDoLi");
        input.classList.add('inputTxt');
        input.setAttribute('id', `i${element.id}`);
        input.readOnly = true;

        input.value = element.task;
        li.append(input);
        span.append(checkbox, li, btn);
        document.querySelector("ul").appendChild(span);
    });
};

// list of EventListeners
document.addEventListener("DOMContentLoaded", getLocalStorage);
document.querySelector(".addToList").addEventListener('click', addToDo);
document.querySelector("ul").addEventListener('click', checkClickedBtn);
document.querySelector('#all').addEventListener('click', getLocalStorage);
document.querySelector('#done').addEventListener('click', () => {
    let completedToDo = JSON.parse(localStorage.getItem("completed")) || [];
    showToDos(completedToDo);
});
document.querySelector('#active').addEventListener('click', () => {
    let activeToDo = JSON.parse(localStorage.getItem("active")) || [];
    showToDos(activeToDo);
});