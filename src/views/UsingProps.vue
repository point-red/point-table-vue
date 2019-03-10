<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">Simple Table</h1>
        <point-table :data="streets"/>
      </div>

      <hr>

      <div class="container">
        <h1 class="title">With Custom Header</h1>
        <point-table :data="streets" :columns="columns"/>
      </div>
    </section>
  </div>
</template>

<script>
import PointTable from '@/components/PointTable'
import streets from '@/street.json'

export default {
  name: 'using-props',
  components: {
    PointTable
  },
  data () {
    return {
      streets: streets,
      columns: {
        'city': 'City',
        'street_address': 'Street Address',
        'street_name': 'Street Name',
        'street_number': 'Street Number',
        'state': 'State',
        'postal_code': 'Postal Code',
        'country': 'Country',
        'country_code': 'CC',
        'latitude': 'Latitude',
        'longitude': 'Longitude',
        'timezone': 'Timezone'
      }
    }
  }
}
</script>
