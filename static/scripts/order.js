window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init() {
    loadArticles()
    loadUsers()
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function loadArticles(){
    fetch('http://localhost:8081/admin/articles', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(articles => articles.forEach(article => addArticleTableRow(article)))
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

    let btn = document.createElement('button')
    btn.innerHTML = 'ADD TO CART'
    btn.classList.add('btn-primary')
    btn.addEventListener('click', addToCartClicked)

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(btn)

    let tableBody = document.getElementsByClassName('article-table-body')[0]
    tableBody.append(tr)
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

function addToCartClicked(event){

    event.target.parentElement.remove()

    let articleId = event.target.parentElement.getElementsByClassName('article-id')[0].innerText
    let articleName = event.target.parentElement.getElementsByClassName('article-name')[0].innerText
    let articlePrice = event.target.parentElement.getElementsByClassName('article-price')[0].innerText


    let tr = document.createElement('tr')

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    td1.classList.add('cart-article-id')
    td2.classList.add('cart-article-name')
    td3.classList.add('cart-article-price')

    let text1 = document.createTextNode(articleId);
    let text2 = document.createTextNode(articleName);
    let text3 = document.createTextNode(articlePrice);

    let btn = document.createElement('button')
    btn.innerHTML = 'REMOVE FROM CART'
    btn.classList.add('btn-danger')
    btn.addEventListener('click', removeFromChart)

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(btn)

    let tableBody = document.getElementsByClassName('cart-table-body')[0]
    tableBody.append(tr)
    updateCartTotalPrice()
}

function removeFromChart(event){

    event.target.parentElement.remove()

    let articleId = event.target.parentElement.getElementsByClassName('cart-article-id')[0].innerText
    let articleName = event.target.parentElement.getElementsByClassName('cart-article-name')[0].innerText
    let articlePrice = event.target.parentElement.getElementsByClassName('cart-article-price')[0].innerText

    let article = {
        id: articleId,
        name: articleName,
        price: articlePrice
    }
    addArticleTableRow(article)
    updateCartTotalPrice()
}

function updateCartTotalPrice(){
    let rows = document.getElementsByClassName('cart-table-body')[0].rows
    let total = 0
    for(let i = 0 ; i < rows.length ; ++i){
        let articlePrice = rows[i].getElementsByClassName('cart-article-price')[0].innerText
        total += parseFloat(articlePrice)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


function purchaseClicked(event) {

    let userId = document.getElementById('create-order-user-id').value
    let totalPrice = document.getElementsByClassName('cart-total-price')[0].innerText.replace('$', '')
    if(userId.length == 0){
        alert('Enter user id')
        return
    }

    const order = {
        user_id: userId,
        total_price: totalPrice
    }

    fetch('http://localhost:8081/admin/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(order)
    })
        .then(order => order.json())
        .then(order => {
            if (order.message)
                alert(order.message)
            else {
                let rows = document.getElementsByClassName('cart-table-body')[0].rows
                for(let i = 0 ; i < rows.length ; ++i){
                    let articleId = rows[i].getElementsByClassName('cart-article-id')[0].innerText
                    assignOrderIdToArticles(articleId,order)
                }
                addOrderTableRow(order)
                document.getElementsByClassName('cart-table-body')[0].innerHTML = ''
                updateCartTotalPrice()
            }
        })
}

function assignOrderIdToArticles(articleId,order){
    let article = {
        order_id: order.id
    }
    fetch(`http://localhost:8081/admin/articles/${articleId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(article)
    })
        .then(res => res.json())
        .then(res => {
            if (res.message)
                alert(res.message)
        })
}

function addOrderTableRow(order){
    let tr = document.createElement('tr')

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    td1.classList.add('order-id')
    td2.classList.add('order-user-id')
    td3.classList.add('order-delivery-id')
    td4.classList.add('order-total-price')

    let text1 = document.createTextNode(`${order.id}`);
    let text2 = document.createTextNode(`${order.user_id}`);
    let text3 = document.createTextNode(`${order.delivery_id}`);
    let text4 = document.createTextNode(`${order.total_price}`);

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)
    td4.appendChild(text4)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)

    let tableBody = document.getElementsByClassName('all-orders-table-body')[0]
    tableBody.append(tr)
}