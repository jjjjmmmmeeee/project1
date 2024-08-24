<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/title.png" width=100%>
    <div>
    </div>
    <movie></movie>
  </div>
  <!-- <Login></Login> -->
  
</template>

<script>
import Hello from './components/Hello.vue'
import movie from './components/movie.vue'
import axios from 'axios'
import Login from './components/Login.vue'
export default {
  name: 'App',
  data:function(){
      return {
        tasks:[
          {id:1,title:"任务一",publisher:"发布者1"},
          {id:2,title:"任务二",publisher:"发布者2"},
          {id:3,title:"任务三",publisher:"发布者3"},
          {id:4,title:"任务四",publisher:"发布者4"},
        ]
      }
  },
  methods:{
   
  },
  mounted:function(){
    console.log("App组件被挂载")
  },
  components: {
    Hello,movie,
    Login
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
