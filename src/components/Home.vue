<template>
    <div>
        <div class="daohang">
            <h1 :class="{ active: currentTab === 'shouye' }" @click="selectTab('shouye')">首页</h1>
            <h1 :class="{ active: currentTab === 'publish' }" @click="selectTab('publish')">接单/发布</h1>
            <h1 :class="{ active: currentTab === 'community' }" @click="selectTab('community')">社区中心</h1>
            <h1 :class="{ active: currentTab === 'mine' }" @click="selectTab('mine')">我的</h1>
        </div>
        
        <!-- 根据 currentTab 动态显示对应的组件 -->
        <component :is="currentTabComponent"></component>
    </div>
</template>

<style scoped>
.daohang {
    display: flex;
    justify-content: space-between;
    border: 2px red solid;
    padding: 10px;
}
.daohang h1 {
    margin: 0 20px;
    font-size: 20px;
    cursor: pointer;
}

.daohang h1.active {
    color: rgb(255, 191, 0); /* 选中状态的颜色 */
}
</style>

<script>
// 导入各个页面的组件
import shouye from './shouye.vue';
import publish from './publish.vue';
import community from './community.vue';
import mine from './mine.vue';

export default {
  components: { shouye, publish, community, mine },
  data() {
    return {
      currentTab: 'shouye' // 默认选中首页
    };
  },
  computed: {
    // 动态返回当前选中的组件
    currentTabComponent() {
      
      console.log(this.currentTab)
      return this.currentTab;
    }
  },
  methods: {
    selectTab(tab) {
      this.currentTab = tab;
    }
  }
};
</script>
