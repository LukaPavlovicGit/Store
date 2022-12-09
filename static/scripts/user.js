window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init() {
    getUsers()
    document.getElementById('user-create-button').addEventListener('click', addUser)
}

function getUsers() {
    fetch('http://localhost:8081/admin/users', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
            .then(users => {
                users.forEach(user => {
                    let newRow =
                        `<tr id="table-row-${user.id}">
                            <td>${user.role}</td>
                            <td>${user.first_name}</td>
                            <td>${user.last_name}</td>
                            <td>${user.address}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td> <button type="button" class="update-button" onclick="updateUser(${user.id})">update</button> </td>
                            <td> <button type="button" class="delete-button" onclick="deleteUser(${user.id})">delete</button> </td>
                        </tr>`

                    document.querySelector('#table-body').innerHTML = document.querySelector('#table-body').innerHTML + newRow
                });
            });
}

function addUser() {
    if(checkInput() === false)
        return;

    var selectRole = document.getElementById('role')
    var role = selectRole.options[selectRole.selectedIndex].text

    var user = {
        role: role,
        first_name: document.getElementById('first-name').value,
        last_name: document.getElementById('last-name').value,
        address: document.getElementById('address').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone_number: document.getElementById('phone-number').value
    }

    fetch('http://localhost:8081/admin/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
            .then(res => {
                if (res.message) {
                    alert(res.message)
                }
                else {
                    let newRow =
                        `<tr id="table-row-${res.user.id}">
                            <td>${res.user.role}</td>
                            <td>${res.user.first_name}</td>
                            <td>${res.user.last_name}</td>
                            <td>${res.user.address}</td>
                            <td>${res.user.username}</td>
                            <td>${res.user.email}</td>
                            <td> <button type="button" class="update-button" onclick="updateUser(${res.user.id})">update</button> </td>
                            <td> <button type="button" class="delete-button" onclick="deleteUser(${res.user.id})">delete</button> </td>
                        </tr>`

                    document.querySelector('#table-body').innerHTML = document.querySelector('#table-body').innerHTML + newRow
                    clearInput()
                }
            });
}

function updateUser(userId) {
    var selectRole = document.getElementById('role-update')
    var role = selectRole.options[selectRole.selectedIndex].text

    var user = {
        role: role,
        first_name: document.getElementById('first-name-update').value,
        last_name: document.getElementById('last-name-update').value,
        address: document.getElementById('address-update').value,
        username: document.getElementById('username-update').value,
        email: document.getElementById('email-update').value,
        password: document.getElementById('password-update').value,
        phone_number: document.getElementById('phone_number-update').value
    }
    fetch(`http://localhost:8081/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
            .then(resElement => {
                if (resElement.message) {
                    alert(resElement.message)
                }
                else {
                    location.reload();
                    document.getElementById('password-update').value = ''
                    document.getElementById('update').style.visibility = 'hidden'
                }
            })
}

function deleteUser(userId) {
    fetch(`http://localhost:8081/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(res => {
            if (res.json().message) {
                alert(res.json().message)
            }
            else {
                let trDelete = document.getElementById(`table-row-${userId}`)
                trDelete.parentNode.removeChild(trDelete)
            }
        });
}

function checkInput() {
    if (document.getElementById('first-name').value > 20) {
        alert('First name must have min 3 and max 10 characters')
        return false
    }

    if (document.getElementById('last-name').value > 20) {
        alert('Last name must have min 3 and max 15 characters')
        return false
    }

    if (document.getElementById('username').value > 20) {
        alert('Username must have min 3 and max 10 characters')
        return false
    }

    return true
}

function clearInput() {
    document.getElementById('first-name').value = ''
    document.getElementById('last-name').value = ''
    document.getElementById('address').value = ''
    document.getElementById('username').value = ''
    document.getElementById('email').value = ''
    document.getElementById('password').value = ''
}