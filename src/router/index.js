import VueRouter from "vue-router";
import Vue from "vue";
import movie from "../components/movie.vue";
import TaskInformation from '../components/TaskInformation';
import movie1 from "../components/movie1.vue";
import App from "@/App.vue";
import Login from "@/components/Login.vue";
import MyTask from "@/components/myTask.vue";
import Perinf from "@/components/perinf.vue";
import CreateTask from "@/components/createTask.vue";
import taskDetailUnTaken from "@/components/taskDetailUnTaken.vue";
import Home from "@/components/Home.vue";
import TaskDetailIncomplete from "@/components/taskDetailIncomplete.vue";
import TaskDetailComplete from "@/components/taskDetailComplete.vue";
import TaskDetailTimeout from "@/components/taskDetailTimeout.vue";
import TaskDetailuncomfirmed from "@/components/taskDetailuncomfirmed.vue";
import MyTakingtask from "@/components/myTakingtask.vue";
Vue.use(VueRouter)

const router =new VueRouter({
    routes:[
        {path:'/',component: Login},
        {path:'/Home',component:Home},
        {path:'/TaskIfo',component: TaskInformation},
        {path:'/availableTask',component: movie},
        {path:'/mytask',component:MyTask},
        {path:'/perinf',component:Perinf},
        {path:'/createTask',component:CreateTask},
        {path:'/taskDetailUnTaken',component:taskDetailUnTaken},
        {path:'/taskDetailIncomplete',component:TaskDetailIncomplete},
        {path:'/taskDetailComplete',component:TaskDetailComplete},
        {path:'/taskDetailTimeout',component:TaskDetailTimeout},
        {path:'/taskDetailunconfirmed',component:TaskDetailuncomfirmed},
        {path:'/myTakingtask',component:MyTakingtask},
        {path:'/TaskInformation',component:TaskInformation},
        



    ]
})
export default router