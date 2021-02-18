<template>
  <div class="app-container">
    <!-- 老幼关怀 -->
    <div class="filter-container">
      <el-select v-model="query.upStatus1" placeholder="自然村" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in upStatus1" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="query.upStatus2" placeholder="类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in upStatus2" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="query.upStatus3" placeholder="性别" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in upStatus3" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="query.name" placeholder="请输入姓名" style="width: 200px;" class="filter-item" />
      <el-input v-model="query.id_card" placeholder="请输入身份证号" style="width: 200px;" class="filter-item" />
      <el-input v-model="query.room_number" placeholder="请输入门牌号" style="width: 200px;" class="filter-item" />

      <el-button class="filter-item search" type="primary" icon="el-icon-search" @click="search">
        查询
      </el-button>
    </div>

    <!--table-->
    <el-table
      v-loading="listLoading"
      :data="tableList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="姓名" prop="name" :show-overflow-tooltip="true" min-width="60px" align="center" />
      <el-table-column label="身份证号" min-width="90px" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ addStar2(scope.row.id_card, '2') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="age" min-width="30px" align="center" />
      <el-table-column label="性别" prop="sex" min-width="30px" align="center" />
      <el-table-column label="民族" prop="nation" min-width="30px" align="center" />
      <el-table-column label="家庭门牌" prop="room_number" min-width="90px" align="center" />
      <el-table-column label="所在村小组" prop="village_group" min-width="90px" align="center" />
      <el-table-column label="困难" prop="difficulty" min-width="30px" align="center" />
      <el-table-column label="重疾" prop="serious_illness" min-width="30px" align="center" />
    </el-table>

    <el-pagination
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page.sync="query.pageNum"
      :page-size.sync="query.pageSize"
      @current-change="fetchData(1)"
      @size-change="fetchData(2)"
    />
  </div>
</template>

<script>
import { dateFormat, addStar2 } from '@/utils/util'

export default {
  data() {
    return {
      total: 0,
      tableList: [],
      listLoading: false,
      query: {
        pageNum: 1,
        pageSize: 10
      },
      upStatus1: ['狮子石', '小畈里', '杨家坞', '黄金边', '石桥头', '黑风山', '金家坞', '梅树湾', '草鞋坞', '草厂里', '新昌里', '毛竹坞', '刘家塘', '小山头'],
      upStatus2: ['老人', '小孩'],
      upStatus3: ['女', '男'],
      upStatus: [{
        id: 0,
        title: '已过期'
      },
      {
        id: 1,
        title: '进行中'
      }]

    }
  },
  created() {
    console.log(dateFormat(new Date(), 'yyyy-MM-dd'))
    const Data1 = new this.$AV.Query('xcjm')
    Data1.count().then((res) => {
      this.total = res
    })
    Data1.lessThanOrEqualTo('age', 6)
    const Data2 = new this.$AV.Query('xcjm')
    Data2.greaterThanOrEqualTo('age', 75)
    const Data = this.$AV.Query.or(Data1, Data2)
    Data.limit(this.query.pageSize)
    Data.find().then((toup) => {
      // console.log('toup', toup)
      toup.map((item, index) => {
        const attr = item.attributes
        this.tableList.push(attr)
      })
    })
  },
  methods: {
    addStar2,
    fetchData(row) {
      console.log(row)
      console.log(this.query.pageSize)
      if (row === 2) {
        const Data1 = new this.$AV.Query('xcjm')
        Data1.lessThanOrEqualTo('age', 6)
        const Data2 = new this.$AV.Query('xcjm')
        Data2.greaterThanOrEqualTo('age', 75)
        const Data = this.$AV.Query.or(Data1, Data2)
        Data.limit(this.query.pageSize)
        Data.descending('startTime')
        Data.find().then((pageTou) => {
          pageTou.map((item, idnex) => {
            const attr = item.attributes
            this.tableList.push(attr)
          })
        })
      } else {
        console.log('tiaoguo')
        const Data1 = new this.$AV.Query('xcjm')
        Data1.lessThanOrEqualTo('age', 6)
        const Data2 = new this.$AV.Query('xcjm')
        Data2.greaterThanOrEqualTo('age', 75)
        const Data = this.$AV.Query.or(Data1, Data2)
        // 跳过第几条
        console.log(this.query.pageSize, this.pageNum, '跳过第')
        const jup = this.query.pageNum * this.query.pageSize - 10
        Data.skip(jup)
        Data.limit(10)
        Data.descending('startTime')
        Data.find().then((pageTh) => {
          this.tableList = []
          pageTh.map((item, idnex) => {
            const attr = item.attributes
            this.tableList.push(attr)
          })
          console.log('jg', this.tableList)
        })
      }
    },
    search() {
      // 查找创建时间范围
      const Data1 = new this.$AV.Query('xcjm')
      Data1.lessThanOrEqualTo('age', 6)
      const Data2 = new this.$AV.Query('xcjm')
      Data2.greaterThanOrEqualTo('age', 75)
      const Data = this.$AV.Query.or(Data1, Data2)
      // const query = new this.$AV.Query('xcjm')
      if (this.query.name) {
        Data.contains('name', this.query.name)
      }
      if (this.query.room_number) {
        Data.contains('room_number', this.query.room_number)
      }
      if (this.query.id_card) {
        Data.contains('id_card', this.query.id_card)
      }
      if (this.query.upStatus1) {
        Data.contains('village_group', this.query.upStatus1)
      }
      if (this.query.upStatus2) {
        if (this.query.upStatus2 === '老人') {
          Data.greaterThanOrEqualTo('age', 75)
        } else {
          Data.lessThanOrEqualTo('age', 6)
        }
      }
      if (this.query.upStatus3) {
        Data.contains('sex', this.query.upStatus3)
      }

      Data.limit(this.query.pageSize)
      Data.descending('startTime')
      Data.find().then((pageTou) => {
        this.tableList = []
        pageTou.map((item, idnex) => {
          const attr = item.attributes
          this.tableList.push(attr)
        })
      })
      Data.count().then((res) => {
        this.total = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-container{
    .search{
      background: $search-btn-bg;
      border-color: $search-btn-bg;
    }
    .download{
      background: $download-btn-bg;
      border-color: $download-btn-bg;
    }
  }
  .face-img{
    width: 100%;
    cursor: pointer;
  }
  .name{
    cursor: pointer;
    color: $theme-color;
  }
  .tag{
    background: #FF9900;
    color: #fff;
    padding: 2px 5px;
    border-radius: 3px;
    margin-bottom: 3px;
  }
</style>
