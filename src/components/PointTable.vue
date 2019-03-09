<template>
<div ref="tableWrapper" @scroll="horizontalScroll">
  <table ref="mainTable">
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
    <thead ref="stickyBgTableHead" class="table-bg-head-fixed">
      <slot name="p-sticky-bg-head"></slot>
    </thead>
    <tbody ref="tableBody">
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
      mutableHead: this.header,
      mutableBody: this.data
    }
  },
  computed: {
    showHeaderFixed () {
      if (this.anchorTop <= 0 && this.anchorBottom >= 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    horizontalScroll () {
      if (this.showHeaderFixed) {
        // sync sticky table head with original table head
        this.$refs.stickyTableHead.style.left = this.$refs.mainTable.getBoundingClientRect().x + 'px'
        var bodyX = this.$refs.tableBody.children[0].children[0].getBoundingClientRect().x;
        var wrapperX = this.$refs.tableWrapper.getBoundingClientRect().x
        var wrapperWidth = this.$refs.tableWrapper.clientWidth
        // remove fixed head that out of table area
        for (var i = 0; i < this.$refs.stickyTableHead.children[0].children.length; i++) {
          var thX = this.$refs.stickyTableHead.children[0].children[i].getBoundingClientRect().x
          var thWidth = this.$refs.stickyTableHead.children[0].children[i].clientWidth
          // ignore sticky th
          if (i > 0) {
            // hide column if outside wrapper width
            if (thX <= bodyX || thX + thWidth >= wrapperWidth + wrapperX) {
              this.$refs.stickyTableHead.children[0].children[i].style.visibility = 'hidden'
            } else {
              this.$refs.stickyTableHead.children[0].children[i].style.visibility = 'visible'
            }
          } else {
            // freeze column always visible
            this.$refs.stickyTableHead.children[0].children[i].style.visibility = 'visible'
          }
        }
      }
    },
    verticalScroll () {
      var scroll = window.scrollY
      this.anchorTop = this.$refs.mainTable.getBoundingClientRect().y
      this.anchorBottom = this.$refs.anchorBottom.getBoundingClientRect().y
      if (this.showHeaderFixed) {
        this.$refs.stickyTableHead.style.display = ''
        this.$refs.stickyBgTableHead.style.display = ''
      } else {
        this.$refs.stickyTableHead.style.display = 'none'
        this.$refs.stickyBgTableHead.style.display = 'none'
      }
    }
  },
  mounted () {    
    window.addEventListener('scroll', this.verticalScroll)
    window.addEventListener('scroll', this.horizontalScroll)
    window.addEventListener('resize', this.verticalScroll)
    window.addEventListener('resize', this.horizontalScroll)

    this.$refs.stickyTableHead.style.width = this.$refs.mainTable.clientWidth + 'px'
    this.$refs.stickyBgTableHead.style.width = this.$refs.tableWrapper.clientWidth + 'px'
    for (var i = 0; i < this.$refs.tableHead.children[0].children.length; i++) {
      this.$refs.stickyTableHead.children[0].children[i].style.width = this.$refs.tableHead.children[0].children[i].clientWidth + 'px'
      this.$refs.stickyBgTableHead.children[0].children[i].style.width = this.$refs.tableHead.children[0].children[i].clientWidth + 'px'
      // add background for hidden head
      this.$refs.stickyBgTableHead.children[0].children[i].style.color = '#fff'
      this.$refs.stickyBgTableHead.children[0].children[i].style.background = '#fff'
      
      var wrapperWidth = this.$refs.tableWrapper.clientWidth
      var thX = this.$refs.stickyTableHead.children[0].children[i].getBoundingClientRect().x
      var thWidth = this.$refs.stickyTableHead.children[0].children[i].clientWidth
      if (thX + thWidth > wrapperWidth) {
        this.$refs.stickyTableHead.children[0].children[i].style.visibility = 'hidden'
      } else {
        this.$refs.stickyTableHead.children[0].children[i].style.visibility = 'visible'
      }
    }
    this.$refs.stickyTableHead.style.display = 'none'
    this.$refs.stickyBgTableHead.style.display = 'none'
  },
  created () {
    // clone table head into table sticky head
    if (this.$slots['p-head']) {
      this.$slots['p-sticky-head'] = this.$slots['p-head']
      this.$slots['p-sticky-bg-head'] = this.$slots['p-head']
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.horizontalScroll)
    window.removeEventListener('scroll', this.verticalScroll)
    window.removeEventListener('resize', this.horizontalScroll)
    window.removeEventListener('resize', this.verticalScroll)
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
.table-bg-head-fixed {
  position: fixed;
  top: 0;
  z-index: 2;
}
.table-head-fixed {
  position: fixed;
  top: 0;
  z-index: 3;
}
tbody th {
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  left: 0;
  background: #fff;
}

</style>