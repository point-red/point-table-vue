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
        <point-table :data="streets" :headers="headers"/>
      </div>
    </section>
  </div>
</template>

<script>
import PointTable from '@/components/PointTable'
import posts from '@/posts.json'
import streets from '@/street.json'

export default {
  name: 'using-props',
  components: {
    PointTable
  },
  data () {
    return {
      streets: streets,
      posts: posts,
      headers: {
        'city': 'city',
        'street_address': 'street address',
        'street_name': 'street name',
        'street_number': 'street number',
        'state': 'state',
        'postal_code': 'postal code',
        'country': 'country',
        'country_code': 'country code',
        'latitude': 'latitude',
        'longitude': 'longitude',
        'timezone': 'timezone'
      }
    }
  }
}
</script>
