<template>
  <div id="app">
    <router-view></router-view>
    <v-Loading v-if="Loadings"></v-Loading>
  </div>
</template>

<script>
import Loading from "./Loading"
export default {
  name: 'app',
  data(){
    return{

    }
  },
  components:{
    'v-Loading': Loading
  },
  computed:{
    Loadings(){
      return this.$store.state.SET_LOADING
    }
  },
  created(){
    

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
