import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "";

createApp({
  data() {
    return {
      products: [],
      displayProduct: {},
    };
  },
  methods: {
    checkUser() {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          this.productList();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location.href = "login.html";
        });
    },
    productList() {
      axios
        .get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    display(item) {
      this.displayProduct = item;
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)VueHW2Token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.checkUser();
  },
}).mount("#app");
