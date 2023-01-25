<template>
  <div>

    <b-table class="table table-hover"
             id="image-table"
             hover
             fixed
             :items="articlesTable"
             :fields="fields"
             small
             :per-page="perPage"
             :current-page="currentPage"
             @row-clicked="rowClicked"
    >
    </b-table>
    <b-pagination
        v-model="currentPage"
        :total-rows="articlesTable.length"
        :per-page="perPage"
        aria-controls="image-table"
    ></b-pagination>

  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'

export default {
  name: "ArticlesList",

  data() {
    return {
      fields: ['name', 'price', 'category', 'manufacturer'],
      items: [],
      currentPage: 1,
      perPage: 10,
    }
  },

  computed: {
    ...mapState([
      'articles',
      'token',
    ]),
    articlesTable: function () {
      return this.articles;
    }
  },

  methods: {
    ...mapActions([
      'fetchArticles'
    ]),

    rowClicked(record, index) {
      this.$router.push({ name: 'Single', params: { id: record.objectID } });
    }
  }
}
</script>

<style scoped>

</style>