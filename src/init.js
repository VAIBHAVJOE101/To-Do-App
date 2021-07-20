import axios from 'axios';
import {displaySuccessToast,displayErrorToast,displayInfoToast,addRow} from './main';

const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/';

function getTasks() {
     axios({
        headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
        },
        url: API_BASE_URL + 'todo/',
        method: 'get',
    })
    .then(({data,status}) => {
        data.forEach((task)=>{
            addRow(task);
        })
    })
    .catch(err => console.error(err));
}

axios({
    headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
    },
    url: API_BASE_URL + 'auth/profile/',
    method: 'get',
})
.then(function({data, status}) {
  document.getElementById('avatar-image').src = 'https://ui-avatars.com/api/?name=' + data.name + '&background=fff&size=33&color=007bff';
  document.getElementById('profile-name').innerHTML = data.name;
  getTasks();
})
.catch(err => {
    displayInfoToast("Login To Save List");
});
