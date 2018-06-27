import Vue from 'vue'
import axios from 'axios'
import { httpUrl } from '../api'
import storage from './storage'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        SET_LOADING:'',
        count: 1,
        token: '',
        html:'',
        shopid:'',
        orderId:'',
        coverPic:'',
        shopname:'',
        address:'',
        wxh:'',
        shangPing:'',
        mapname:'',
        mapphone:'',
        mapdizhi:'',
        vipCode:'',
        notice:''
    },
    mutations: {
        SET_LOADING(state, s) {
            state.SET_LOADING = s
        },
        add(state, n) {
            state.count += n
        },
        reduce(state) {
            if (state.count > 0) {
                state.count--
            }
        },
        tokens(state, s) {
            state.token = s
        },
        html(state,htmls){
            state.html = htmls.replace(/;/g,'').replace(/&gt/g,'>').replace(/&lt/g,'<').replace(/&apos/g,"'").replace(/&quot/g,"\\")
                .replace(/&#39/g,"'").replace(/&ensp/g,"'").replace(/&emsp/g,"'").replace(/base64/g,';base64').replace(/&ampwxfrom/g,'&amp;wxfrom').replace(/&ampwx_lazy/g,'&amp;wx_lazy')
        },
        shopids(state, s) {
            state.shopid = s
        },
        orderIds(state, s) {
            state.orderId = s
        },
        coverPics(state, s) {
            state.coverPic = s
        },
        shopnames(state, s) {
            state.shopname = s
        },
        addresss(state, s) {
            state.address = s
        },
        wx(state, s) {
            state.wxh = s
        },
        shangPings(state, s) {
            state.shangPing = s
        },
        mapnames(state, s) {
            state.mapname = s
        },
        mapphones(state, s) {
            state.mapphone = s
        },
        mapdizhis(state, s) {
            state.mapdizhi = s
        },
        vipCodes(state, s) {
            state.vipCode = s
        },
        notices(state, s) {
            state.notice = s
        },
    },
    getters: {
        count(state) {
            return state.token += "100"
        }
    },
    actions: {
        addAction(context) {
            context.commit('add', 10)
            setTimeout(() => {
                context.commit('reduce')
                console.log('123')
            }, 1000)
        },
        reduceAction({ commit }) {
            commit('reduce')
        },
        fghj({commit}){
            axios.post(httpUrl.calssfiy)
            .then(response => {
                console.log(response.data)
                if(response.data.code == 200){
                    commit('tokens',response.data.data)
                }
            })
            .catch(error => {
                // console.log(error)
                this.$vux.loading.show({
                    text: '服务器异常'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                },3000)
            })
        }
    }
})

export default store