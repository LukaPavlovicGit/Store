import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    articles: [],
    article: null,
    comments: [],
    comment: null,
    orders: [],
    order: null,
    vouchers: [],
    voucher: null
  },

  getters: {

  },

  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.token = token
    },
    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },
    setArticles(state, articles){
      state.articles = articles
    },
    setArticle(state, article){
      state.article = article
    },
    addArticle(state, article){
      state.articles.push(article)
    },
    setComments(state, comments){
      state.comments = comments
    },
    setComment(state, comment){
      state.comment = comment
    },
    addComment(state, comment){
      state.comments.push(comment)
    },
    setOrders(state, orders){
      state.orders = orders
    },
    setOrder(state, order){
      state.order = order
    },
    addOrder(state, order){
      state.orders.push(order)
    },
    removeComment: function (state, id) {
      for (let u = 0; u < state.comments.length; u++) {
        if (state.comments[u].id === id) {
          state.comments.splice(u, 1);
          break;
        }
      }
    },
    updateComment: function (state, payload) {
      for (let u = 0; u < state.comments.length; u++) {
        if (state.comments[u].id === payload.id) {
          state.comments[u].rating = payload.rating;
          state.comments[u].comment = payload.comment;
          break;
        }
      }
    }
  },
  actions: {
    register({ commit }, obj) {
      fetch('http://localhost:8082/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })
          .then( res => res.json() )
          .then( res => {
            if (res.message)
              alert(res.message)
          })
    },

    login({ commit }, obj) {
      fetch('http://localhost:8082/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })
          .then( res => res.json() )
          .then( res => {
            if (res.message)
              alert(res.message)
            else
              commit('setToken', res.token)
          })
    },

    fetchArticles({ commit }){
      fetch('http://localhost:8081/admin/articles',{
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.token}`
        },
      })
          .then( res => res.json() )
          .then( res => commit('setArticles', res));
    },
    fetchComments({ commit }){
      fetch('http://localhost:8081/admin/comments',{
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.token}`
        }
      })
          .then( res => res.json() )
          .then( res => commit('setComments', res));
    },

    fetchOrders({ commit }){
      fetch('http://localhost:8081/admin/orders',{
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.token}`
        }
      })
          .then( res => res.json() )
          .then( res => commit('setOrders', res));
    },
  },

  modules: {

  }
})
