<template>
  <div class="wrapper">
    <div class="custom-search">
      <form action="get">
        <input type="search" placeholder="搜索更赞的商品">
        <icon name="search" class="icon"></icon>
      </form>
    </div>
    <div class="container">
      <ul class="topList">
        <li v-for="(item, index) in topList" :key="item.id" @click="toggleActive(index)">
          <a href="#" :class="{active: topIndex === index}">{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-if="topIndex === 0 && rankData">
        <div class="hotGood">
          <div class="hotGood-title">
            <p>热销商品榜</p>
            <a href="#">更多></a>
          </div>
          <ul>
            <li v-for="list in rankData.hotGoods" :key="list.id" class="goods-item">
              <a href="#">
                <img :src="list.img">
                <div class="detail">
                  <span class="detail-name">{{list.name}}</span>
                  <span class="detail-price">￥{{list.price}}</span>
                  <span class="detail-recommend">推荐值:{{list.recommend}}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="topShop">
          <div class="hotGood-title">
            <p>TOP店铺榜</p>
            <a href="#">更多></a>
          </div>
          <ul>
            <li v-for="(list, index) in rankData.hotShops" :key="index" class="shop-item">
              <div class="shop-title">
                <span class="badge">{{index + 1}}</span>
                <a href="#">{{ list.name }}</a>
                <span class="follows">/关注度: {{ list.follows}}</span>
              </div>
              <ul class="shop-images">
                <li v-for="(item, index) in list.imgs" :key="index">
                  <a href="#">
                    <img :src="item" alt>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="hotKeywords">
          <div class="hotGood-title">
            <p>热销词排行</p>
            <a href="#">更多></a>
          </div>
          <ul class="keywords-list">
            <li v-for="(list,index) in rankData.hotKeywords" :key="index">
              <a href="#" class="js-hot-keyword">{{list}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="topIndex > 0 && subData">
        <div>
          <h3 class="category-title">热门品牌</h3>
          <ul class="category-content">
            <li
              v-for="(list, index) in subData.brandList"
              :key="index"
              class="category-item js-category-item"
              @click="toSearch(list)"
            >
              <div class="img-wrapper">
                <img :src="list.img" class="category-img">
              </div>
              <span>{{list.name}}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="category-title">热门分类</h3>
          <ul class="category-content">
            <li
              v-for="(list, index) in subData.categoryList"
              :key="index"
              class="category-item js-category-item"
              @click="toSearch(list)"
            >
              <div class="img-wrapper">
                <img :src="list.img" class="category-img">
              </div>
              <span>{{list.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./Icon";
import axios from "axios";

export default {
  data() {
    return {
      topList: null,
      subData: null,
      rankData: null,
      topIndex: 0
    };
  },
  methods: {
    toSearch(list) {
      location.href = `search.html?keyword=${list.name}&id=${list.id}`;
    },
    getTopList() {
      axios
        .get("http://rap2api.taobao.org/app/mock/7058/category/topList")
        .then(res => {
          this.topList = res.data.lists;
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggleActive(index) {
      this.topIndex = index;
    },
    getRankData() {
      axios
        .get("http://rap2api.taobao.org/app/mock/7058/category/rank")
        .then(res => {
          this.rankData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSubData() {
      axios
        .get("http://rap2api.taobao.org/app/mock/7058/category/subList")
        .then(res => {
          this.subData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getTopList();
    this.getRankData();
    this.getSubData();
  },
  components: {
    Icon
  }
};
</script>

<style>
.category-title {
  color: #b3b3b3;
  margin-top: 15px;
  margin-bottom: 5px;
  margin-left: 4%;
  font-size: 12px;
  position: relative;
}
.img-wrapper {
  width: 100%;
  text-align: center;
}
.category-content li span {
  display: block;
  font-size: 12px;
  text-align: center;
}
.category-content li {
  width: 33%;
  padding: 10px;
  align-content: center;
  justify-content: center;
}
.category-content {
  display: flex;
  flex-wrap: wrap;
}
.keywords-list li a {
  display: block;
  padding: 6px 15px;
  color: #333;
  background: transparent;
  text-decoration: none;
}
.keywords-list li:before {
  border-radius: 5px;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: left top;
  transform-origin: left top;
  pointer-events: none;
  border: 1px solid #ccc;
}
.keywords-list li {
  display: inline-block;
  position: relative;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 12px;
}
.keywords-list {
  padding-bottom: 20px;
}
.shop-images li {
  position: relative;
  width: 31%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-right: 2%;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
}
.shop-images {
  margin-right: 10px;
  font-size: 0;
}
.shop-item {
  margin-bottom: 22px;
}
.shop-title .follows {
  color: silver;
  margin-left: 4px;
}
.shop-title a {
  color: #333;
  background: transparent;
  text-decoration: none;
}
.shop-title {
  font-size: 12px;
  margin-bottom: 10px;
  position: relative;
}
.shop-title .badge {
  display: inline-block;
  background-color: #fc5959;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  padding: 2px 4px;
  margin-right: 3px;
  font-size: 10px;
  line-height: 10px;
  vertical-align: middle;
  margin-bottom: 4px;
}
.gotGood {
  display: flex;
  flex-wrap: wrap;
}
.goods-item a {
  display: block;
  color: #333;
  background: transparent;
  text-decoration: none;
}
.detail .detail-name {
  line-height: 1.5;
  margin-bottom: 14px;
  padding-bottom: 0;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 12px;
}
.detail-price {
  display: inline-block;
  margin-right: 20px;
  padding-bottom: 8px;
  font-size: 14px;
  color: #ff525e;
}
.detail-recommend {
  color: silver;
  display: inline-block;
}
.detail {
  display: inline-block;
  margin-top: 20px;
  width: calc(100% - 100px);
  font-size: 12px;
  margin-left: 10px;
}
.goods-item {
  position: relative;
  width: 100%;
  margin-bottom: 12px;
  border-bottom: 2px solid #e5e5e5;
}

.goods-item img {
  margin-top: 20px;
  max-width: 90px;
  max-height: 90px;
}
.hotGood {
  width: 100%;
}
.hotGood-title::after {
  content: "";
  display: table;
  clear: both;
}
.hotGood-title {
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 8px 8px 0;
  zoom: 1;
}
.hotGood-title p {
  float: left;
}
.hotGood-title a {
  color: #fc5959;
  font-size: 12px;
  padding-left: 50px;
  background: transparent;
  text-decoration: none;
  float: right;
}
.custom-search {
  position: fixed;
  background-color: #fafafa;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  padding: 6px 15px;
  background-color: #fafafa;
}
.custom-search .icon {
  position: absolute;
  top: 12px;
  left: 24px;
  border: 0 none;
  width: 20px;
  height: 20px;
  padding: 0;
  text-indent: -9999px;
  background: #fff
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR…ouhQgL+ZBJXioRmwx03mP/4Pep2+2+5tg/e8rl8shs/AUCtdXXCXeHEgAAAABJRU5ErkJggg==)
    50% no-repeat;
  background-size: 16px 16px;
  border-radius: 5px 0 0 5px;
}
.custom-search form input {
  margin: 0;
  padding: 0 10px 0 40px;
  border: 0 none;
  outline: none;
  font-size: 14px;
  height: 32px;
  width: 100%;
}
.content {
  width: 100%;
  height: 70%;
  margin-top: 44px;
  margin-bottom: 48px;
  margin-left: 30%;
}

.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.container {
  position: fixed;
  height: 100%;
  width: 30%;
  margin-top: 44px;
  margin-bottom: 48px;
  background-color: #f4f4f4;
}
.topList li {
  padding: 20px 10px;
  border-bottom: 2px solid #e5e5e5;
}
.topList a {
  text-decoration: none;
  line-height: 16px;
  color: #333;
  font-size: 14px;
}
.topList .active {
  color: #fa6060;
}
.topList {
  width: 100%;
}
</style>
