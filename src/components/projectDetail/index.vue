<template>
  <div class="app-container">
    我是子组件
    <h3>获取父组件传参</h3>
    <div>projectId： {{ projectId }}</div>
    <div>sexOptions: {{ sexOptions }}</div>
  </div>
</template>

<script>
export default {
  name: 'BasicPage',
  components: {},
  props: {
    projectId: {
      type: String,
      default: ''
    },
    sexOptions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      name: 'vue2',
      baseURL: import.meta.env.VITE_APP_BASE_API
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
    getSonfn() {
      console.log('父组件调用了子的方法')
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

