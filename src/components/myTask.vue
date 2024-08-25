<template>
    <h1>我的任务</h1>
</template>
<style></style>
<script>
import axios from 'axios';
import { Header } from 'element-ui';

export default {
    methods: {
        gettasks() {
            setTimeout(
                () => {
                    const jwt = localStorage.getItem('cqu-project-jwt')
                    console.log('[myTask组件]' + '获取到的jwt为' + jwt)
                    const config = { headers: { 'Authorization': jwt } }

                    axios.post("/myPublishingTask/un-taken", this.MyTaskDTO, config)
                        .then((res) => {
                            console.log(res);

                        })
                        .catch((error) => {
                            console.error("请求失败:", error);
                        })

                }, 500);
        }
    },
    created() {
        this.gettasks();
    },
    data() {
        return {
            MyTaskDTO: {
                page: 1,
                sortRule: "exp",
                isDesc: true,
                keyword: ""
            }
        };
    },
}
</script>