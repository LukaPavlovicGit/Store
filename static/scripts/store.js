window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function init() {
    loadStores()

    let createStoreButton = document.getElementsByClassName('store-creation-btn')[0]
    createStoreButton.addEventListener('click', createStore)

    let updateStoreButton = document.getElementsByClassName('store-update-btn')[0]
    updateStoreButton.addEventListener('click', updateStore)
}

function loadStores(){
    fetch('http://localhost:8081/admin/stores', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(stores => stores.json())
        .then(stores => stores.forEach(store => addStoreRow(store)))
}

function createStore(event){
    let button = event.target
    let storeLocation = button.parentElement.getElementsByClassName('store-creation-location')[0].value

    const category = {
        location: storeLocation
    }

    fetch('http://localhost:8081/admin/stores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(category)
    })
        .then(store => store.json())
        .then(store => {
            if (store.message)
                alert(store.message)
            else
                addCategoryRow(store)
        })
}

function updateStore(event){
    const buttonClicked = event.target
    const targetStoreId = buttonClicked.parentElement.getElementsByClassName('store-update-id')[0].value
    const storeNewLocation = buttonClicked.parentElement.getElementsByClassName('store-update-location')[0].value

    const category = {
        location: storeNewLocation
    }

    fetch(`http://localhost:8081/admin/stores/${targetStoreId}`, {
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
                let storeRowsContainer = document.getElementsByClassName('store-rows')[0]
                let storeRows = storeRowsContainer.getElementsByClassName('store-row')
                for(let i = 0 ; i < storeRows.length ; i++){

                    let storeRow = storeRows[i]
                    let storeId = storeRow.getElementsByClassName('category-id')[0].innerText
                    if(targetStoreId === storeId){
                        storeRow.getElementsByClassName('store-location')[0].innerText = storeNewLocation
                        return
                    }
                }
            }
        })
}

function addStoreRow(store){
    let row = document.createElement('div')
    row.classList.add('store-row')
    let rows = document.getElementsByClassName('store-rows')[0]
    let rowContent = `
                    <span class="store-id store-column">${store.id}</span>
                    <span class="store-location store-column">${store.location}</span>
                    <button class="btn btn-danger" type="button">REMOVE</button>
                `
    row.innerHTML = rowContent
    rows.append(row)
    row.getElementsByClassName('btn-danger')[0].addEventListener('click', deleteStore)
}

function deleteStore(event){
    const buttonClicked = event.target
    const storeId = buttonClicked.parentElement.getElementsByClassName('store-id')[0].innerText

    fetch(`http://localhost:8081/admin/stores/${storeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(store => store.json())
        .then(store => {
            if (store.message)
                alert(store.message)
            else
                buttonClicked.parentElement.remove()
        })
}