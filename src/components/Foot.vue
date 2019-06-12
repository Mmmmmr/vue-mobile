<template>
  <div class="bottom-nav">
    <ul>
      <li>
        <icon name="home"></icon>
        <div>有赞</div>
      </li>
      <li>
        <icon name="category"></icon>
        <div>分类</div>
      </li>
      <li>
        <icon name="cart"></icon>
        <div>购物车</div>
      </li>
      <li>
        <icon name="user"></icon>
        <div>我</div>
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
  display: flex;
}
</style>
