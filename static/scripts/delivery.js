window.addEventListener('load', init)

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]


function init() {
    loadDeliveries()

    let createDeliveryButton = document.getElementsByClassName('delivery-creation-btn')[0];
    createDeliveryButton.addEventListener('click', createDelivery)

    let updateDeliveryButton = document.getElementsByClassName('delivery-update-btn')[0]
    updateDeliveryButton.addEventListener('click', updateDelivery)

}

function loadDeliveries(){

    fetch('http://localhost:8081/admin/deliveries', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(deliveries => deliveries.json())
        .then(deliveries => deliveries.forEach(delivery => addDeliveryRow(delivery)))
}

function createDelivery(event) {
    let clickedButton = event.target
    let deliveryDate = clickedButton.parentElement.getElementsByClassName('delivery-creation-date')[0].innerText

    let delivery = {
        delivery_date: deliveryDate
    }

    fetch('http://localhost:8081/admin/deliveries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(delivery)
    })
        .then(delivery => delivery.json())
        .then(delivery => {
            if (delivery.message)
                alert(delivery.message)
            else
                addDeliveryRow(delivery)
        })
}

function updateDelivery(event) {
    let clickedButton = event.target
    let deliveryId = clickedButton.parentElement.getElementsByClassName('delivery-update-id')[0].value
    let deliveryNewDate = clickedButton.parentElement.getElementsByClassName('delivery-update-date')[0].value

    let delivery = {
        delivery_date: deliveryNewDate
    }

    fetch(`http://localhost:8081/admin/deliveries/${deliveryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(delivery)
    })
        .then(delivery => delivery.json())
        .then(delivery => {
            if (delivery.message)
                alert(delivery.message)
            else{
                let deliveryRowsContainer = document.getElementsByClassName('delivery-rows')[0]
                let deliveryRows = deliveryRowsContainer.getElementsByClassName('delivery-row')
                for(let i = 0 ; i < deliveryRows.length ; i++) {

                    let deliveryRow = deliveryRows[i]
                    let delID = deliveryRow.getElementsByClassName('delivery-id')[0].innerText
                    if (deliveryId === delID) {
                        deliveryRow.getElementsByClassName('category-name')[0].innerText = deliveryNewDate
                        return
                    }
                }
            }
        })
}

function deleteDelivery(event) {
    const buttonClicked = event.target
    const deliveryId = buttonClicked.parentElement.getElementsByClassName('category-id')[0].innerText

    fetch(`http://localhost:8081/admin/deliveries/${deliveryId}`, {
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

function addDeliveryRow(delivery){
    let deliveryRow = document.createElement('div')
    deliveryRow.classList.add('delivery-row')
    let deliveryRowContent = `
                    <span class="delivery-id delivery-column">${delivery.id}</span>
                    <span class="delivery-date category-column">${delivery.delivery_date}</span>                   
                    <button class="btn btn-organize-delivery" type="button">ORGANIZE</button>
                    <button class="btn btn-danger" type="button">REMOVE</button>
                `
    let deliveryRows = document.getElementsByClassName('delivery-rows')[0]
    deliveryRow.innerHTML = deliveryRowContent
    deliveryRows.append(deliveryRow)
    deliveryRow.getElementsByClassName('btn btn-organize-delivery')[0].addEventListener('click', deliveryOrganization)
    deliveryRow.getElementsByClassName('btn-danger')[0].addEventListener('click', deleteDelivery)
}

function deliveryOrganization(event){
    let clickedButton = event.target
    let deliveryId = clickedButton.parentElement.getElementsByClassName('delivery-id')[0].innerText
    loadOrders(deliveryId)
    loadDeliveryContent(deliveryId)
}

function loadOrders(deliveryId){
    fetch('http://localhost:8081/admin/orders', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(orders => orders.json())
        .then(orders => orders.forEach(order => addOrderRow(order, deliveryId)))
}

function addOrderRow(order, deliveryId){
    let orderRow = document.createElement('div')
    orderRow.classList.add('order-row')
    let orderRowContent = `
                    <span class="order-id order-column">${order.id}</span>
                    <span class="order-total-price order-column">${order.total_price}</span>                   
                    <button class="btn btn-add-order-to-delivery" 
                            type="button" 
                            onclick="addOrderToDeliveryContent(event, ${order.id}, ${deliveryId})">ADD TO DELIVERY</button>
                `
    let orderRows = document.getElementsByClassName('order-rows')[0]
    orderRow.innerHTML = orderRowContent
    orderRows.append(orderRow)
}

function loadDeliveryContent(deliveryId) {
    fetch(`http://localhost:8081/admin/deliveries/${deliveryId}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(delivery => delivery.json())
        .then(delivery => delivery.orders.forEach(order => {
            let addedOrderRow = document.createElement('div')
            addedOrderRow.classList.add('added-order-row')
            let addedOrderRowContent = `
                    <span class="added-order-delivery-id added-order-column">${deliveryId}</span>
                    <span class="added-order-order-id added-order-column">${order.id}</span>                   
                    <span class="added-order-order-total-price added-order-column">${order.total_price}</span>  
                    <button class="btn btn-remove-order-from-delivery" type="button">REMOVE</button> 
                `
            let addedOrderRows = document.getElementsByClassName('added-order-rows')[0]
            addedOrderRow.innerHTML = addedOrderRowContent
            addedOrderRows.append(addedOrderRow)
            addedOrderRow.getElementsByClassName('btn btn-remove-order-from-delivery')[0].addEventListener('click', removeOrderFromDelivery)
        }))
}

function addOrderToDeliveryContent(event, orderId, deliveryId) {

    let clickedButton = event.target

    const order = {
        delivery_id: deliveryId
    }

    fetch(`http://localhost:8081/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(order)
    })
        .then(order => order.json())
        .then(order => {
            if (order.message)
                alert(order.message)
            else {
                clickedButton.parentElement.remove()

                let addedOrderRow = document.createElement('div')
                addedOrderRow.classList.add('added-order-row')
                let addedOrderRowContent = `
                    <span class="added-order-delivery-id added-order-column">${deliveryId}</span>
                    <span class="added-order-order-id added-order-column">${order.id}</span>                   
                    <span class="added-order-order-total-price added-order-column">${order.total_price}</span>  
                    <button class="btn btn-remove-order-from-delivery" type="button">REMOVE</button> 
                `
                let addedOrderRows = document.getElementsByClassName('added-order-rows')[0]
                addedOrderRow.innerHTML = addedOrderRowContent
                addedOrderRows.append(addedOrderRow)
                addedOrderRow.getElementsByClassName('btn btn-remove-order-from-delivery')[0].addEventListener('click', removeOrderFromDelivery)
            }
        })
}


function removeOrderFromDelivery(event) {
    const buttonClicked = event.target
    const orderId = buttonClicked.parentElement.getElementsByClassName('added-order-order-id')[0].innerText

    const order = {
        delivery_id: -1
    }

    fetch(`http://localhost:8081/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(order)
    })
        .then(category => category.json())
        .then(res => {
            if (res.message)
                alert(res.message)
            else
                buttonClicked.parentElement.remove()
        })

}