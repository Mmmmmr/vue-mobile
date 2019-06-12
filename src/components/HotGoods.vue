<template>
  <div class="wrapper">
    <ul
      class="hot-goods"
      v-infinite-scroll="getLists"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="20"
    >
      <li v-for="list in lists" :key="list.id">
        <a href="#">
          <img :src="list.img">
          <div class="detail">
            <div class="title">{{ list.name }}</div>
            <div class="price">￥{{ list.price }}</div>
          </div>
        </a>
      </li>
    </ul>
    <div id="allLoad" v-if="allLoad"></div>
  </div>
</template>

<script>
import axios from "axios";
import { InfiniteScroll } from "mint-ui";
export default {
  data() {
    return {
      lists: null,
      pageNum: 1,
      pageSize: 6,
      loading: true,
      allLoad: false
    };
  },
  methods: {
    getLists() {
      if (this.allLoad) {
        return;
      }
      this.loading = true;
      axios
        .get("http://rap2api.taobao.org/app/mock/7058/index/hotLists", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          let curList = res.data.lists;
          if (curList.length < this.pageNum) {
            this.allLoad = false;
          }
          if (this.lists) {
            this.lists = this.lists.concat(curList);
          } else {
            this.lists = res.data.lists;
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.loading = false;
      this.pageNum++;
    }
  },
  mounted() {
    this.getLists();
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  background-color: #eee;
}
.wrapper .hot-goods {
  display: flex;
  flex-wrap: wrap;
}
.wrapper .hot-goods li {
  flex-basis: 48%;
  background-color: #fff;
  margin: 1%;
  border-radius: 3%;
  overflow: hidden;
}
.wrapper .hot-goods a {
  text-decoration: none;
}
.wrapper .hot-goods a img {
  width: 100%;
}
.wrapper .hot-goods a .detail {
  margin-left: 4px;
}
.wrapper .hot-goods a .detail .title {
  color: #666;
  font-size: 14px;
  line-height: 18px;
  padding: 2px 0;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
.wrapper .hot-goods a .detail .price {
  color: #666;
  font-size: 14px;
  line-height: 14px;
  padding: 2px 0;
}
#allLoad {
  height: 50px;
}
</style>

