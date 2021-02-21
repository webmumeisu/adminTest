<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import { baseCountByDate } from '@/api/dp'

const dataList = [
  {
    name: '打卡人数',
    id: 'patrolList',
    color: '#26B5FF'
  }, {
    name: '爆料人数',
    id: 'tipOffList',
    color: '#26E3FF'
  }, {
    name: '竞答人数',
    id: 'quizList',
    color: '#26FF91'
  }, {
    name: '阅读人数',
    id: 'readList',
    color: '#EDFF26'
  }, {
    name: '点赞人数',
    id: 'gttList',
    color: '#FF266E'
  }, {
    name: '分享人数',
    id: 'shareList',
    color: '#FF5926'
  }
]

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    baseCountByDate({
      ptype: 'person',
      days: 15
    }).then(({ body }) => {
      this.initChart(body)
    })
  },
  methods: {
    initChart(data) {
      dataList.map(item => {
        item.type = 'line'
        // item.areaStyle = {}
        item.symbol = 'none'
        item.itemStyle = {
          color: item.color
        }
        item.data = data[item.id]
      })
      const xaxis = []
      data.dateList.map(item => {
        const split = item.split('-')
        xaxis.push(parseInt(split[1]) + '.' + parseInt(split[2]))
      })
      this.chart = echarts.init(this.$el)

      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '50',
          right: '50'
        },
        title: {
          text: '近15天爆料, 打卡, 竞答, 巡防人数',
          left: 'left',
          top: '10',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          icon: 'circle',
          left: 'center',
          bottom: '10',
          textStyle: {
            color: '#fff'
          },
          data: ['打卡人数', '爆料人数', '竞答人数', '阅读人数', '点赞人数', '分享人数']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            axisLabel: {
              color: '#fff'
            },
            data: xaxis
          }
        ],
        yAxis: [
          {
            axisTick: { show: false },
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              lineStyle: {
                color: '#203743'
              }
            },
            type: 'value'
          }
        ],
        series: dataList
      })
    }
  }
}
</script>
