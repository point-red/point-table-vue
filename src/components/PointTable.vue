<template>
<div ref="tableWrapper" @scroll="horizontalScroll">
  <table ref="mainTable" class="table is-fullwidth">
    <thead ref="tableHead">
      <slot name="p-head">
        <tr v-if="mutableBody">
          <template v-for="(key, index) in Object.keys(mutableBody[0])">
            <th :key="index">{{ key }}</th>
          </template>
        </tr>
      </slot>
    </thead>
    <thead ref="stickyTableHead" class="table-head-fixed">
      <slot name="p-sticky-head"></slot>
    </thead>
    <tbody>
      <slot name="p-body">
        <tr v-for="(data, indexData) in mutableBody" :key="indexData">
          <template v-for="(key, indexKey) in Object.keys(data)">
            <th :key="indexKey" v-if="indexKey == 0">{{ data[key] }}</th>
            <td :key="indexKey" v-else>{{ data[key] }}</td>
          </template>
        </tr>
      </slot>
    </tbody>
  </table>
  <table ref="headerTable"></table>
  <div ref="anchorBottom"></div>
</div>
</template>

<script>
export default {
  name: 'PointTable',
  props: {
    data: {
      type: Array
    },
    header: {
      type: Array
    }
  },
  data: function () {
    return {
      isTableHeadFixed: true,
      tableHeadHeight: 0,
      anchorTop: 0,
      anchorBottom: 0,
      tableHeight: 0,
      mutableHead: this.header,
      mutableBody: this.data
    }
  },
  computed: {
  },
  methods: {
    horizontalScroll () {
      // sync sticky table head with original table head
      this.$refs.stickyTableHead.style.left = this.$refs.mainTable.getBoundingClientRect().x + 'px'
      var bodyX = this.$slots['p-body'][0].children[0].elm.getBoundingClientRect().x;
      // remove fixed head that out of table area
      for (var i = 0; i < this.$slots['p-sticky-head'][0].children.length; i++) {
        var thX = this.$refs.mainTable.children[1].children[0].children[i].getBoundingClientRect().x
        var thWidth = this.$refs.stickyTableHead.children[0].children[i].clientWidth
        // ignore sticky th
        if (i > 0) {
          // remove fixed head that out of table area
          if (thX  + thWidth > bodyX + this.$refs.tableWrapper.clientWidth) {
            // hide right column
            this.$refs.stickyTableHead.children[0].children[i].style.visibility = 'hidden'
          } else if (thX <= bodyX || this.anchorTop > 0 || this.anchorBottom < 0) {
            // hide left column
            this.$refs.stickyTableHead.children[0].children[i].style.visibility = 'hidden'
          } else {
            this.$refs.stickyTableHead.children[0].children[i].style.visibility = 'visible'
          }
        }
      }
    },
    verticalScroll () {
      var scroll = window.scrollY
      this.anchorTop = this.$refs.mainTable.getBoundingClientRect().y
      this.anchorBottom = this.$refs.anchorBottom.getBoundingClientRect().y
      if (this.anchorTop <= 0 && this.anchorBottom >= 0) {
        this.$refs.stickyTableHead.style.visibility = 'visible'
      } else {
        this.$refs.stickyTableHead.style.visibility = 'hidden'
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.verticalScroll)
    window.addEventListener('scroll', this.horizontalScroll)
    window.addEventListener('resize', this.verticalScroll)
    window.addEventListener('resize', this.horizontalScroll)
    this.$refs.stickyTableHead.style.visibility = 'hidden'    
    this.$refs.stickyTableHead.style.width = this.$refs.mainTable.clientWidth + 'px'
    for (var i = 0; i < this.$slots['p-head'][0].children.length; i++) {
      this.$refs.stickyTableHead.children[0].children[i].style.width = this.$slots['p-head'][0].children[i].elm.clientWidth +'px'
    }
  },
  created () {
    // clone table head into table sticky head
    this.$slots['p-sticky-head'] = this.$slots['p-head']
  },
  destroyed () {
    window.removeEventListener('scroll', this.verticalScroll)
    window.removeEventListener('scroll', this.horizontalScroll)
    window.removeEventListener('resize', this.verticalScroll)
    window.removeEventListener('resize', this.horizontalScroll)
  },
  updated () {
  }
}
</script>

<style scoped>
div {
  overflow: auto;
  z-index: 1;
}
table {
  margin-bottom: 15px;
}
tr, td, th {
  padding: 5px;
}
th {
  background: #fff;
}
thead th {
  z-index: -1;
}
thead th:first-child {
  left: 0;  
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  z-index: 1;
  left: 0;
}
.table-head-fixed {
  z-index: 2;
}
tbody th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 0;
  background: #FFF;
}
.table-head-fixed {
  position: fixed;
  top: 0;
}
</style>