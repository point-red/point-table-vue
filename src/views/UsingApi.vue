<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">Simple Table | API</h1>
        <point-table>
          <template slot="p-head">
            <tr>
              <th>No</th>
              <th>Title</th>
            </tr>
          </template>
          <template>
            <tr slot="p-body" v-for="(todo, index) in todos" :key="index">
              <th>{{ todo.id }}</th>
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
import { setTimeout } from 'timers';
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
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        this.todos = response.data
      })
  }
}
</script>
