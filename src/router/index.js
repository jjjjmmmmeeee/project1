import VueRouter from "vue-router";
import Vue from "vue";
import movie from "../components/movie.vue";
import TaskInformation from '../components/TaskInformation';
import movie1 from "../components/movie1.vue";
import App from "@/App.vue";
import Hello from "@/components/Hello.vue";
import Login from "@/components/Login.vue";
Vue.use(VueRouter)

const router =new VueRouter({
    routes:[
        {path:'/',component: Login},
        {path:'/TaskIfo',component: TaskInformation},
        {path:'/Hello',component: Hello},
        {path:'/availableTask',component: movie}
    ]
})
export default router