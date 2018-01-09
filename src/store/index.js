import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
  addDialog: false,
  currentPath: [
    {
      title: '首页',
      path: '/',
      name: 'Home'
    }
  ],
  pageOpenedListNum: 0,
  pageOpenedList: [
    {
      title: '首页',
      path: '/',
      name: 'Home'
    }
  ],
  messageCount: 0,
};

const mutations = {
  showAddDialog(state, arg) {
    state.addDialog = arg;
  },
  addPageOpenedList (state, get) {
    let bool = false;
    state.pageOpenedList.filter(function(item){
      if(item.name === get.name){
        bool = true;
      }
    });
    if(!bool){
      state.pageOpenedListNum++;
      state.pageOpenedList.splice(state.pageOpenedListNum, 1, get);
    }
  },
  removePageOpenedList(state, item) {
    state.pageOpenedList.splice(item, 1);
  },
  setMessageCount (state, count) {
    state.messageCount = count;
  },
};

export default new Vuex.Store({
  state,mutations
})

