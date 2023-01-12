window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init(){
    loadQuestions()
    document.getElementsByClassName('btn-create-question')[0].addEventListener('click', createQuestion)
    document.getElementsByClassName('btn-update-question')[0].addEventListener('click', updateQuestion)
}

function loadQuestions(){
    fetch('http://localhost:8081/admin/questions', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(questions => questions.json())
        .then(questions => {
            document.getElementsByClassName('question-table-body')[0].innerHTML=''
            questions.forEach(question => addQuestionRow(question))
        })
}

function addQuestionRow(question){
    let tr = document.createElement('tr')

    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')
    td1.classList.add('question-id')
    td2.classList.add('question-question')
    td3.classList.add('question-answer')

    let text1 = document.createTextNode(`${question.id}`)
    let text2 = document.createTextNode(`${question.question}`)
    let text3 = document.createTextNode(`${question.answer}`)

    let btn = document.createElement('button')
    btn.innerText = 'REMOVE'
    btn.classList.add('btn-danger')
    btn.addEventListener('click', deleteQuestion)

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(btn)

    let tableBody = document.getElementsByClassName('question-table-body')[0]
    tableBody.append(tr)
}

function createQuestion(){
    let quest = document.getElementById('create-question-question').value
    let answer = document.getElementById('create-question-answer').value

    let question = {
        question: quest,
        answer: answer
    }

    fetch('http://localhost:8081/admin/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(question)
    })
        .then(question => question.json())
        .then(question => {
            if (question.message)
                alert(question.message)
            else
                addQuestionRow(question)
        });
}

function updateQuestion(){
    let question_id = document.getElementById('update-question-id').value
    let quest = document.getElementById('update-question-question').value
    let answer = document.getElementById('update-question-answer').value

    let question = {
        question: quest,
        answer: answer
    }
    fetch(`http://localhost:8081/admin/questions/${question_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(question)
    })
        .then(question => question.json())
        .then(question => {
            if (question.message)
                alert(question.message)
            else
                loadQuestions()
        })
}

function deleteQuestion(event){
    let clickedButton = event.target
    let question_id = clickedButton.parentElement.getElementsByClassName('question-id')[0].innerText
    fetch(`http://localhost:8081/admin/questions/${question_id}`, {
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
                loadQuestions()
        });
}