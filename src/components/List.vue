<template>
	<div>
   <van-row class='top'>
    	 <van-col span='8' class='inco-left'>
    	 	<van-icon name="arrow-left" @click='Return'/>
    	 </van-col>
    	 <van-col span='8'>
    	 	 <h2>我的收藏</h2>
    	 </van-col>
    </van-row>
    
    
    	<van-row class='music'>
  	     		<van-col span="24"  @click.native='goState({name: "Player",params: {pid: item.id},query:{index: index}})' class="col-box" v-for='(item,index) in currentProduct' :key='index'>
  	     			 	<p>{{item.name}}</p>
		  				<p>{{item.singer}}</p>
		  				<van-icon name="play-circle-o"/>
		  		</van-col>
  	    </van-row>
  	    
  	</div>
</template>

<script>
   export default{
   	name:'List',
   	data(){
   		return{
   			currentProduct:[]
   		}
   	},
   	created(){
   		var data = JSON.parse(localStorage.getItem('b'))
   		this.currentProduct=data
   	},
   	methods:{
   		Return(){
			this.$router.go(-1)
		},
		goState(path) {
				this.$router.push(path);
			},
   	 }
   }
</script>

<style lang="less" scoped>
	.top{
    	height: 1.1111rem;
    	background-color: #0086B3;
    	box-sizing: border-box;
    	.van-icon{
    		font-size: 30px;
    		color: #000000;
    		margin-top:7px;
    	}
    	h2{
    	   font-size: 22px;
    	   font-weight: bold;
    	   margin-top:0.14rem;
    	   text-align: center;
    	   color: #F7F7F7;
    	}
    	.Collection{
    		text-align: right;
    		.van-icon{
    			margin-right:0.2666rem;
    		}
    	}
    }
    .music{
    
	  .col-box{
	  	padding-left: 0.5666rem;
	  	border-bottom: 1px solid #ddd;
	  	position: relative;
	  	p{
	  		line-height: 0.1333rem;
	  	}
	  	.van-icon{
	       position: absolute;
	       font-size: 25px;
	  	   right: 0.2666rem;
	  	   top:calc( 50% - 12.5px);
	  	}
	  }
	}
</style>