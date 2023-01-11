window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init(){
    loadUsers()
    document.getElementsByClassName('btn btn-create-voucher')[0].addEventListener('click', createVoucher)
    document.getElementsByClassName('btn btn-update-voucher')[0].addEventListener('click', updateVoucher)
    document.getElementsByClassName('btn btn-create-voucher')[0].addEventListener('click', createVoucher)
    document.getElementsByClassName('btn btn-get-vouchers')[0].addEventListener('click', getVouchers)
}

function loadUsers(){
    fetch('http://localhost:8081/admin/users', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(users => users.forEach(user => addUserTableRow(user)))
}

function addUserTableRow(user){
    let tr = document.createElement('tr')

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    td1.classList.add('user-id')
    td2.classList.add('user-firstname')
    td3.classList.add('user-lastname')

    let text1 = document.createTextNode(`${user.id}`);
    let text2 = document.createTextNode(`${user.first_name}`);
    let text3 = document.createTextNode(`${user.last_name}`);

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    let tableBody = document.getElementsByClassName('user-table-body')[0]
    tableBody.append(tr)
}

function createVoucher(){
    let userId = document.getElementById('create-voucher-user-id').value
    let value = document.getElementById('create-voucher-value').value
    let comment = document.getElementById('create-voucher-comment').value

    let voucher = {
        user_id: userId,
        value: value,
        comment: comment
    }

    fetch('http://localhost:8081/admin/vouchers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(voucher)
    })
        .then(voucher => voucher.json())
        .then(voucher => {
            if (voucher.message)
                alert(voucher.message)
            else
                addVoucherTableRow(voucher)

        });
}

function updateVoucher(){
    let voucherId = document.getElementById('update-voucher-id').value
    let userId = document.getElementById('update-voucher-user-id').value
    let value = document.getElementById('update-voucher-value').value
    let comment = document.getElementById('update-voucher-comment').value

    let voucher = {
        user_id: userId,
        value: value,
        comment: comment
    }
    fetch(`http://localhost:8081/admin/vouchers/${voucherId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(voucher)
    })
        .then(voucher => voucher.json())
        .then(voucher => {
            if (voucher.message)
                alert(voucher.message)
            else
                getVouchers()

        })
}

function getVouchers(){
    fetch('http://localhost:8081/admin/vouchers', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

    })
        .then(vouchers => vouchers.json())
        .then(vouchers => {
            document.getElementsByClassName('voucher-table-body')[0].innerHTML = ''
            vouchers.forEach(voucher => addVoucherTableRow(voucher))
        })
}

function deleteVoucher(event){
    let clickedButton = event.target
    let voucherId = clickedButton.parentElement.getElementsByClassName('voucher-id')[0].innerText
    fetch(`http://localhost:8081/admin/vouchers/${voucherId}`, {
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
                getVouchers()
        });
}

function addVoucherTableRow(voucher){
    let tr = document.createElement('tr')

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    td1.classList.add('voucher-id')
    td2.classList.add('voucher-user-id')
    td3.classList.add('voucher-value')
    td4.classList.add('voucher-comment')

    let text1 = document.createTextNode(`${voucher.id}`);
    let text2 = document.createTextNode(`${voucher.user_id}`);
    let text3 = document.createTextNode(`${voucher.value}`);
    let text4 = document.createTextNode(`${voucher.comment}`);

    let btn = document.createElement('button')
    btn.innerText = 'REMOVE'
    btn.classList.add('btn-danger')
    btn.addEventListener('click', deleteVoucher)

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)
    td4.appendChild(text4)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(btn)

    let tableBody = document.getElementsByClassName('voucher-table-body')[0]
    tableBody.append(tr)
}
