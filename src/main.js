import axios from 'axios';
export function displaySuccessToast(message) {
    iziToast.success({
        title: 'Success',
        message: message
    });
}

export function displayErrorToast(message) {
    iziToast.error({
        title: 'Error',
        message: message
    });
}

export function displayInfoToast(message) {
    iziToast.info({
        title: 'Info',
        message: message
    });
}

const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/';

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login/';
}

if(document.querySelector("#logoutButton")){
    document.querySelector("#logoutButton").onclick = logout;
}


function registerFieldsAreValid(firstName, lastName, email, username, password) {
    if (firstName === '' || lastName === '' || email === '' || username === '' || password === '') {
        displayErrorToast("Please fill all the fields correctly.");
        return false;
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        displayErrorToast("Please enter a valid email address.")
        return false;
    }
    return true;
}

function register() {
    const firstName = document.getElementById('inputFirstName').value.trim();
    const lastName = document.getElementById('inputLastName').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const username = document.getElementById('inputUsername').value.trim();
    const password = document.getElementById('inputPassword').value;

    if (registerFieldsAreValid(firstName, lastName, email, username, password)) {
        displayInfoToast("Please wait...");

        const dataForApiRequest = {
            name: firstName + " " + lastName,
            email: email,
            username: username,
            password: password
        }

        axios({
            url: API_BASE_URL + 'auth/register/',
            method: 'post',
            data: dataForApiRequest,
        }).then(function ({ data, status }) {
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        }).catch(function (err) {
            displayErrorToast('An account using same email or username is already created');
        })
    }
}
if(document.querySelector("#registerButton")){
    document.querySelector("#registerButton").onclick = register;
}

function login() {
    const username = document.getElementById('inputUsername').value.trim();
    const password = document.getElementById('inputPassword').value;

    displayInfoToast("Please wait...");
    const dataForApiRequest = {
        username: username,
        password: password
    }
    axios({
        url: API_BASE_URL + 'auth/login/',
        method: 'post',
        data: dataForApiRequest,
    }).then(function ({ data, status }) {
        localStorage.setItem('token', data.token);
        window.location.href = '/';
    }).catch(function (err) {
        displayErrorToast('Wrong username or password');
    })


}

if(document.querySelector("#loginButton")){
    document.querySelector("#loginButton").onclick = login;
}



function addTask() {
    const input = document.getElementById('taskForm');
    const inputTask = input.value.trim();

    const dataForApiRequest = {
        title: inputTask
    };

    axios({
        url: API_BASE_URL + 'todo/create/',
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        method: 'post',
        data: dataForApiRequest,
    })
        .then(res => {
            axios({
                url: API_BASE_URL + 'todo/',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                method: 'get',
            })
                .then(({ data, status }) => {
                    const addedTask = data[data.length - 1];
                    addRow(addedTask);
                    displaySuccessToast("Added Task");
                    input.value = "";
                })
        })
        .catch(err => {
            displayErrorToast('Erron in adding the task');
        });

}

if (document.getElementById('addTaskButton')) {
    document.getElementById('addTaskButton').onclick = addTask;
}


export function addRow(task) {

    const id = task.id;
    const title = task.title;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
        <input id="input-button-${id}" type="text" class="form-control todo-edit-task-input hideme" placeholder="Edit The Task">
        <div id="done-button-${id}"  class="input-group-append hideme">
            <button class="btn btn-outline-secondary todo-update-task" type="button" id="updateTaskButton-${id}" >Done</button>
        </div>
        <div id="task-${id}" class="todo-task">
            ${title} 
        </div>

        <span id="task-actions-${id}">
            <button style="margin-right:5px;" type="button" id="editTaskButton-${id}"
                class="btn btn-outline-warning">
                <img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
                    width="18px" height="20px">
            </button>
            <button type="button" class="btn btn-outline-danger" id="deleteTaskButton-${id}">
                <img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
                    width="18px" height="22px">
            </button>
        </span>
    `
    document.querySelector("#ul").appendChild(li);

    document.querySelector(`#deleteTaskButton-${id}`).addEventListener("click", () => {
        deleteTask(id);
    });
    document.querySelector(`#editTaskButton-${id}`).addEventListener("click", () => {
        editTask(id);
    });
    document.querySelector(`#updateTaskButton-${id}`).addEventListener("click", () => {
        updateTask(id);
    });



}

function editTask(id) {
    document.getElementById('task-' + id).classList.toggle('hideme');
    document.getElementById('task-actions-' + id).classList.toggle('hideme');
    document.getElementById('input-button-' + id).classList.toggle('hideme');
    document.getElementById('done-button-' + id).classList.toggle('hideme');
}

function deleteTask(id) {

    let li = document.querySelector(`#input-button-${id}`).parentElement;
    li.parentNode.removeChild(li);

    const dataForApiRequest = {
        id: id,
    };
    axios({
        url: API_BASE_URL + `todo/${id}/`,
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        method: 'delete',
        data: dataForApiRequest,
    })
        .then(res => {
            displayInfoToast("Deleted Task");
        })
        .catch(err => {
            displayErrorToast("Cannot Delete Task");
        });

}

function updateTask(id) {
    const updatedTask = document.querySelector(`#input-button-${id}`).value.trim();
    const dataForApiRequest = {
        title: updatedTask ,
    };
    axios({
        url:  API_BASE_URL + `todo/${id}/`,
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        },
        method: 'patch',
        data: dataForApiRequest,
    })
    .then(({data,status}) =>{ 
        document.querySelector(`#task-${id}`).innerHTML = data.title;
    })
    .catch(err => {
        displayErrorToast('Error in updating the task');
    });
    editTask(id);
    
}
