<template>
	<div class="body">
		<div class="i_headed">
			<div style="width:0.6rem;height:0.6rem;padding:0.1rem 0px;" @click="goback">
				<img class="i_logo" src="../../static/images/goback.png">
			</div>
			<div class="i_search">
				<img src="../../static/images/search.png" style="width: 0.4rem;height: 0.4rem;margin-left:0.1rem;">
				<input class="i_s_i" type="search" name="" v-model="message" @keyup.enter="search">
			</div>
		</div>
		<div class="main">
			<div class="m_panel" v-for="(g, i) in goods" :key="i">
				<router-link :to="'/content?goodId='+g.id">
					<img class="m_p_h" src="../../static/images/hot.png" v-show="g.status==1">
					<img :src="g.img" style="width:100%;height: 3.5rem;">
					<img src="../../static/images/nogoods1.png" style="width:100%;height: 3.5rem;position: absolute;top:0px;left:0px;" v-show="g.status==2">
					<p class="m_p_gn">{{g.goodsName}}</p>
					<div style="display:flex;width100%;height:0.5rem;padding: 0px 0.1rem 0.1rem;align-items: flex-end;justify-content: space-between;">
						<p style="color: #ff5001;font-size:0.4rem;"><span style="color: #ff5001;font-size:0.3rem;">￥</span>{{g.price}}</p>
						<p style="color: #7e7e7e;font-size:0.2rem;margin-bottom:0.03rem;margin-left: -0.2rem;">专柜价：<del style="color: #7e7e7e;font-size:0.2rem;">￥{{g.marketprice}}</del></p>
						<p style="color: #7e7e7e;font-size:0.3rem;margin-bottom:0.03rem;">{{g.produceAddress}}</p>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Search',
	data () {
		return {
			message: "",
			page: 1,
			rows: 6,
			goods: [],
			isScrollTo: false,// 用于判断返回时是否已经滚动到指定位置
			loadmoreFlag: true
		}
	},
	created: function(){
		if(this.$route.query.msg){
			this.message=this.$route.query.msg;
		}
	},
	mounted: function(){
		window.scrollTo(0, 0);
		console.error("我在搜索");
		/*要在第一次加载数据之前执行*/
		if(Util.getPage("search")){
			console.log("search页数", Util.getPage("search"));
			this.page=Util.getPage("search");
		}
		this.search();
	},
	updated: function(){
		if(!this.isScrollTo){
			console.error("update search", Util.getScrollY("search"));
			if(Util.getScrollY("search")){
				window.scrollTo(0, Util.getScrollY("search"));
			}
			// Util.addScrollListener(()=>{});// 测试 下面那个是正式
			/*滚到底部*/
			Util.addScrollListener(this.loadMore);
			this.isScrollTo=true;
		}
	},
	watch: {
	},
	methods: {
		goback: function(){
			// window.history.go(-1);
			this.$router.push("/");
		},
		/*搜索*/
		search: function(){
			console.error("在搜索");
			console.error(this.message);
			console.error(this.goods);
			bus.$emit("loading", true);
			if(this.message.length>0){
				this.page=1;
				request({
					url: globalURL.gURL+globalURL.url.goodslist,
					data: {page: this.page, rows: this.rows, name: this.message},
					type: "POST"
				}).then((data)=>{
					window.scrollTo(0, 0);
					console.error("请求成功");
					console.error("商品列表", data);
					this.goods=[];
					bus.$emit("loading", false);
					if(data.obj.length>0){
						this.goods=data.obj;
					}else{
            						bus.$emit("tips", "<p>小仙女,对不起</p><p>商品不存在,小熊会尽快补齐商品</P>");
					}
				}, ()=>{
					console.error("出错啦");
					bus.$emit("loading", false);
					bus.$emit("tips", "小熊在开小差，请小仙女稍后再试~");
				})
			}else{
				this.goods=[];
				bus.$emit("loading", false);
				bus.$emit("tips", "请小仙女输入要搜索的商品名字~");
			}
		},
		/*加载更多*/
		loadMore: function(){
			if(this.$route.path=="/search"){
				if(this.loadmoreFlag){
					this.page+=1;
				}
				bus.$emit("loading", true);
				request({
					url: globalURL.gURL+globalURL.url.goodslist,
					data: {page: this.page, rows: this.rows, name: this.message},
					type: "POST"
				}).then((data)=>{
					console.error("加载更多。。。请求成功");
					console.error("商品列表（更多）", data);
					bus.$emit("loading", false);
					if(data.obj.length>0){
						this.goods=data.obj.reduce((coll, item)=>{
							coll.push(item);
							return coll;
						}, this.goods);
						this.loadmoreFlag=true;
					}else{
						this.loadmoreFlag=false;
						bus.$emit("tips", "没有更多宝贝啦~");
					}
				}, ()=>{
					console.error("出错啦");
					bus.$emit("loading", false);
					bus.$emit("tips", "小熊在开小差，请小仙女稍后再试~");
				})
			}
		}
	},
	beforeRouteLeave (to,from, next) {
		// 导航离开该组件的对应路由时调用
		// 可以访问组件实例 `this`
		// 这个 leave 钩子通常用来禁止用户在还未保存修改前突然离开。可以通过 next(false) 来取消导航。
		if(to.path=="/content"){
			console.error("搜索去内容页", window.scrollY);
			if(!this.loadmoreFlag){
				this.page-=1;
			}
			console.error("this.page", this.page);
			Util.setScrollY("search", window.scrollY);
			Util.setPage("search", this.page);
			console.error("search溜了溜了",  Util.getScrollY("search"), Util.getPage("search"));
		}
		if(to.path=="/"){
			Util.setScrollY("search", null);
			Util.setPage("search", null);
			console.error("search溜了溜了",  Util.getScrollY("search"), Util.getPage("search"));
		}
		next();
	}
}
</script>

<style scoped>
 .i_headed{
    position: fixed;
    z-index: 999999;
    top: 0px;
    left: 0px;
    padding: 0 0.2rem;
    width: 100%;
    height: 1rem;
    background: #f78883;
    display: flex;
    align-items: center;
  }
  .i_logo{
    width: 0.4rem;
    height: 0.4rem;
  }
  .i_search{
    /* margin-left: 0.4rem; */
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -0.3rem;
    margin-left: -2.3rem;
    border-radius: 1rem;
    width: 4.6rem;
    height: 0.6rem;
    background:  #fff;
    display: flex;
    align-items: center;
  }
  .i_s_i{
    /* margin-left: 0.2rem; */
    border: 0px;
    width: 3.8rem;
    height: 0.5rem;
    font-size: 0.35rem;
  }

  .main{
    margin-top: 1.1rem;
    padding: 0 0.1rem;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-around; */
  }
  .m_panel{
    position: relative;
    width: 3.55rem;
    height: 4.65rem;
    margin-bottom: 0.1rem;
    background: #fff;
  }
  .m_p_h{
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .m_panel:nth-child(2n){
    margin-left: 0.2rem;
  }
  .m_p_gn{
    padding: 0.1rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 0.3rem;
    color: #303030;
  }
</style>