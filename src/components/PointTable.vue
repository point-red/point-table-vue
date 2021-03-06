<template>
<div>
  <div class="columns" v-if="data">
    <div class="column is-one-quarter" v-if="!hideSearch">
      <input class="input" type="text" placeholder="Search" @keyup="filterSearch" v-model="searchText">
    </div>
  </div>
  <div ref="tableWrapper" class="table-wrapper" @scroll="horizontalScroll">
    <div ref="loadingBlock" class="loading-block" v-show="isLoading">
      <p class="text-center" style="text-align:center;margin:15px 0">
        Loading...
      </p>
    </div>
    <table ref="mainTable" class="table">
      <thead ref="tableHead">
        <slot name="p-head">
          <tr v-if="computedColumns">
            <template v-for="(key, index) in computedColumns">
              <th :key="index">{{ key }}</th>
            </template>
          </tr>
        </slot>
      </thead>
      <thead ref="stickyTableHead" class="table-head-fixed">
        <slot name="p-sticky-head">
          <tr v-if="computedColumns">
            <template v-for="(key, index) in computedColumns">
              <th :key="index">{{ key }}</th>
            </template>
          </tr>
        </slot>
      </thead>
      <thead ref="stickyBgTableHead" class="table-bg-head-fixed">
        <slot name="p-sticky-bg-head">
          <tr v-if="computedColumns">
            <template v-for="(key, index) in computedColumns">
              <th :key="index">{{ key }}</th>
            </template>
          </tr>
        </slot>
      </thead>
      <tbody ref="tableBody">
        <slot name="p-body">
          <tr v-for="(data, indexData) in computedData" :key="indexData">
            <template v-for="(key, indexKey) in Object.keys(data)">
              <th :key="indexKey" v-if="indexKey == 0">{{ data[key] }}</th>
              <td :key="indexKey" v-else>{{ data[key] }}</td>
            </template>
          </tr>
        </slot>
      </tbody>
    </table>    
    <div ref="anchorBottom"></div>  
  </div>
  <hr/>  
  <div class="pagination is-centered" v-if="pageCount > 1 && mutableBody">
    <a class="pagination-previous" @click="paginatePrev" :disabled="page == 1">Prev</a>
    <a class="pagination-next" @click="paginateNext" :disabled="page == pageCount">Next</a>
    <ul class="pagination-list">
      <template v-for="(n, index) in pageCount">
      <li :key="index" v-if="showPageNumber(n)">
        <a @click="paginateNumber(n)" class="pagination-link" :class="{'is-current': page == n}">{{n}}</a>
      </li>
      </template>
    </ul>
  </div>
