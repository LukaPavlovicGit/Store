window.addEventListener('load', init);

function init() {
    document.getElementById('logout-button').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`
        window.location.href = '/login'
    })

    document.getElementById('user-button').addEventListener('click', e => {
        window.location.href = '/users'
    })

    document.getElementById('article-button').addEventListener('click', e => {
        window.location.href = '/articles'
    })

    document.getElementById('delivery-button').addEventListener('click', e => {
        window.location.href = '/deliveries'
    })

    document.getElementById('invoice-button').addEventListener('click', e => {
        window.location.href = '/invoices'
    })

    document.getElementById('comment-button').addEventListener('click', e => {
        window.location.href = '/comments'
    })
}