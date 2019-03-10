<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">Simple Table</h1>
        <point-table>
          <template slot="p-head">
            <tr>
              <th style="min-width:200px">Name</th>
              <th>Address</th>
              <th>Notes</th>
              <th>Phone</th>
              <th>Board</th>
            </tr>
          </template>
          <template slot="p-body">
            <tr v-for="(n, index) in 20" :key="index">
              <th>John Doe {{index}}</th>
              <td>2{{index}} Street</td>
              <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio illo provident ullam architecto est quas magni rerum dolorum illum corporis saepe amet fuga omnis facere itaque suscipit, alias laboriosam pariatur.</td>
              <td>+62731469{{index}}</td>
              <td>Boarding</td>
            </tr>
          </template>
        </point-table>
      </div>
    </section>
  </div>
</template>

<script>
import PointTable from '@/components/PointTable'

export default {
  name: 'using-slot',
  components: {
    PointTable
  }
}
</script>
