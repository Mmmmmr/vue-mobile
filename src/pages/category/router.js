import Vue from "vue";
import Router from "vue-router";
import Foot from "../../components/Foot";
import TopList from "../../components/TopList";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        Foot,
        TopList
      }
    }
  ]
});
