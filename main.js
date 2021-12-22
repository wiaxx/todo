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

const updateToDo = (e) => {
    /*
    e.target.addEventListener('dblclick', () => {
        console.log('hej')
        e.target.readOnly = false;

    })
    */

    e.target.addEventListener("dblclick", () => console.log('hejsan'))
}

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
        input.readOnly = true;

        input.value = element.task;
        li.append(input);
        span.append(checkbox, li, btn);
        document.querySelector("ul").appendChild(span);
    });
};

// get todos from localStorage and pass the list to function for create html
const getLocalStorage = () => {
    let toDoList = JSON.parse(localStorage.getItem('toDos')) || [];
    let doneList = JSON.parse(localStorage.getItem('completed')) || [];
    createHtmlElement(toDoList, doneList);
};

// save to do-input in localStorage
const saveToLocalStorage = (todo) => {
    let toDoList = JSON.parse(localStorage.getItem('toDos')) || [];
    toDoList.push(todo);
    localStorage.setItem("toDos", JSON.stringify(toDoList));
};

// add to do-input on page
const addToDo = (e) => {
    e.preventDefault();

    let id = JSON.parse(localStorage.getItem('id')) || 0;

    const txtInput = document.querySelector(".txt").value;
    if (txtInput === "") {
        alert("Please write a new task");
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
const checkDoneOrDelete = (e) => {
    if (e.target.classList == 'checkbox') {
        checkTodo(e);
    };
    if (e.target.classList == 'removeBtn') {
        removeItem(e);
    };
    if (e.target.classList == 'inputTxt') {
        updateToDo(e);
    };
};

// remove item from page and localStorage
const removeItem = (e) => {
    const getSaved = JSON.parse(localStorage.getItem("toDos"));
    const element = e.target.parentElement; // the element to remove from page
    const elementId = e.target.id; // id of target to search index of item in LS
    const getIndex = getSaved.findIndex(x => x.id == elementId); //find index in LS stored data to remove
    const deleted = getSaved.splice(getIndex, 1); // splice the deleted task from LS list
    localStorage.setItem("toDos", JSON.stringify(getSaved)); // save updatet list to LS
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
    };
};

// list of EventListeners
document.addEventListener("DOMContentLoaded", getLocalStorage);
document.querySelector(".addToList").addEventListener('click', addToDo);
document.querySelector("ul").addEventListener('click', checkDoneOrDelete);

//variables to store input
let activeToDo = [];
let completedToDo = [];

/*
let test = [ {id: 1, task: 'hejsan'}, {id: 4, task: 'haha'}];
let testar = [ {id: 1, task: 'hejsan'}, {id: 2, task: 'haha'}, {id: 4, task: 'ja'}, {id: 6, task: "ny"}]

testar.forEach(element => {
    let veta = test.includes(element)
    // console.log(veta)
    // console.log(element.id)
})
test.includes([1].id)

for(let i = 0; i < test.length; i++) {
    console.log('testar id: ', test[i].id)
    if(test[i].id == test.id) {
        console.log(i.id, test.id, 'finns');
    }
}
*/