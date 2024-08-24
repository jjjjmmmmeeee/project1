import VueRouter from "vue-router";
import Vue from "vue";
import movie from "../components/movie.vue";
import TaskInformation from '../components/TaskInformation';
import movie1 from "../components/movie1.vue";
Vue.use(VueRouter)

const router =new VueRouter({
    routes:[
        {
            path:'/movie1',
            name:'Movie1',
            component:movie1
        }
    ]
})
export default router