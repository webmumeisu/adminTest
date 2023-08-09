<template>
  <div class="app-container">
    <!-- class="filter-container" -->
    基本页面{{ name }}
    <div @click="handleFnSon">点击我调用子组件方法getSonfn</div>
    <detail ref="child" :project-id="projectId" :sex-options="sexOptions" />
  </div>
</template>

<script>
import detail from '@/components/projectDetail/index'
export default {
  name: 'BasicPage',
  components: {
    detail
  },
  data() {
    return {
      baseURL: import.meta.env.VITE_APP_BASE_API,
      name: 'vue2',
      // 子组件传参
      projectId: '22335566',
      sexOptions: [
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getList() {
      console.log('getList')
    },
    handleFnSon() {
      this.$refs.child.getSonfn()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  // background-image: url('../assets/img/underline.png');
}
</style>

