<template>
  <div class="main">
    <router-view/>
    <!--二级弹窗 begin-->
    <div class="popUpPanel" @click="closePanel" v-show="popFlag">
      <div class="p_c">
        <img src="../static/images/tcode.png" style="display:block;margin: 0 auto;width: 4rem;">
        <p style="font-size: 0.32rem;color: red;line-height: 0.5rem;margin-top: 0.2rem;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长按上边二维码加入“代代熊”代购群, 天天都是双十一~快去订购吧!!!</p>
      </div>
    </div>
    <!--二级弹窗 end-->
    <!--消息提示 自动消失 begin-->
    <div class="tipsPanel" v-show="tipsFlag">
        <!-- <p class="t_m">{{tipsMsg}}</p> -->
        <div class="t_m" v-html="tipsMsg"></div>
    </div>
    <!--消息提示 自动消失 end-->
    <!--消息提示  begin-->
    <div class="tipsPanel" v-show="loadFlag">
        <p class="t_m">小仙女别急,让小熊跑一会~</p>
    </div>
    <!--消息提示 end-->
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      popFlag: false,
      tipsMsg: "",
      tipsFlag: false,
      loadFlag: false,
      timer: null
    }
  },
  created: function(){
    console.error(bus);
    // 注册全局监听 监听弹窗
    bus.$on("popUp", (flag)=>{
      this.popFlag=flag;
    })
    // 注册全局监听 监听loading弹窗
    bus.$on("loading", (flag)=>{
      this.loadFlag=flag;
    })
    // 注册全局监听 监听提示
    bus.$on("tips", (msg)=>{
      if(msg.length>0){
        this.tipsMsg=msg;
        this.tipsFlag=true;
        clearTimeout(this.timer);
        this.timer=null;
        this.timer=setTimeout(()=>{
          this.tipsFlag=false;
        }, 2000);
      }else{
        this.tipsFlag=false;
      }
    })
  },
  methods: {
    closePanel: function(e){
      console.error(e.target.className);
      if(e.target.className=="popUpPanel"){
        this.popFlag=false;
      }
    }
  }
}
</script>

<style scoped>
.main{
  position: absolute;
  width: 100%;
  height: 100%;
  background:  #e7e7e7;
}
/*二级弹窗 begin*/
.popUpPanel{
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  background: rgba(70, 70, 70, 0.6);
}
.p_c{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -3rem;
  margin-left: -3rem;
  width: 6rem;
  height: 6rem;
  padding: 0.3rem;
  background: #fff;
  border-radius: 0.3rem;
}
/*二级弹窗 end*/

/*消息弹窗 begin*/
.tipsPanel{
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.t_m{
  max-width: 6rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem;
  background:  rgba(10, 10, 10, 0.6);
  font-size: 0.3rem;
  color: #fff;
  line-height: 0.4rem;
  text-align: center;
}
/*消息弹窗 end*/
</style>
