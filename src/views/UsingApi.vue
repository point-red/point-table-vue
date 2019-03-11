<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">Simple Table | API</h1>
        <div class="columns" v-if="posts">
          <div class="column is-one-quarter">
            <input class="input" type="text" placeholder="Search" @keyup="filterSearch" v-model="searchText">
          </div>
        </div>        
        <point-table>
          <template slot="p-head">
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </template>
          <template>
            <tr slot="p-body" v-for="(post, index) in posts" :key="index">
              <th>{{ post.id }}</th>
              <td>{{ post.title }}</td>
              <td>{{ post.body }}</td>
            </tr>
          </template>
        </point-table>
      </div>
    </section>
  </div>
</template>

<script>
import PointTable from '@/components/PointTable'
import debounce from 'lodash/debounce'
const axios = require('axios')

export default {
  name: 'using-api',
  components: {
    PointTable
  },
  data () {
    return {
      posts: [
        {
          id: null,
          title: null,
          body: null
        }
      ],
      searchText: ''
    }
  },
  methods: {
    filterSearch: debounce (function () {
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10&q=' + this.searchText)
        .then(response => {
          this.posts = response.data
        })
    }, 200)
  },
  created () {
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(response => {
        this.posts = response.data
      })
  }
}
</script>
