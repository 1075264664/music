 <template>
   <div class="index">
   	  <van-row class='top'>
    	 <van-col span='8' class='inco-left' @click.native='getList'>
    	 	<van-icon name="bars"/>
    	 </van-col>
    	 
    	 <van-col span='8'>
    	 	 <h2>网易云音乐</h2>
    	 </van-col>
    	 
    	 <van-col span='8' class="Collection">
    	 	<van-icon name="search" @click.native='goState({name:"Search"})'/>
    	 </van-col>
    </van-row>
   	  
        <div class="left" v-show="isList">
        	<van-row>
        		<van-col span='24' @click.native='goState({name:"List"})'>我的收藏</van-col>
        	</van-row>
        </div>
   	  	<van-tabs v-model="active" class='vtabs' title-active-color='red'>
  	     	<van-tab title="推荐音乐">
  	     		
  	     <van-row class='banner'>
        	<van-col span='24' class='auto'>
        		<van-swipe :autoplay="3000" indicator-color="white">
 					<van-swipe-item v-for='(item,index) in banners' :key='index'>
 						 <img  class="auto-img" :src="item.url" alt="" />
 					</van-swipe-item>
				</van-swipe>
        	</van-col>
        </van-row>
	 				
  	    <van-row>
  	     	<van-col span='24' class='box'>
  	     		<van-row class='content'>
  	     			<van-col span='1' class='red'></van-col>
  	     			<van-col span='23'class='title '>推荐歌单</van-col>
  	     		</van-row>
  	     	</van-col>
  	    </van-row>
  	    
  	 
  	     	
  	     	
  	     	<van-row class='songsheet '>
  	     		<van-col  span="8" @click.native='goState({name: "Hotsongs",params: {pid: item.id}})' class="col-box" v-for='(item,index) in playlists' :key='index'>
		  			<div><img class="auto-img" :src="item.coverImgUrl" /></div>
		  				<div class="product-info">
		  					<p class="title">{{item.creator}}</p>
		  				</div>
		  		</van-col>
  	     	</van-row>
  	     	
  	     	
  	     	<van-row>
  	     		<van-col span='24' class='box'>
  	     			<van-row class='content'>
  	     				<van-col span='1' class='red'></van-col>
  	     				<van-col span='23'class='title '>最新音乐</van-col>
  	     			</van-row>
  	     		</van-col>
  	     	</van-row>
  	     	
  	     	
  	     	<van-row class='music'>
  	     		<van-col  @click.native='goState({name: "Player",params: {pid: item.id},query:{index: index}})' span="24" class="col-box" v-for='(item,index) in music' :key='index'>
		  				<p>{{item.name}}</p>
		  				<p><i class="fa fa-cc" aria-hidden="true"></i>
		  					{{item.singer}}</p>
		  				<van-icon name="play-circle-o"  @click.native='goState({name: "Player",params: {pid: item.id},query:{index: index}})'/>
		  		</van-col>
  	     	</van-row>
  	     </van-tab >
  	     
  	     
  	  	 <van-tab title="热歌榜">
  	  	 	 <van-row class='music'>
  	  	 	 	<van-col span='24' class='rgimg'>
  	  	 	 		<img class="auto-img" src="https://p2.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=400y400"/>
  	  	 	 	</van-col>
  	  	 	 	<van-col   @click.native='goState({name: "Player",params: {pid: item.id},query:{index: index}})' span="24" class="col-box" v-for='(item,index) in heat' :key='index'>
		  				<p>{{item.name}}</p>
		  				<p><i class="fa fa-cc" aria-hidden="true"></i>
		  				{{item.singer}}</p>
		  				<van-icon name="play-circle-o"  @click.native='goState({name: "Player",params: {pid: item.id},query:{index: index}})'/>
		  		</van-col>
  	  	 	 </van-row>
  	  	 </van-tab>
  	  	 
	  </van-tabs>
   </div>
</template>

