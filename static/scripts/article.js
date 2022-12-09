window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init() {
    getArticles()
    document.getElementById('article-create-button').addEventListener('click', addArticle)
}

function getArticles() {
    fetch('http://localhost:8081/admin/articles', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(articles => {
            articles.forEach(article => {
                let newRow =
                    `<tr id="table-row-${article.id}">
                            <td>${article.category_id}</td>
                            <td>${article.manufacturer}</td>
                            <td>${article.price}</td>
                            <td>${article.number_on_stock}</td>
                            <td> <button type="button" class="update-button" onclick="updateArticle(${article.id})">update</button> </td>
                            <td> <button type="button" class="delete-button" onclick="deleteArticle(${article.id})">delete</button> </td>
                        </tr>`

                document.querySelector('#table-body').innerHTML = document.querySelector('#table-body').innerHTML + newRow
            })
        })
}

function addArticle() {
    if(checkInput() === false)
        return;

    var selectCategory = document.getElementById('category')
    var category = selectCategory.options[selectCategory.selectedIndex].text

    var article = {
        category_id: category,
        manufacturer: document.getElementById('manufacturer').value,
        price: document.getElementById('price').value,
        number_on_stock: document.getElementById('number_on_stock').value
    }

    fetch('http://localhost:8081/admin/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(article)
    })
        .then(res => res.json())
        .then(res => {
            if (res.message) {
                alert(res.message)
            }
            else {
                let newRow =
                    `<tr id="table-row-${res.article.id}">
                            <td>${res.article.category_id}</td>
                            <td>${res.article.manufacturer}</td>
                            <td>${res.article.price}</td>
                            <td>${res.article.number_on_stock}</td>
                            <td> <button type="button" class="update-button" onclick="updateArticle(${res.article.id})">update</button> </td>
                            <td> <button type="button" class="delete-button" onclick="deleteArticle(${res.article.id})">delete</button> </td>
                        </tr>`

                document.querySelector('#table-body').innerHTML = document.querySelector('#table-body').innerHTML + newRow
                clearInput()
            }
        })
}

function updateArticle(articleId) {
    var selectCategory = document.getElementById('category-update')
    var category = selectCategory.options[selectCategory.selectedIndex].text

    var article = {
        category_id: category,
        manufacturer: document.getElementById('manufacturer-update').value,
        price: document.getElementById('price-update').value,
        number_on_stock: document.getElementById('number_on_stock-update').value
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
            if (res.message) {
                alert(res.message)
            }
            else {
                location.reload();
                document.getElementById('password-update').value = ''
                document.getElementById('update').style.visibility = 'hidden'
            }
        })
}

function deleteArticle(articleId) {
    fetch(`http://localhost:8081/admin/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(res => {
            if (res.json().message) {
                alert(res.json().message);
            }
            else {
                let trDelete = document.getElementById(`table-row-${articleId}`);
                trDelete.parentNode.removeChild(trDelete);
            }
        });
}

function clearInput() {
    document.getElementById('manufacturer').value = ''
    document.getElementById('price').value = ''
    document.getElementById('number_on_stock').value = ''
}