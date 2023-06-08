<template>
  <div id="printTest" class="header">
    <div class="top">
      <img v-print="'#printTest'" src="@/assets/print.png" alt="" class="dy">
      <p>编号：HZ20200303152913</p>
    </div>
    <div class="center">
      <!-- 接口未完成 -->
      <h4 @click="dayin">杭州市居住证积分申请受理回执（2020）</h4>
      <p>积分申请人：{{ name }}，身份证号：{{ idcard }}，居住证号： <br /> {{ jzcard }}，手机号码：
        {{ phone }}，于{{ year }} 年 {{ month }} 月 {{ day }} 日通过 杭州市西湖区派出所（受理窗口名称或“微信公众号”）提出积分申请并确认提交了下列材料：
      </p>
      <!-- <el-table
        :data="tableData"
        border
        fit
        highlight-current-row
        width="100%"
      >
        <el-table-column type="index" label="编号" width="80" />
        <el-table-column min-width="527" prop="indicProve" label="已收材料（对应积分指标项）" />
      </el-table> -->
      <p style="margin-top: 20px"></p>
      <table border="1">
        <tr>
          <td class="table-text w80">编号</td>
          <td class="table-text">已收材料（对应积分指标项）</td>
        </tr>
        <tr v-for="(item, index) in tableData" :key="index">
          <td class="table-text w80">{{ index + 1 }}</td>
          <!-- <td class="table-text">{{ item.indicName }}</td> -->
          <td class="table-text">{{ item.indicProve }}</td>
        </tr>
      </table>
      <div class="explain">
        <p>说明：</p>
        <p>1.“手机号码”用于积分结果短信通知等，请当面核对无误，确保真实有效。</p>
        <p>2.详细积分情况以本年度积分应用公示前的最终核定结果为准。</p>
        <p>3.积分申请受理20个工作日后，申请人可以通过“新杭州人家园”微信公众号或者持个人 </p>
        <p>有效身份证件至居住地积分受理窗口查询本人积分情况。</p>
        <p>4.如对积分有异议，应在获得积分的7个工作日内向区级积分管理部门提出异议申请。</p>
      </div>
      <p class="line"></p>
      <div class="botton">
        <p>
          积分申请人：_________，身份证号：_________________，居住证号： _________________，手机号码:
          ______________，于 ______ 年 __ 月 __ 日通过 _________________（受理窗口名称或“微信公众号”）提出积 <br />
          分申请,确认个人信息及积分材料无误，并领取了受理回执。
        </p>
        <p>
          <span>申请人确认签名: </span>
          <span class="date"> 日期：</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style media="print" scoped>
@page {
  size: 240mm 300mm;
  margin: 20px auto;
}
td {
  border: 1px solid #EBEEF5;
}

</style>

<style lang="scss" scoped>

.noprint{visibility:hidden}
body {margin: 0}
.w80 {
  width: 100px;
  // padding-left: 20px;
}
table {
  width: 100%;
  max-width: 1175px;
  border-collapse: collapse;
  color: #78797c;
}
td {
  border: 1px solid #EBEEF5;
  text-align: center;
  padding: 6px;
}
.table-text {
  text-align: left;
  // text-indent: 2em;
  padding-left: 9px;
}

.header{
  width:650px;
  // height: auto;
  border: 1px solid #000;
  margin: 0 auto;
  margin-top: 20px;
}
.top {
  margin: 20px;
  & .dy{
    cursor: pointer;
  }
  & p {
    float: right;
    margin-top: 0;
  }
}
.center {
  margin: 20px;
  & h4 {
    text-align: center;
  }
  & p {
    text-indent: 2em;
    line-height: 30px;
    font-size: 18px;
  }
}
.explain {

  & p {
    text-indent: 0;
    line-height: 20px;
    font-size: 13px;
  }
  & p:nth-child(5) {
    text-indent: 0.8em;
    line-height: 7px;
    margin-top: -4px;
  }
}
.line {
  border-top: 5px dashed #000;
}
.botton {
  margin-top: 20px;
  & p:first-child {
    text-indent: 2em;
    line-height: 30px;
    font-size: 17px;
  }
}
.date {
  display: inline-block;
  margin-left: 125px;
}
td {
  // border: 1px solid #EBEEF5;
  border: 1px solid #EBEEF5;
}
/*去除页眉页脚*/
  @page{
    size:  auto;   /* auto is the initial value */
    margin: 3mm;  /* this affects the margin in the printer settings */
  }
  html{
    background-color: #FFFFFF;
    margin: 0;  /* this affects the margin on the html before sending to printer */
  }
  body{
    border: solid 1px blue ;
    margin: 10mm 15mm 10mm 15mm; /* margin you want for the content */
  }
</style>

<script>
import Vue from 'vue'
import Print from 'vue-print-nb'
// import { jjzId, getQingDan } from '@/api/applylist'

Vue.use(Print)

export default {
  data() {
    return {
      tableData: [],
      name: '',
      idcard: '',
      phone: '',
      jzcard: '',
      applyId: '',
      year: '',
      month: '',
      day: ''
    }
  },
  created() {
    this.name = this.$route.query.name
    this.idcard = this.$route.query.idcard
    this.phone = this.$route.query.phone
    this.applyId = this.$route.query.applyId
    this.getRaday()
    this.getList()
    // getQingDan({ type: 0, applyId: this.applyId }).then(res => {
    //   this.tableData = res.body
    // })
  },
  methods: {
    dayin() {
      // window.print()
      // const jubuData = document.getElementById('printTest').innerHTML
      // const jubuData2 = document.getElementById('app').innerHTML

      // window.document.body.innerHTML = jubuData
      // window.print()
      // window.document.body.innerHTML = jubuData2
    },
    printing() {
      // const bdhtml = window.document.body.innerHTML
      const content = document.getElementsByClassName('header')[0].innerHTML
      document.body.innerHTML = content
      window.print(content)
    },
    // getList() {
    //   jjzId({ sfzh: this.idcard }).then(res => {
    //     this.jzcard = res.body[0].zjbh
    //   })
    //   getQingDan({ type: 0, applyId: this.applyId }).then(res => {
    //     console.log(res)
    //   })
    // },
    getRaday() {
      // 获得本地时间
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      this.year = year
      this.month = month
      this.day = day
    }
  }
}

</script>
