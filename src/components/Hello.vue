<template>
    <div style="border: 1px solid black;">
         <h1>{{title}}</h1>
         <span>{{publisher}}</span>
         <button @click="fun">点击查看详情</button>
    </div>
</template>
<script>
export default {
    name:"Task",
    props:["title","publisher"],
    data:function(){
        return {
            
        }
    },
    created:function(){
        console.log("Hello组件被创建了")
    },
    methods:{
        fun(){
            alert("当前还未实现")
        }
    }
}
</script>
<style>
    
</style>