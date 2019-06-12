<template>
  <div class="bottom-nav">
    <ul>
      <li>
        <a href="#">
          <icon name="home" class="icon"></icon>
          <div>有赞</div>
        </a>
      </li>
      <li>
        <a href="#">
          <icon name="category" class="icon"></icon>
          <div>分类</div>
        </a>
      </li>
      <li>
        <a href="#">
          <icon name="cart" class="icon"></icon>
          <div>购物车</div>
        </a>
      </li>
      <li>
        <a href="#">
          <icon name="user" class="icon"></icon>
          <div>我</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "./Icon";
export default {
  components: {
    Icon
  }
};
</script>


<style scoped>
.bottom-nav {
  position: fixed;
  left: 0;
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
</style>
