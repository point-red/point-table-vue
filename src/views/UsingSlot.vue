<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">Simple Table</h1>
        <point-table>
          <template slot="p-head">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </template>
          <template slot="p-body">
            <tr v-for="(n, index) in 10" :key="index">
              <td>John Doe {{index}}</td>
              <td>2{{index}} Street</td>
              <td>+62731469{{index}}</td>
            </tr>
          </template>
        </point-table>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h1 class="title">Custom Header</h1>
        <point-table>
          <template slot="p-extra">
            <tr>
              <th colspan="2"></th>
              <th colspan="4">REPORT</th>
            </tr>
            <tr>
              <th colspan="2"></th>
              <th colspan="2">TARGET</th>
              <th colspan="2">ACTUAL</th>
            </tr>
          </template>
          <template slot="p-head">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </template>
          <template slot="p-body">
            <tr v-for="(n, index) in 10" :key="index">
              <td>{{ index }}</td>
              <td>Item {{ index }}</td>
              <td>5</td>
              <td>50,000</td>
              <td>2</td>
              <td>20,000</td>
            </tr>
          </template>
        </point-table>
      </div>
    </section>
  </div>
</template>

<script>
import PointTable from '@/components/PointTable'
import posts from '@/posts.json'
import streets from '@/street.json'

export default {
  name: 'using-slot',
  components: {
    PointTable
  },
  data () {
    return {
      streets: streets,
      posts: posts
    }
  }
}
</script>
