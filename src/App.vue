<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{

    }
  },
  created(){
    // this.$axios.interceptors.request.use((config) => {
    //   console.log("请求前拦截！");
    //   // alert('开始请求')
    //   return config;
    // }, (err) => {
    //   return Promise.reject(err);
    // });


    // this.$axios.post('/fangyuanli/DemoApi/oftenGoods.php')
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
      // this.$axios.post('/qweasd/puman/api/system/code',{ phone: '18136940844', msgType: '1' }, {headers: {'Content-Type':'application/x-www-form-urlencoded'}, emulateJSON: true })



    

  },
  methods:{
      qwe(){
        
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
