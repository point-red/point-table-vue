<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">Simple Table</h1>
        <point-table :data="streets" @filtered="filtered">
          <template slot="p-head">
            <tr>
              <th style="min-width:200px;">Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </template>
          <template slot="p-body">
            <tr v-for="(data, index) in filteredData" :key="index">
              <th>{{ data.street_name }}</th>
              <td>{{ data.street_address }}</td>
              <td>{{ data.city }}</td>
              <td>{{ data.postal_code }}</td>
              <td>Coordinate : {{ data.latitude }}</td>
              <td>Coordinate : {{ data.longitude }}</td>
            </tr>
          </template>
        </point-table>
      </div>
    </section>
  </div>
</template>

<script>
import PointTable from '@/components/PointTable'
import streets from '@/street.json'
import { setTimeout } from 'timers';

export default {
  name: 'using-slot',
  components: {
    PointTable
  },
  data () {
    return {
      streets: streets,
      filteredData: streets
    }
  },
  methods: {
    filtered (filteredData) {
      this.filteredData = filteredData
    }
  }
}
</script>
