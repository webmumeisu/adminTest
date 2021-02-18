<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="query.upStatus1" placeholder="自然村" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in upStatus1" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="query.upStatus2" placeholder="性别" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in upStatus2" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="query.upStatus3" placeholder="群众类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in upStatus3" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="query.name" placeholder="请输入姓名" style="width: 200px;" class="filter-item" />
      <el-input v-model="query.id_card" placeholder="请输入身份证号" style="width: 200px;" class="filter-item" />
      <el-input v-model="query.room_number" placeholder="请输入门牌号" style="width: 200px;" class="filter-item" />

      <el-button class="filter-item search" type="primary" icon="el-icon-search" @click="fetchData">
        查询
      </el-button>

      <el-table
        v-loading="listLoading"
        :data="tableList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="姓名" prop="name" :show-overflow-tooltip="true" min-width="60px" align="center">
          <!-- <template slot-scope="scope">
            <span class="name">{{ scope.row.title }}</span>
          </template> -->
        </el-table-column>
        <!-- <el-table-column label="身份证号" min-width="90px" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ addStar2(scope.row.id_card, '2') }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="年龄" prop="age" min-width="30px" align="center" />
        <el-table-column label="性别" prop="sex" min-width="30px" align="center" />
        <el-table-column label="民族" prop="nation" min-width="50px" align="center" />
        <el-table-column label="家庭关系" prop="home_relationship" min-width="50px" align="center" />
        <el-table-column label="家庭门牌号" prop="room_number" min-width="90px" align="center" :show-overflow-tooltip="true" />
        <el-table-column label="所在村小组" prop="village_group" min-width="90px" align="center" />
        <el-table-column label="困难" prop="difficulty" min-width="30px" align="center" />
        <el-table-column label="重疾" prop="serious_illness" min-width="30px" align="center" />
        <el-table-column label="健康码" min-width="50px" align="center" class="green">
          <template slot-scope="scope">
            <span class="green">{{ scope.row.health_code }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="绿色分" prop="health_score" min-width="60px" align="center" /> -->
      </el-table>

      <!-- <el-pagination
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="query.pageNum"
        :page-size.sync="query.pageSize"
        @current-change="fetchData(1)"
        @size-change="fetchData(2)"
      /> -->
      <pagination v-show="total>0" :total="total" :page.sync="query.pageNum" :limit.sync="query.pageSize" @pagination="fetchData" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
// import { getList } from '@/api/table'

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      tableList: [],
      query: {
        pageNum: 1,
        pageSize: 10
      },
      upStatus1: ['狮子石', '小畈里', '杨家坞', '黄金边', '石桥头', '黑风山', '金家坞', '梅树湾', '草鞋坞', '草厂里', '新昌里', '毛竹坞', '刘家塘', '小山头'],
      upStatus2: ['男', '女'],
      upStatus3: ['重疾', '困难']
    }
  },
  created() {
    const Data = new this.$AV.Query('xcjm')
    Data.count().then((res) => {
      this.total = res
    })
    const DataT = new this.$AV.Query('xcjm')
    DataT.limit(this.query.pageSize)
    // DataT.descending('startTime')
    DataT.find().then((pageTou) => {
      this.tableList = []
      pageTou.map((item, idnex) => {
        const attr = item.attributes
        this.tableList.push(attr)
        this.listLoading = false
      })
    })
  },
  methods: {
    // addStar2,
    fetchData(row) {
      const DataT = new this.$AV.Query('xcjm')
      if (this.query.name) {
        DataT.contains('name', this.query.name)
      }
      if (this.query.id_card) {
        DataT.contains('id_card', this.query.id_card)
      }
      if (this.query.room_number) {
        DataT.contains('room_number', this.query.room_number)
      }
      if (this.query.upStatus1) {
        DataT.contains('village_group', this.query.upStatus1)
      }
      if (this.query.upStatus2) {
        DataT.contains('sex', this.query.upStatus2)
      }
      if (this.query.upStatus3) {
        console.log(this.query.upStatus3)
        if (this.query.upStatus3 === '重疾') {
          DataT.contains('serious_illness', this.query.upStatus3)
        } else if (this.query.upStatus3 === '困难') {
          DataT.contains('difficulty', this.query.upStatus3)
        }
      }
      // 跳过第几条
      console.log(this.query.pageSize, this.pageNum, '跳过第')
      // const jup = this.query.pageNum * this.query.pageSize - 10
      // 限制返回条数

      // limit是获取多少条
      console.log('fym', row)
      DataT.skip((this.query.pageNum - 1) * this.query.pageSize)
      DataT.limit(this.query.pageSize)
      DataT.descending('startTime')
      DataT.find().then((pageTh) => {
        this.tableList = []
        pageTh.map((item, idnex) => {
          const attr = item.attributes
          this.tableList.push(attr)
        })
      })
      DataT.count().then((res) => {
        this.total = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .green{
    color: #008000;
  }
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

