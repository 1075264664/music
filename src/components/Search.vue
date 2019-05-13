<template>
  
  <div class="search">
     <van-row class='red'>
     	 <van-col span='2'>
     	 		<van-icon name="arrow-left" @click.native='Return' />
     	 </van-col>
         <van-col span='19' class='right'>
         		<van-search placeholder="请输入搜索关键词" v-model='keywords' ></van-search>
         </van-col>     
         
         <van-col span='3' class='sear' @click.native='sear' >搜索</van-col>
     </van-row>
     
     <van-row v-show='islist'>
     	    <van-col span='24' class='history'>搜索历史:</van-col>
     	    <van-col span='4' class='hislist' v-for='(item,index) in list' :key='index' @click.native='getlist(index)'>{{item}}</van-col>   
     </van-row>
     
     <van-row class='music' v-show='iskeywords'>
  	     		<van-col span="24" class="col-box" @click.native='goState({name: "Player",params: {pid: item.id}})' v-for='(item,index) in currentProduct' :key='index'>
  	     			 	<p class="name">{{item.name}}</p>
		  					<p class="gs">{{item.singer}}</p>
		  				<van-icon name="play-circle-o"   @click.native='goState({name: "Player",params: {pid: item.id}})'/>
		  		</van-col>
  	  </van-row>
  	    
  	    
  </div>
  
</template>

<script>
	import Vue from 'vue'
	import { Search } from 'vant'
	
	export default {
		name:'Search',
		data(){
			return{
				keywords:'',
				currentProduct:[],
				list:[],
				islist:true,
				iskeywords:false
			}
		},
		components:{
			[Search.name]:Search
		},
	 created(){
	 	   
	 	   
	 	   
		 	 var num = localStorage.getItem('history')
       this.list = num == undefined?[]:JSON.parse(num)
       
       this.keywords = this.list[0]
       this.sear()
       
       
		 },
	
		methods:{
			goState(path) {
					this.$router.push(path);
				},
			Return(){
			this.$router.go(-1)	
		 },

		 sear(){
		 		 
		 		 if(this.keywords == '' || this.keywords == undefined){
		 		 	this.iskeywords = false
		 		  this.islist = true
					 return;
		 		 }
		 		    
		 		    this.currentProduct=[]
		 		    
		 		 		var match = new RegExp('('+ this.keywords +')')
		 		 		
		 		 		this.axios.post('https://api.itooi.cn/music/netease/search?key=579621905&s='+this.keywords+'&type=song&limit=100&offset=0').then(r =>{
		 		 			
		 		 			 var productDatas = r.data.data
		 		 			 
		 		 			 productDatas.forEach(v => {
	
								 if (match.test(v.singer) || match.test(v.name)) {
								 	
								    this.currentProduct.push(v);
				       }
				    })
		 		 			 
		 		 		},err => {
		 		 			alert('没有此歌曲')
		 		 		})
		 	
		 		 	this.islist = false
		 		 	this.iskeywords = true
		 		  
		 		  var title =this.keywords
		 		  
		 		 this.list.unshift(title)
		 		 var num = JSON.parse(localStorage.getItem('history'))
         localStorage.setItem('history', JSON.stringify(this.list))
         
         var data = JSON.parse(localStorage.getItem('history'))
         
         this.list = data
         
         if(this.list.length > 10){
         	  this.list.splice(9,1)
         }
		 },
		 getlist(index){
		 	  this.keywords = this.list[index]
		 	  
		 	   this.sear()
		 	 
		 }
		 
		}
	}
</script>

<style lang="less" scoped>
   .search{
   	width: 100%;
   	overflow: hidden;
   }
  .red{
  	background: red;
  }
    .van-row{
    }
    .van-icon{
    	font-size: 42px;
    	margin-top: 7px;
    }
    .sear{
    	font-size: 16px ;
    	text-align: center;
    	line-height:54px ;
    	background-color: red;
    }
    .van-search{
    	background-color: red !important;
    }
    .history{
    	 margin-left: 3px;
    	 margin-top: 5px;
    	 box-sizing: border-box;
    	 color: #9A6E3A;
    	 font-size: 16px;
    }
    .hislist{
    		width: 100px;
    	 color: #000;
    	 font-size: 12px;
    	 border: 1px solid #ddd;
    	 border-radius: 20px;
    	 background-color: #ddd;
    	 text-align: center;
    	 margin: 5px 5px;
    	 
    }
  .music{
	  .col-box{
	  	padding-left: 0.5666rem;
	  	border-bottom: 1px solid #ddd;
	  	position: relative;
	  	p{
	  		line-height: 0.2777rem;
	  	}
	  	.name{
	  		 width:150px ;
	  		 white-space: nowrap;
	  		 overflow: hidden;
				text-overflow: ellipsis;
	  	}
	  	.gs{
	  		width: 150px;
	  		white-space: nowrap;
	  		 overflow: hidden;
				text-overflow: ellipsis;
	  	}
	  	.van-icon{
	       position: absolute;
	       font-size: 25px;
	  	   right: 0.2666rem;
	  	   top:calc( 50% - 16.5px);
	  	}
	 }
}
</style>