window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init() {
    loadArticles()
    document.getElementById('article-create-button').addEventListener('click', createArticle)
    document.getElementById('article-update-button').addEventListener('click', updateArticle)
}

function loadArticles(){
    fetch('http://localhost:8081/admin/articles', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(articles => articles.json())
        .then(articles => articles.forEach(article => addArticleRow(article)))
}

function createArticle(){
    let selectCategory = document.getElementById('category')
    let category_id = selectCategory.options[selectCategory.selectedIndex].text
    let manufacturer = document.getElementById('manufacturer').value
    let name = document.getElementById('name').value
    let price = document.getElementById('price').value

    let article = {
        category_id: category_id,
        manufacturer: manufacturer,
        name: name,
        price: price
    }

    fetch('http://localhost:8081/admin/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(article)
    })
        .then(article => article.json())
        .then(article => {
            if (article.message)
                alert(article.message)
            else
                addArticleRow(article)
        })
}

function updateArticle(){
    let article_id = document.getElementById('update-article-id').value
    let category_id = document.getElementById('update-article-category').value
    let manufacturer = document.getElementById('update-article-manufacturer').value
    let name = document.getElementById('update-article-name').value
    let price = document.getElementById('update-article-price').value

    let article = {
        category_id: category_id,
        manufacturer: manufacturer,
        name: name,
        price: price
    }

    fetch(`http://localhost:8081/admin/articles/${article_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(article)
    })
        .then(article => article.json())
        .then(article => {
            if (article.message)
                alert(article.message)
            else
                getArticles()
        })
}

function addArticleRow(article){
    let tr = document.createElement('tr')

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    td1.classList.add('article-id')
    td2.classList.add('article-category-id')
    td3.classList.add('article-manufacturer')
    td4.classList.add('article-price')

    let text1 = document.createTextNode(`${article.id}`);
    let text2 = document.createTextNode(`${article.category_id}`);
    let text3 = document.createTextNode(`${article.manufacturer}`);
    let text4 = document.createTextNode(`${article.price}`);

    let btn = document.createElement('button')
    btn.innerText = 'REMOVE'
    btn.classList.add('btn-danger')
    btn.addEventListener('click', deleteArticle)

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)
    td4.appendChild(text4)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(btn)

    let tableBody = document.getElementsByClassName('article-table-body')[0]
    tableBody.append(tr)
}

function deleteArticle(event){
    let clickedButton = event.target
    let articleId = clickedButton.parentElement.getElementsByClassName('article-id')[0].innerText
    fetch(`http://localhost:8081/admin/articles/${articleId}`, {
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
                getArticles()
        })
}

function getArticles(){
    fetch('http://localhost:8081/admin/articles', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(articles => articles.json())
        .then(articles => {
            document.getElementsByClassName('article-table-body')[0].innerHTML = ''
            articles.forEach(article => addArticleRow(article))
        })
}