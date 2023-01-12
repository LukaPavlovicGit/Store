window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init() {
    loadUsers()
    document.getElementsByClassName('user-create-button')[0].addEventListener('click', createUser)
    document.getElementsByClassName('user-update-button')[0].addEventListener('click', updateUser)
}

function loadUsers(){
    fetch('http://localhost:8081/admin/users', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(users => {
            document.getElementsByClassName('user-table-body')[0].innerHTML=''
            users.forEach(user => addUserTableRow(user))
        })
}

function addUserTableRow(user){
    let tr = document.createElement('tr')

    let td0 = document.createElement('td')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')
    let td4 = document.createElement('td')
    let td5 = document.createElement('td')
    let td6 = document.createElement('td')
    td0.classList.add('user-id')
    td1.classList.add('user-role')
    td2.classList.add('user-firstname')
    td3.classList.add('user-lastname')
    td4.classList.add('user-address')
    td5.classList.add('user-username')
    td6.classList.add('user-email')

    let text0 = document.createTextNode(`${user.id}`)
    let text1 = document.createTextNode(`${user.role}`)
    let text2 = document.createTextNode(`${user.first_name}`)
    let text3 = document.createTextNode(`${user.last_name}`)
    let text4 = document.createTextNode(`${user.address}`)
    let text5 = document.createTextNode(`${user.username}`)
    let text6 = document.createTextNode(`${user.email}`)

    let btn = document.createElement('button')
    btn.innerText = 'REMOVE'
    btn.classList.add('btn-danger')
    btn.addEventListener('click', deleteUser)

    td0.appendChild(text0)
    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)
    td4.appendChild(text4)
    td5.appendChild(text5)
    td6.appendChild(text6)

    tr.appendChild(td0)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    tr.appendChild(btn)

    let tableBody = document.getElementsByClassName('user-table-body')[0]
    tableBody.append(tr)
}

function createUser(){
    let selectRole = document.getElementById('role')
    let role = selectRole.options[selectRole.selectedIndex].text
    let first_name = document.getElementById('first-name').value
    let last_name = document.getElementById('last-name').value
    let address = document.getElementById('address').value
    let username = document.getElementById('username').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let phone_number = document.getElementById('phone-number').value

    let user = {
        role: role,
        first_name: first_name,
        last_name: last_name,
        address: address,
        username: username,
        email: email,
        password: password,
        phone_number: phone_number
    }

    fetch('http://localhost:8081/admin/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(user)
    })
        .then(user => user.json())
        .then(user => {
            if (user.message)
                alert(user.message)
            else
                addUserTableRow(user)
        })
}

function updateUser(){
    let user_id = document.getElementById('user-id-update').value
    let selectRole = document.getElementById('role-update')
    let role = selectRole.options[selectRole.selectedIndex].text
    let first_name = document.getElementById('first-name-update').value
    let last_name = document.getElementById('last-name-update').value
    let address = document.getElementById('address-update').value
    let username = document.getElementById('username-update').value
    let email = document.getElementById('email-update').value
    let password = document.getElementById('password-update').value
    let phone_number = document.getElementById('phone-number-update').value

    let user = {
        role: role,
        first_name: first_name,
        last_name: last_name,
        address: address,
        username: username,
        email: email,
        password: password,
        phone_number: phone_number
    }

    fetch(`http://localhost:8081/admin/users/${user_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(user)
    })
        .then(user => user.json())
        .then(user => {
            if (user.message)
                alert(user.message)
            else
                loadUsers()
        })
}

function deleteUser(event){
    let user_id = event.target.parentElement.getElementsByClassName('user-id')[0].innerText
    fetch(`http://localhost:8081/admin/users/${user_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(res => res.json())
        .then(res => {
            if (res.message)
                alert(res.message)
            else
                loadUsers()
        })
}