import Vue from 'vue'
import Router from 'vue-router'
import Foot from '../../components/Foot.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        Foot
      }
    }
  ]
})
