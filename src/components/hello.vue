<template>
  <div class="hello">
    <ul>
      <li><a href="login.html" target="_blank">【打开本地其他页面】登录页面</a></li>
      <li><a href="https://www.matougr.com" target="_blank">【打开外部链接】码头工人在线工具</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'VUE多页面脚手架_这是组件里面的内容'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>