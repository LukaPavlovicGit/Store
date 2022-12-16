window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init() {
    getArticles()
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
                    `<tr id="article-table-row-${article.id}">
                            <td>${article.id}</td>
                            <td>${article.category_id}</td>                           
                            <td>${article.manufacturer}</td>
                            <td>${article.price}</td>
                            <td>${article.number_on_stock}</td>
                            <td> <button type="button" class="add-comment-button" onclick="addComment(${article.id})">create comment</button> </td>
                            <td> <button type="button" class="see-comments-button" onclick="seeComments(${article.id})">see comments</button> </td>
                        </tr>`

                document.querySelector('#article-table-body').innerHTML = document.querySelector('#article-table-body').innerHTML + newRow
            })
        })
}

function addComment(articleId){
    const selectRate = document.getElementById('comment-rate')
    const rate = selectRate.options[selectRate.selectedIndex].text

    const comment = {
        article_id: articleId,
        rate: rate,
        text: document.getElementById('comment-text').value
    }
    fetch(`http://localhost:8081/admin/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(comment)
    })
        .then(res => res.json())
        .then(res => {
            if (!res.comment)
                alert(res)
            else
                seeComments(articleId)
        })
}

function seeComments(articleId){
    fetch(`http://localhost:8081/admin/comments/article/${articleId}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(comments => {
            document.querySelector('#comment-table-body').innerHTML = ""

            comments.forEach(comment => {
                let newRow =
                    `<tr id="comment-table-row-${comment.id}">
                            <td>${comment.rate}</td>
                            <td>${comment.text}</td>
                            <td>${comment.user_id}</td>
                            <td>${comment.article_id}</td>
                            <td> <button type="button" class="update-comment-button" onclick="updateComment(${comment.id})">update</button> </td>
                            <td> <button type="button" class="delete-comment-button" onclick="deleteComment(${comment.id})">delete</button> </td>
                    </tr>`

                document.querySelector('#comment-table-body').innerHTML = document.querySelector('#comment-table-body').innerHTML + newRow
            })

            document.querySelector('#comment-table-body').refresh()
        })
}

function updateComment(commentId){
    const selectRate = document.getElementById('comment-rate')
    const rate = selectRate.options[selectRate.selectedIndex].text

    const comment = {
        rate: rate,
        text: document.getElementById('comment-text').value
    }
    fetch(`http://localhost:8081/admin/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(comment)
    })
        .then(res => res.json())
        .then(res => {
            if (!res.comment)
                alert(res)
            else
                seeComments(res.comment.article_id)
        })
}

function deleteComment(commentId){
    fetch(`http://localhost:8081/admin/comments/${commentId}`, {
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
            else {
                let trDelete = document.getElementById(`comment-table-body-${commentId}`)
                trDelete.parentNode.removeChild(trDelete)
            }
        });
}