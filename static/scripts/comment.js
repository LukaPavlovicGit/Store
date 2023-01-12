window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init() {
    loadArticles()
    loadComments()
}

function loadArticles(){
    fetch('http://localhost:8081/admin/articles', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(articles => articles.json())
        .then(articles => {
            document.getElementsByClassName('article-table-body')[0].innerHTML = ''
            articles.forEach(article => addArticleRow(article))
        })
}

function loadComments(){
    fetch('http://localhost:8081/admin/comments', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(comments => comments.json())
        .then(comments => {
            document.getElementsByClassName('comment-table-body')[0].innerHTML = ''
            comments.forEach(comment => addCommentRow(comment))
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
    btn.innerText = 'ADD COMMENT'
    btn.classList.add('btn-create')
    btn.addEventListener('click', createComment)

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

function addCommentRow(comment){
    let tr = document.createElement('tr')

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    td1.classList.add('article-comment-id')
    td2.classList.add('article-comment-rate')
    td3.classList.add('article-comment-text')
    td4.classList.add('article-comment-user-id')
    td5.classList.add('article-comment-article-id')

    let text1 = document.createTextNode(`${comment.id}`);
    let text2 = document.createTextNode(`${comment.rate}`);
    let text3 = document.createTextNode(`${comment.text}`);
    let text4 = document.createTextNode(`${comment.user_id}`);
    let text5 = document.createTextNode(`${comment.article_id}`);


    let btn = document.createElement('button')
    btn.innerText = 'REMOVE'
    btn.classList.add('btn-danger')
    btn.addEventListener('click', deleteComment)

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)
    td4.appendChild(text4)
    td5.appendChild(text5)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(btn)

    let tableBody = document.getElementsByClassName('comment-table-body')[0]
    tableBody.append(tr)
}

function createComment(event){
    let article_id = event.target.parentElement.getElementsByClassName('article-id')[0].innerText
    let selected_rate = document.getElementById('comment-rate')
    let rate = selected_rate.options[selected_rate.selectedIndex].text
    let text = document.getElementById('comment-text').value

    let comment = {
        rate: rate,
        text: text,
        article_id: article_id
    }

    fetch(`http://localhost:8081/admin/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(comment)
    })
        .then(comment => comment.json())
        .then(comment => {
            if (!comment)
                alert('post comment failure')
            else
                commentsByArticle(article_id)
        })
}

function commentsByArticle(article_id){
    fetch(`http://localhost:8081/admin/comments/article/${article_id}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(commentsByArticle => commentsByArticle.json())
        .then(commentsByArticle => {
            document.getElementsByClassName('article-comment-table-body')[0].innerHTML = ''
            commentsByArticle.forEach(comment => addArticleCommentRow(comment))
        })
}

function addArticleCommentRow(comment){
    let tr = document.createElement('tr')

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    td1.classList.add('article-comment-id')
    td2.classList.add('article-comment-rate')
    td3.classList.add('article-comment-text')
    td4.classList.add('article-comment-user-id')
    td5.classList.add('article-comment-article-id')

    let text1 = document.createTextNode(`${comment.id}`);
    let text2 = document.createTextNode(`${comment.rate}`);
    let text3 = document.createTextNode(`${comment.text}`);
    let text4 = document.createTextNode(`${comment.user_id}`);
    let text5 = document.createTextNode(`${comment.article_id}`);


    let btnDelete = document.createElement('button')
    btnDelete.innerText = 'REMOVE'
    btnDelete.classList.add('btn-danger')
    btnDelete.addEventListener('click', deleteComment)

    let btnUpdate = document.createElement('button')
    btnUpdate.innerText = 'UPDATE'
    btnUpdate.classList.add('btn-update')
    btnUpdate.addEventListener('click', updateComment)

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)
    td4.appendChild(text4)
    td5.appendChild(text5)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(btnDelete)
    tr.appendChild(btnUpdate)

    let tableBody = document.getElementsByClassName('article-comment-table-body')[0]
    tableBody.append(tr)
}

function deleteComment(event){

    let comment_id = event.target.parentElement.getElementsByClassName('article-comment-id')[0].innerText

    fetch(`http://localhost:8081/admin/comments/${comment_id}`, {
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
                loadComments()

        })
}

function updateComment(event){
    let comment_id = event.target.parentElement.getElementsByClassName('article-comment-id')[0].innerText
    let selected_rate = document.getElementById('comment-rate')
    let rate = selected_rate.options[selected_rate.selectedIndex].text
    let text = document.getElementById('update-comment-text').value

    const comment = {
        rate: rate,
        text: text
    }
    fetch(`http://localhost:8081/admin/comments/${comment_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(comment)
    })
        .then(comment => comment.json())
        .then(comment => {
            if (!comment)
                alert('update comment failure')
            else
                commentsByArticle(comment.article_id)
        })
}