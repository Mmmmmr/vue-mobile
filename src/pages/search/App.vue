<template>
  <div id="app">
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
    </div>
    <router-view name="Foot"></router-view>
  </div>
</template>

<script>
import { InfiniteScroll } from "mint-ui";
import axios from "axios";

function getRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURIComponent(
        strs[i].split("=")[1]
      );
    }
  }
  return theRequest;
}

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
    getList() {
      if (this.allLoad) {
        return;
      }
      this.loading = true;
      let query = getRequest();
      axios
        .get("http://rap2api.taobao.org/app/mock/7058/search/list", {
          params: {
            id: query.id,
            keyword: query.keyword,
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
        .catch(err => {
          console.log(err);
        });
      this.loading = false;
      this.pageNum++;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>


<style lang="scss">
.wrapper {
  margin-bottom: 50px;
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
