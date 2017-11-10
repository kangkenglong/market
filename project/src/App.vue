<template>
  <div class="main">
    <div class="bg"></div>
    <!-- <keep-alive :include="kaData"> -->
      <router-view class="rouv"/>
    <!-- </keep-alive> -->
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
    <!--反馈 begin-->
    <div class="popUpPanel" v-show="msgFlag" @click="closePanel">
      <div class="p_c" style="background-image: url('../static/images/love.png');background-repeat:no-repeat;background-size: 1rem 1rem;background-position: 0.05rem 0.05rem;">
        <p style="font-size:0.4rem;color: #DE2049;">To: 小熊</p>
        <textarea style="background: #f2dde5;font-size: 0.3rem;line-height: 0.4rem;resize: none;width: 100%;height:3.5rem;margin-top: 0.32rem;border: 0.03rem solid #DE2049;border-radius: 0.1rem;padding: 0.1rem;" placeholder="小仙女对小熊有什么意见或者建议，都可以与小熊说呦，或者小仙女想买的宝贝没有找到，一定要说出来，小熊会尽快将宝贝上架呦~~" v-model="message"></textarea>
        <div style="display:flex;justify-content: space-around;margin-top: 0.3rem;">
          <div style="width: 2.5rem;height: 0.8rem;background: #f494b2;border-radius: 0.1rem;color: #FFF;font-size: 0.32rem;line-height: 0.8rem;text-align: center;" @click="sendMsg">发送</div>
          <div style="width: 2.5rem;height: 0.8rem;border: 0.02rem solid #606060;border-radius: 0.1rem;color: #606060;font-size: 0.32rem;line-height: 0.8rem;text-align: center;" @click="closeMsg">取消</div>
        </div>
      </div>
    </div>
    <!--反馈 end-->
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
      msgFlag: false,
      timer: null,
      kaData: "Index",// 缓存组件名称
      message: ""//反馈信息
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
    // 注册全局监听 反馈
    bus.$on("msg", (flag)=>{
      this.msgFlag=flag;
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
        }, 1200);
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
        this.msgFlag=false;
      }
    },
    closeMsg: function(){
      this.message="";
      this.msgFlag=false;
    },
    sendMsg: function(){
      if(this.message.length>0){
        request({
          url: globalURL.gURL+globalURL.url.feedback,
          data: {content: this.message},
          type: "POST"
        }).then((data)=>{
          if(data.code==0){
            this.msgFlag=false;
            this.message="";
            bus.$emit("tips", "小熊收到啦,谢谢小仙女~");
          }else{
            bus.$emit("tips", "哎呀,发送失败了∏ ∏~");
          }
        }, ()=>{
          console.error("信息发送错误");
        })
      }else{
        bus.$emit("tips", "小仙女,内容不能为空喔~");
      }
    }
  }
}
</script>

<style scoped>
.rouv{
  position: relative;
  z-index: 2;
}
.main{
/*   position: absolute;
  width: 100%;
  height: 100%;
  background:  #e7e7e7; */
}
.bg{
  position: fixed;
  z-index: 1;
  top: 0px;
  left: 0px;
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
  background: #f2dde5;
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