<script>
	import Vue from 'vue'
	import { Tab, Tabs, NavBar, swipe, SwipeItem, Search} from 'vant';
	
	export default {
		name:'Index',
		data(){
			return{
				keywords:'',
				active:0,
				Start:0,
				Startend:15,
				
				isList:false,
				
				//推荐
				playlists:[],
				
                 //热歌榜
                 heat:[],
                
				//最新音乐
				music:[],
				
				//歌手
				singer:[],
				
				banners:[
				   {url:'http://img0.imgtn.bdimg.com/it/u=1497135067,3953429895&fm=26&gp=0.jpg'},
				   {url:'http://hbimg.b0.upaiyun.com/41b1fea79a2aefab0fbb347ff543b646377f73841bdd0-wSpeOU_fw658'},
				   {url:'http://n.sinaimg.cn/sina_vr/crawl/w496h268/20171221/2v5l-fypvuqe6080413.jpg'},
				   {url:'http://upload.qianlong.com/2018/1211/1544508493806.jpg'},
				   {url:'http://hbimg.b0.upaiyun.com/9880dad393324115dff96b5206ed8cd8d02e1ead1c8bd-HfCkN8_fw658'}
				]
			}
		},
		components: {

			[Tab.name]: Tab,

			[Tabs.name]: Tabs,
			
			[NavBar.name]: NavBar,
			
			[swipe.name]:swipe,
			
			[SwipeItem.name]:SwipeItem,
			
			[Search.name]:Search

		},
		created(){
			var data = JSON.parse(localStorage.getItem('paramsStr'))
			
			
			
		    var count = []
		     count.push(data)
		     var fun = count[0]
		     
		     
		     var num = []
			for(var i = 0;i<15;i++){
				num[i] = parseInt(Math.random()*100)
				
				var Num = fun[num[i]]
				
				this.music.push(Num)
				
			}
			
            
			this.getApi()
			this.Heat()
		},
		methods:{
				goState(path) {
					this.$router.push(path);
				},
			getList(){
				if(!this.isList){
					this.isList=true
				}else{
					this.isList=false
				}
			},
			getApi(){
				 
				 var data = JSON.parse(localStorage.getItem('playlists'))
				 
					var num = []
					num.push(data)
					

				    var num1=num[0]
				    
				    var count = []
				    for(var i =0;i<6;i++){
				       count[i] = parseInt(Math.random()*100)
				      var playlists = num1[count[i]]
				      	this.playlists.push(playlists)

				    }
			},
			Heat(){
		    	
		    		var data = JSON.parse(localStorage.getItem('Heat'))
		    		
		    		this.heat.push(data)
		    		
		    		this.heat = this.heat[0]
		    		
		    		this.heat =this.heat.splice(this.Start,this.Startend)
		    },
		    Singer(keywords){
		       this.axios.post('https://api.itooi.cn/music/kuwo/search?key=579621905&s='+ this.keywords +'&limit=100&offset=0&type=artist').then(r =>{
		            this.singer.push(r.data.data)
		            
		            this.singer = this.singer[0]
		            
		            console.log(this.singer)
		            
		       })
		    }
		}
	}
</script>

<style lang="less" scoped>
.index{
	max-width: 1024px;
}
.top{
    	height: 1.1111rem;
    	background-color: orangered;
    	box-sizing: border-box;
    	.van-icon{
    		font-size: 30px;
    		color: #FFFDEF;
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
    			margin-right:0.1111rem;
    		}
    	}
    }	
       
     .left{
     	position: absolute;
     	width: 3.6rem;
     	height: 16.62222rem;
     	background-color: #FFFFFF;
     	z-index: 999 ;
     	border:1px solid #000000;
     	border-left:0;
     	border-top:0;
     	.van-col{
     		font-size: 16px;
     		font-weight: bold;
     		padding: 10px 0px;
     		text-align: center;
     	}
     }
     .left .van-col:hover{
     	background-color: #B3D4FC;
     }
     .banner{
     	.auto{
     	   height: 200px;
     		.auto-img{
     			width: 100%;
     			height: 200px;
     		}
     	}
     	
     }
	
	.box{
	  .content{
	  	margin: 0.5333rem 0;
	  	box-sizing: border-box;
		.red{
		width: 0.1866rem;
		height: 0.5rem;
		background-color: #FF0000;
	     }
	    .title{
	    	font-size: 14PX;
	    	padding-left: 0.3rem;
	    	box-sizing: border-box;
	    }
	}  
}
	.songsheet{
		box-sizing: border-box;
	   .auto-img{
	   	 height: 125px;
	   }
		.product-info{
			text-align: center;
			.title{
				color: #888;
				margin-top: 0.2666rem;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.col-box:nth-child(2){
		   padding:0PX 2px;
	    }
	    .col-box:nth-child(5){
		   padding:0PX 2px;
	    }
	}
	.music{
    
	  .col-box{
	  	padding-left: 0.5666rem;
	  	box-sizing: border-box;
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
	  	.fa{
	  		color: red;
	  	}
	  }
	}
	.music{
		.col-box:last-of-type{
			border: 0;
		}
	}
	.rgimg{
		height: 3.3333rem;
	  .auto-img{
	  	 height: 100%;
	  }
	}
	
	.Singer{
      .img{
      	 width: 70px;
      	 height: 70px;
      	 border: 1px solid #DDDDDD;
      	 border-radius: 50%;
      	 margin: 5px;
      	  img{
      	  	width: 100%;
      	  	height: 100%;
      	  	border-radius: 50%;
      	  }
      }
      .title{
      	   height: 60px;
         p{
         	height: 15px;
         }
         .name{
         	font-size: 14px;
         	font-weight:bold;
         }
      }
	}
	

	
</style>