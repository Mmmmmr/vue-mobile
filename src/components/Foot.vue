<template>
  <div class="bottom-nav">
    <ul>
      <li v-for="(list, index) in navConfig" :key="index" @click="toggleActive(index)">
        <a :href="list.href">
          <icon :name="list.icon" class="icon" :class="{active: index===current}"></icon>
          <div :class="{active: index===current}">{{list.name}}</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "./Icon";
import { parse } from "path";
export default {
  name: "Foot",
  data() {
    return {
      navConfig: [
        { name: "商城", icon: "home", href: "index.html" },
        { name: "分类", icon: "category", href: "category.html" },
        { name: "购物车", icon: "cart", href: "#" },
        { name: "我", icon: "user", href: "#" }
      ],
      current: parseInt(localStorage.getItem("current")) || 0
    };
  },
  methods: {
    toggleActive(index) {
      localStorage.setItem("current", index);
    }
  },
  components: {
    Icon
  },
  mounted() {
    localStorage.setItem("current", 0);
  }
};
</script>


<style scoped>
.bottom-nav {
  position: fixed;
  left: 0;
  z-index: 9999;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 2px solid #e5e5e5;
  background-color: #fff;
}
.bottom-nav ul {
  display: flex;
  height: 100%;
}
.bottom-nav ul li {
  flex-basis: 25%;
}
.bottom-nav ul li a {
  display: block;
  height: 100%;
  text-decoration: none;
  color: #666;
  font-size: 10px;
  padding-top: 8px;
  text-align: center;
}

.bottom-nav ul li a .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: auto;
  margin-bottom: 4px;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.bottom-nav ul li a .active {
  color: red;
}
</style>