</div>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  name: 'PointTable',
  props: {
    data: {
      type: Array
    },
    columns: {
      type: Object
    },
    limit: {
      type: Number,
      default: 10
    },
    hideSearch: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      anchorTop: 0,
      anchorBottom: 0,
      mutableBody: this.data,
      filteredData: this.data,
      page: 1,
      searchText: ''
    }
  },
  computed: {
    showHeaderFixed () {
      if (this.anchorTop <= 0 && this.anchorBottom >= 0) {
        return true
      } else {
        return false
      }
    },
    computedColumns () {
      if (this.columns != undefined) {
        return Object.values(this.columns)
      } else if (this.mutableBody) {
        return Object.keys(this.mutableBody[0])
      } else {
        return
      }
    },
    computedData () {
      // filtered data
      if (this.filteredData) {
        return this.filteredData.slice((this.limit * this.page) - this.limit, this.limit * this.page)
      }
    },
    pageCount () {
      if (this.filteredData) {
        return Math.ceil(this.filteredData.length / this.limit)
      }
    }
  },
  watch: {
    computedData: function (val) {
      this.$emit('filtered', val)
    },
    data: function (val) {
      this.mutableBody = this.data
    }
  },
  methods: {
    init () {
      this.$refs.loadingBlock.style.width = this.$refs.tableWrapper.clientWidth + 'px'
      this.$refs.loadingBlock.style.height = this.$refs.tableWrapper.clientHeight + 'px'
      this.$refs.stickyTableHead.style.width = this.$refs.mainTable.clientWidth + 'px'
      this.$refs.stickyBgTableHead.style.width = this.$refs.tableWrapper.clientWidth + 'px'
      for (var i = 0; i < this.$refs.tableHead.children.length; i++) {
        for (var j = 0; j < this.$refs.tableHead.children[i].children.length; j++) {
          this.$refs.stickyTableHead.children[i].children[j].style.width = this.$refs.tableHead.children[i].children[j].clientWidth + 'px'
          this.$refs.stickyBgTableHead.children[i].children[j].style.width = this.$refs.tableHead.children[i].children[j].clientWidth + 'px'
          // add background for hidden head
          this.$refs.stickyBgTableHead.children[i].children[j].style.color = '#fff'
          this.$refs.stickyBgTableHead.children[i].children[j].style.background = '#fff'
          
          var wrapperWidth = this.$refs.tableWrapper.clientWidth
          var thX = this.$refs.stickyTableHead.children[i].children[j].getBoundingClientRect().x
          var thWidth = this.$refs.stickyTableHead.children[i].children[j].clientWidth
          if (thX + thWidth > wrapperWidth) {
            this.$refs.stickyTableHead.children[i].children[j].style.visibility = 'hidden'
          } else {
            this.$refs.stickyTableHead.children[i].children[j].style.visibility = 'visible'
          }
        }
      }      
      this.$refs.stickyTableHead.style.display = 'none'
      this.$refs.stickyBgTableHead.style.display = 'none'
    },
    horizontalScroll () {      
      if (this.showHeaderFixed) {
        // sync sticky table head with original table head
        this.$refs.stickyTableHead.style.left = this.$refs.mainTable.getBoundingClientRect().x + 'px'
        if (this.$refs.tableBody.children.length) {
          var bodyX = this.$refs.tableBody.children[0].children[0].getBoundingClientRect().x
          var wrapperX = this.$refs.tableWrapper.getBoundingClientRect().x
          var wrapperWidth = this.$refs.tableWrapper.clientWidth
          // remove fixed head that out of table area
          for (var i = 0; i < this.$refs.stickyTableHead.children.length; i++) {
            for (var j = 0; j < this.$refs.stickyTableHead.children[i].children.length; j++) {
              var thX = this.$refs.stickyTableHead.children[i].children[j].getBoundingClientRect().x
              var thWidth = this.$refs.stickyTableHead.children[i].children[j].clientWidth
              if (j > 0) {
                // hide column if outside wrapper width
                if (thX <= bodyX || thX + thWidth >= wrapperWidth + wrapperX + 1) {
                  this.$refs.stickyTableHead.children[i].children[j].style.visibility = 'hidden'
                } else {
                  this.$refs.stickyTableHead.children[i].children[j].style.visibility = 'visible'
                }
              } else {
                // freeze column always visible
                this.$refs.stickyTableHead.children[i].children[j].style.visibility = 'visible'
              }
            }
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
    },
    paginatePrev () {
      if (this.page > 1) {
        this.page -= 1
        this.init()
      }
    },
    paginateNext () {
      if (this.page < this.pageCount) {
        this.page += 1
        this.init()
      }
    },
    paginateNumber (n) {
      this.page = n
      this.init()
    },
    showPageNumber(n) {
      // first three number
      if (n <= 5 && this.page <= 3) {
        return true
      }
      // between first three number and last three number
      if (this.page >= 3 && n > this.page - 3 && n < this.page + 3) {
        return true
      }
      // last three number
      if (n > this.pageCount - 5 && this.page > this.pageCount - 3) {
        return true
      }

      return false
    },
    filterSearch: debounce (function () {
      this.filteredData = this.mutableBody.filter((obj) => {
        let result = false
        for (let key in obj) {        
          let value = obj[key] + ''
          if (value.toLowerCase().match('.*' + this.searchText.toLowerCase() + '.*')) {
            result = true
            break
          }
        }

        return result
      })
      this.page = 1
    }, 200)
  },
  mounted () {
    window.addEventListener('scroll', this.init)
    window.addEventListener('scroll', this.verticalScroll)
    window.addEventListener('scroll', this.horizontalScroll)
    window.addEventListener('resize', this.init)
    window.addEventListener('resize', this.verticalScroll)
    window.addEventListener('resize', this.horizontalScroll)    

    this.init()
  },
  created () {
    // clone table head into table sticky head
    this.$slots['p-sticky-head'] = this.$slots['p-head']
    this.$slots['p-sticky-bg-head'] = this.$slots['p-head']    
    // set default filtered data    
    this.$emit('filtered', this.computedData)    
  },
  updated () {
    // reinitiate table sticky head
    this.$refs.stickyTableHead.innerHTML = this.$refs.tableHead.innerHTML
    this.$refs.stickyBgTableHead.innerHTML = this.$refs.tableHead.innerHTML
    this.init()
  },
  destroyed () {
    window.removeEventListener('scroll', this.init)
    window.removeEventListener('scroll', this.horizontalScroll)
    window.removeEventListener('scroll', this.verticalScroll)
    window.removeEventListener('resize', this.init)
    window.removeEventListener('resize', this.horizontalScroll)
    window.removeEventListener('resize', this.verticalScroll)
  }
}
</script>

<style scoped>
.table-wrapper {
  overflow: auto;
  z-index: 1;
}
tr, td, th {
  padding: 5px;
}
thead th {
  z-index: -1;
  background: #fff;
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
.loading-block {
  position:absolute;
  background: #040404DD;
  z-index:5;
  color: #eee;
}
</style>