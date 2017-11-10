<template>
	<div>
		<div class="c_goback" @click="goback"></div>
		<div class="c_buy" @click="popUp">购买</div>
		<div class="c_headed">
			<img style="width:100%;height:100%;" :src="img">
		</div>
		<div class="c_gPrice">
			<p style="color:#fff;font-size:0.8rem;">
				<span style="color:#fff;font-size:0.4rem;">￥</span>{{price}}
			</p>
			<div style="margin-left: 0.3rem;margin-bottom:0.05rem;color: #bee5d3;font-size: 0.25rem;">
				<p style="margin-bottom: 0.05rem;">专柜价&nbsp;&nbsp;
					<del>￥{{mprice}}</del>
				</p>
				<p style="background: #229862;width: 1.8rem;height: 0.36rem;border-radius: 0.1rem;line-height: 0.36rem;text-align: center;">
					<span style="font-size: 0.32rem;">{{reserveNum}}</span>&nbsp;人预定
				</p>
			</div>
		</div>
		<div style="width:100%;padding: 0.1rem 0.2rem;background:#fff;">
			<p style="font-size: 0.35rem;color:#051b28;line-height:0.45rem;">{{name}}</p>
			<div style="display: flex;margin-top:0.2rem;">
				<p style="font-size: 0.25rem;color:#828282;flex:1;">月销 {{sellNum}} 件</p>
				<p style="font-size: 0.25rem;color:#828282;flex:1;">规格: {{specifications}} </p>
			</div>
		</div>
		<p style="font-size: 0.3rem;color:#ccc;text-align:center;height:0.8rem;line-height:0.8rem;">──────── 商品描述──────── </p>
		<div class="c_gDesc" v-html="goodDesc"></div>
		<div style="width: 100%;padding: 0.2rem;background:#fff;display:flex;">
			<div style="margin-right:0.4rem;">
			<img src="../../static/images/tcode.png" style="width: 2rem;height:2rem;">
			</div>
			<div style="font-size: 0.3rem;color: #051b28;line-height: 0.5rem;">
				<p style="text-align: center;">一年只有一次双十一</p>
				<p style="text-align: center;">过了今年等明年，等一年啊!!!</p>
				<!-- <p style="text-align: center;">现在!!!现在!!!现在!!!不用在等一年啦</p> -->
				<p style="color: red;">长按左边二维码加入“代代熊”代购群, 天天都是双十一~快去订购吧!!!</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: "Content",
		data(){
			return {
				img: "",
				price: "",
				mprice: "",
				reserveNum: "",// 预定人数
				name: "",
				sellNum: "",
				goodDesc: "",
				specifications: "" // 规格
			}
		},
		mounted: function(){
			window.scrollTo(0, 0);
			this.loadMsg();
			Util.removeScrollListener();
			console.error("我在内容页");
		},
		methods: {
			goback: function(){
				// window.history.go(-1);
				this.$router.go(-1);
				// console.error(this.$router);
				// this.$router.push("/");
			},
			// 请求商品信息
			loadMsg: function(){
				bus.$emit("loading", true);
				request({
					url: globalURL.gURL+globalURL.url.selgoods,
					data: {goodsid: this.$route.query.goodId},
					type: "POST"
				}).then((data)=>{
					bus.$emit("loading", false);
					console.error(data);
					this.price=data.obj.price;
					this.mprice=data.obj.marketprice;
					this.reserveNum=data.obj.reserveCount;
					this.name=data.obj.goodsName;
					this.sellNum=data.obj.salecount;
					this.goodDesc=data.obj.content;
					this.img=data.obj.img;
					this.specifications=data.obj.specifications;
				}, ()=>{
					bus.$emit("loading", false);
					console.error("出错啦");
				})
			},
			// 显示二级弹窗
			popUp: function(){
				bus.$emit("popUp", true);
			}
		}
	}
</script>

<style scoped>
	.c_goback{
		position: fixed;
		z-index: 999;
		width: 0.8rem;
		height: 0.8rem;
		top: 0.3rem;
		left: 0.3rem;
		background: rgba(70, 70, 70, 0.5);
		background-image: url('../../static/images/goback.png');
		background-size: 0.5rem 0.5rem;
		background-position: 0.15rem center;
		background-repeat: no-repeat;
		border-radius: 0.4rem;
	}
	.c_buy{
		position: fixed;
		top: 0.3rem;
		left: 1.4rem;
		width: 1.4rem;
		height: 0.8rem;
		border-radius: 0.4rem;
		background: rgba(226, 33, 46, 0.6);
		overflow: hidden;
		line-height: 0.8rem;
		color: #fff;
		text-align: center;
		font-size: 0.4rem;
	}
	.c_headed{
		width: 100%;
		height: 7rem;
		background:  #fff;
	}
	.c_gPrice{
		display: flex;
		align-items: flex-end;
		width: 100%;
		height: 1rem;
		padding: 0.15rem 0.2rem 0.08rem;
		background: #26a96d;
	}
	.c_gDesc{
		width: 100%;
		padding: 0.3rem 0.3rem 0.5rem;
		/* height: 8rem; */
		background: #fff;
	}
</style>
<style type="text/css">
	.c_gDesc *{
		width: 100%;
	}
</style>