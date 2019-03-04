<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">Simple Table | API</h1>
        <point-table ref="simpleTable">
          <template slot="p-head">
            <tr>
              <th>Id</th>
              <th>Title</th>
            </tr>
          </template>
          <template>
            <tr slot="p-body" v-for="(todo, index) in todos" :key="index">
              <td>{{ todo.id }}</td>
              <td>{{ todo.title }}</td>
            </tr>
          </template>
        </point-table>
      </div>
    </section>
  </div>
</template>

<script>
import PointTable from '@/components/PointTable'
const axios = require('axios')

export default {
  name: 'using-api',
  components: {
    PointTable
  },
  data () {
    return {
      todos: [
        {
          id: null,
          title: null
        }
      ]
    }
  },
  created () {
    const vm = this
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        vm.todos = response.data
        this.$refs.simpleTable.init()
      })
  }
}
</script>
