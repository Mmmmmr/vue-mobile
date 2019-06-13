import Vue from "vue";
import Router from "vue-router";
import Foot from "../../components/Foot.vue";
import HotGoods from "../../components/HotGoods.vue";
import Swipe from "../../components/Swipe.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        Foot,
        HotGoods,
        Swipe
      }
    }
  ]
});
