<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">Simple Table</h1>
        <point-table :data="streets"/>
      </div>

      <hr>

      <div class="container">
        <h1 class="title">Rename Header</h1>
        <point-table :data="streets" :headers="headers"/>
      </div>

      <hr>

      <div class="container">
        <h1 class="title">Custom Header</h1>
        <point-table :data="streets" :custom-headers="customHeaders"/>
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
      },
      customHeaders: [
        {
          fields: [
            {
              caption: '',
              colSpan: 1,
              rowSpan: 1
            },
            {
              caption: 'employee address',
              colSpan: 10,
              rowSpan: 1
            }
          ]
        },
        {
          fields: [
            {
              caption: '', colSpan: 1, rowSpan: 1
            },
            {
              caption: 'address', colSpan: 7, rowSpan: 1
            },
            {
              caption: 'geolocation', colSpan: 2, rowSpan: 1
            },
            {
              caption: '', colSpan: 1, rowSpan: 1
            }
          ]
        }
      ]
    }
  }
}
</script>
