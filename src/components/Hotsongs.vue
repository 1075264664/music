<template>
  <div class="back">
	 <van-row class='top'>
    	 <van-col span='8' class='inco-left'>
    	 	<van-icon name="arrow-left" @click='Return'/>
    	 </van-col>
    	 
    	 <van-col span='8'>
    	 	 <h2>推荐歌单</h2>
    	 </van-col>
    	 
   </van-row>
   
    <van-row class='content'>
    	 <van-col class='box' span='8'>
    	 	 <img class="auto-img" :src="List.coverImgUrl"/>
    	 </van-col>
         
         <van-col class='box' span='16'>
    	 	 <p class="title">{{List.creator}}</p>
    	 	 <p class="tag">{{List.title}}</p>
    	 	  <p class="tag">{{List.description}}</p>
    	 </van-col>
   </van-row>
   
  	 <van-row>
    	 <van-col class='jianj' span='24'>
    	 	  <p class="tag"> <span class="title">简介:&nbsp;&nbsp;</span>{{List.description}}</p>
    	 </van-col>
     </van-row>
   
   
	
  		<van-row class='music'>
  	     	<van-col span="24"   class="col-box" v-for='(item,index) in num' :key='index'  @click.native='goState({name: "Player",params: {pid: item.id},query:{index: index}})'>
		  		<p class="name">{{item.name}}</p>
		  		<p class="nav">
		  			<i class="fa fa-cc" aria-hidden="true"></i>
		  			{{item.singer}}
		  		</p>
		  		<van-icon name="play-circle-o"   @click.native='goState({name: "Player",params: {pid: item.id},query:{index: index}})' />
		  	</van-col>
  	    </van-row>
  	</div>
</template>

<script>
	const url = "https://api.itooi.cn/music/netease/highQualitySongList?key=579621905&cat=全部&limit=100"
	export default{
		name:'Hotsongs',
		data(){
			return{
				List:[],
				num:[]
			}
		},
		created(){
			this.axios.post(url).then( r =>{
					var playlists = r.data.data.playlists
					for(var i = 0;i<playlists.length;i++){
						if(this.$route.params.pid == playlists[i].id){
							this.List = playlists[i]
							console.log(this.List)
							break;
						}
					}
					this.axios.post('https://api.itooi.cn/music/netease/songList?key=579621905&id='+this.$route.params.pid+'&limit=10&offset=0').then( r=>{
						var num = r.data.data.songs
						this.num = num.splice(20,15)
					})
				})
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
.back{
   background: rgba(0,0,0,.1);
}
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
    	}
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
	  		width: 200px;
	  		white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
	  	}
	  	.nav{
	  		width: 200px;
	  		white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
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
	.content{
		background:rgba(0,64,64,0.4);
		border: 1px solid #DDDDDD;
		border-top: none;
		.box{
			.auto-img{
				width: 120px;
				height: 120px;
				padding: 5px;
			}
		  .title{
		  	font-size: 16px;
		  	margin-left: 10px;
		  	height:5px;
		  	line-height: 0.1rem;
		  }
		  .tag{
		  	font-size: 13px;
		  	margin-left: 10px;
		  	white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

		  }
		}
	}
	.jianj{
		 p{
		 	height: .5rem;
      overflow: hidden;		
      	white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis; 	
			.title{
					font-size: 12px;	
					font-weight: bold;
				
			}
		}
	}
</style>