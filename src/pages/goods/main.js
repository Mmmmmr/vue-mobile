import "./goods_common.css";
import "./goods_custom.css";
import "./goods.css";
import "./goods_theme.css";
import "./goods_mars.css";
import "./goods_sku.css";
import "./goods_animate.css";

import Vue from "vue";
import axios from "axios";

import qs from "qs";
import Swiper from "../../components/Swipe.vue";

let { id } = qs.parse(window.location.search.substring(1));

new Vue({
  el: "#app",
  data: {
    id,
    details: null,
    tabIndex: 0,
    introExpand: false,
    listFinished: false,
    loading: true,
    skuType: 1,
    showSku: false,
    showMessage: false,
    isAddCart: false,
    goodsNumber: 1,
    imageLists: null,
    goodsLists: null
  },
  created() {
    this.getDetails();
    this.getLists();
  },
  methods: {
    getDetails() {
      axios
        .get("http://rap2api.taobao.org/app/mock/7058/goods/details", {
          id
        })
        .then(res => {
          this.details = res.data.data;
          this.loading = false;
          this.addImageLists(this.details.images);
        });
    },
    changeTabType(index) {
      this.tabIndex = index;
    },
    skuTypeChange(index) {
      this.skuType = index;
      this.showSku = true;
    },
    changeGoodsNumber(increase) {
      if (increase < 0 && this.goodsNumber === 1) return;
      this.goodsNumber += increase;
    },
    addToCart() {
      axios
        .post("http://rap2api.taobao.org/app/mock/7058/cart/add", {
          id: this.id,
          goodsNumber: this.goodsNumber
        })
        .then(res => {
          if (res.data.status === 200) {
            this.isAddCart = true;
            this.showSku = false;
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 1000);
          }
        });
    },
    addImageLists(lists) {
      this.imageLists = lists.map((img, index) => {
        return { img, id: "details_swiper" + index };
      });
    },
    getLists() {
      axios
        .get(
          "http://rap2api.taobao.org/app/mock/7058/index/hotLists".hotList,
          {}
        )
        .then(res => {
          this.goodsLists = res.data.lists;
        });
    }
  },
  watch: {
    showSku(val) {
      document.body.style.overflow = val ? "hidden" : "auto";
      document.body.style.height = val ? "100%" : "auto";
      document.querySelector("html").style.overflow = val ? "hidden" : "auto";
      document.querySelector("html").style.height = val ? "100%" : "auto";
    }
  },
  components: {
    Swiper
  }
});
