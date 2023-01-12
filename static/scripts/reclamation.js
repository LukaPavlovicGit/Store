window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init() {
    loadUsers()
    document.getElementsByClassName('btn-create-reclamation')[0].addEventListener('click', createReclamation)
    document.getElementsByClassName('btn-get-articles')[0].addEventListener('click', getArticles)
    document.getElementsByClassName('btn-get-reclamations')[0].addEventListener('click', getReclamations)
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

function createReclamation(event){
    let userId = document.getElementById('create-reclamation-user-id').value
    let description = document.getElementById('create-reclamation-description').value
    let articleId = document.getElementById('create-reclamation-article-id').value

    let reclamation = {
        description: description,
        user_id: userId,
        article_id: articleId
    }

    fetch('http://localhost:8081/admin/reclamations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(reclamation)
    })
        .then(reclamation => reclamation.json())
        .then(reclamation => {
            if (reclamation.message)
                alert(reclamation.message)
            else
                addReclamationTableRow(reclamation)
        })
}

function getArticles(){
    let userId = document.getElementById('articles-user-id').value
    if(userId.length == 0){
        alert('Enter user id')
        return
    }

    fetch(`http://localhost:8081/admin/orders/by-user-id/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(orders => orders.json())
        .then(orders => {
            document.getElementsByClassName('article-table-body')[0].innerHTML = ''
            orders.forEach(order => order.articles.forEach(article=> addArticleTableRow(article)))
        })
}

function addArticleTableRow(article){
    let tr = document.createElement('tr')

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    td1.classList.add('article-id')
    td2.classList.add('article-name')
    td3.classList.add('article-price')

    let text1 = document.createTextNode(`${article.id}`);
    let text2 = document.createTextNode(`${article.name}`);
    let text3 = document.createTextNode(`${article.price}`);

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    let tableBody = document.getElementsByClassName('article-table-body')[0]
    tableBody.append(tr)
}

function getReclamations(){
    fetch('http://localhost:8081/admin/reclamations', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(reclamations => reclamations.json())
        .then(reclamations => {
            document.getElementsByClassName('reclamation-table-body')[0].innerHTML = ''
            reclamations.forEach(reclamation => addReclamationTableRow(reclamation))
        })
}

function addReclamationTableRow(reclamation){
    let tr = document.createElement('tr')

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    td1.classList.add('reclamation-id')
    td2.classList.add('reclamation-user-id')
    td3.classList.add('reclamation-description')
    td4.classList.add('reclamation-article-id')

    let text1 = document.createTextNode(`${reclamation.id}`);
    let text2 = document.createTextNode(`${reclamation.user_id}`);
    let text3 = document.createTextNode(`${reclamation.description}`);
    let text4 = document.createTextNode(`${reclamation.article_id}`);

    let btn = document.createElement('button')
    btn.innerText = 'REMOVE'
    btn.classList.add('btn-danger')
    btn.addEventListener('click', deleteReclamation)

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)
    td4.appendChild(text4)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(btn)

    let tableBody = document.getElementsByClassName('reclamation-table-body')[0]
    tableBody.append(tr)
}

function deleteReclamation(event){
    const buttonClicked = event.target
    const reclamationId = buttonClicked.parentElement.getElementsByClassName('reclamation-id')[0].innerText

    fetch(`http://localhost:8081/admin/reclamations/${reclamationId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(category => category.json())
        .then(res => {
            if (res.message)
                alert(res.message)
            else
                buttonClicked.parentElement.remove()
        })
}