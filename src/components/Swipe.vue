<template>
  <div class="swiper-container" v-if="show">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(list, index) in lists" :key="index">
        <a href="#">
          <img :src="list.img">
        </a>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要滚动条-->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import axios from "axios";

export default {
  data() {
    return {
      lists: null,
      show: false
    };
  },
  methods: {
    getBanner() {
      axios
        .get("http://rap2api.taobao.org/app/mock/7058/index/banner")
        .then(res => {
          this.lists = res.data.lists;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    lists(newVal, oldVal) {
      if (newVal) {
        this.show = true;
      }
      this.$nextTick(function() {
        var mySwiper = new Swiper(".swiper-container", {
          direction: "horizontal", // 垂直切换选项
          loop: true, // 循环模式选项
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          },

          // 如果需要滚动条
          scrollbar: {
            el: ".swiper-scrollbar"
          }
        });
      });
    }
  },
  mounted() {
    this.getBanner();
  }
};
</script>

<style>
.swiper-pagination-bullet-active {
  background: red;
}
</style>
