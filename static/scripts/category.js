window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init() {
    loadCategories()

    let createCategoryButton = document.getElementsByClassName('category-creation-btn')[0]
    createCategoryButton.addEventListener('click', createCategory)

    let updateCategoryButton = document.getElementsByClassName('category-update-btn')[0]
    updateCategoryButton.addEventListener('click', updateCategory)
}

function loadCategories(){
    fetch('http://localhost:8081/admin/categories', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .then(categories => categories.forEach(category => addCategoryRow(category)))
}

function createCategory(event){
    let button = event.target
    let categoryNameInput = button.parentElement.getElementsByClassName('category-creation-name')[0].value

    const category = {
        name: categoryNameInput
    }

    fetch('http://localhost:8081/admin/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(category)
    })
        .then(category => category.json())
        .then(category => {
            if (category.message)
                alert(category.message)
            else
                addCategoryRow(category)
        })
}

function addCategoryRow(category){
    let categoryRow = document.createElement('div')
    categoryRow.classList.add('category-row')
    let categoryRows = document.getElementsByClassName('category-rows')[0]
    let categoryRowContent = `
                    <span class="category-id category-column">${category.id}</span>
                    <span class="category-name category-column">${category.name}</span>
                    <button class="btn btn-danger" type="button">REMOVE</button>
                `
    categoryRow.innerHTML = categoryRowContent
    categoryRows.append(categoryRow)
    categoryRow.getElementsByClassName('btn-danger')[0].addEventListener('click', deleteCategory)
}

function deleteCategory(event){
    const buttonClicked = event.target
    const categoryId = buttonClicked.parentElement.getElementsByClassName('category-id')[0].innerText

    fetch(`http://localhost:8081/admin/categories/${categoryId}`, {
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

function updateCategory(event){
    const buttonClicked = event.target
    const targetCategoryId = buttonClicked.parentElement.getElementsByClassName('category-update-id')[0].value
    const categoryNewName = buttonClicked.parentElement.getElementsByClassName('category-update-name')[0].value

    const category = {
        name: categoryNewName
    }

    fetch(`http://localhost:8081/admin/categories/${targetCategoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(category)
    })
        .then(res => res.json())
        .then(res => {
            if (res.message)
                alert(res.message)
            else{
                let categoryRowsContainer = document.getElementsByClassName('category-rows')[0]
                let categoryRows = categoryRowsContainer.getElementsByClassName('category-row')
                for(let i = 0 ; i < categoryRows.length ; i++){

                    let categoryRow = categoryRows[i]
                    let categoryId = categoryRow.getElementsByClassName('category-id')[0].innerText
                    if(targetCategoryId === categoryId){
                        categoryRow.getElementsByClassName('category-name')[0].innerText = categoryNewName
                        return
                    }
                }
            }
        })
}

