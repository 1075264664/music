<template>
   <div class="player" ref='bodyback' :style="{background:`url(${currentProduct.pic})`}">
    <van-row class='top' >
    	 <van-col span='8' class='inco-left'>
    	 	<van-icon name="arrow-left" @click='Return' />
    	 </van-col>
    	 
    	 <van-col span='8'>
    	 	 <h2>音乐播放</h2>
    	 </van-col>
    	 
    	 <van-col span='8' class="Collection">
    		<i class="fa fa-heart fa-2x heart" aria-hidden="true" @click='add'></i>
    	 </van-col>
    </van-row>
          
     
       <div ref='time'>
       <van-row>
       	 <van-col class='animation' span='24'>
       	 	<div class="title">{{currentProduct.name}}</div>
       	 	<div class="title">{{currentProduct.singer}}</div>
       	 	
       	 	<div class="round">
       	 		<div class="circle">
       	 			<img class="auto-img" :src='currentProduct.pic'/>
       	 		</div>
       	 	</div>
       	 	  
       	 	<van-row class='gcList'>
       	 	  <div class='gc'  ref='lrc' >
       	 	  	 <!--<p  v-show="parseInt(str) >= List[index] &&  parseInt(str) < List[index + 1]" 
       	 	  	 	v-for='(item,key,index) in lrcData' :key='index'>{{item}}{{getList}}</p>-->
       	 	  	 	
       	 	  	 	<p :class="{active:parseInt(str) >= List[index] &&  parseInt(str) < List[index + 1]}" 
       	 	  	 		v-for='(item,key,index) in lrcData' :key='index'>{{item}}{{getList(key,index)}}
       	 	  	 	</p>
       	 	  </div>
       	    </van-row>
       	 </van-col>
       </van-row>
    </div>
     
       <van-row>	
         <van-col class='audio' span='24' >
         	 <audio :src="currentProduct.url" autoplay ref='audio' 
         	 	@canplay="duration"
         	 	 @timeupdate='currentTime'
         	 	 >
         	 </audio> 
         	   <van-row>
         	   	   <van-col span='24'>
         	   	   	  <van-row>
         	   	   	  	  
         	   	   	  	<van-col span='2'>
         	   	   		    <div class="last" @click="Theprevious"></div>
         	   	   		</van-col>
         	   	   	  	
         	   	   			<van-col span='3' class='str'>{{str | date}}</van-col>
         	   	   			
         	   	        <van-col span='12'>
         	   	           <input class="slider" type="range" ref="range" v-model="str" :max="strend" min="0" @click="rangeChange"/>
         	   	        </van-col>
         	   	      
         	   	      
         	   	        <van-col span='3' class='strend'>{{strend | date }}</van-col>
         	   	      
         	   	       <van-col span='2'>
         	   	   		   <div :class="[isPlaying ? 'pause':'play']"  @click="play"></div>
         	   	   	   </van-col>
         	   	      
         	   	        <van-col span='2'>
         	   	        	 <div class="next" @click="Next"></div>
         	   	        </van-col>
         	   	      
         	   	   	  </van-row>
         	   	   </van-col>
         	   </van-row>
         	    
         </van-col>
       </van-row>
   </div>
    
</template>

<script>
	
	
	import { NavBar, slider } from 'vant';
	import Vue from 'vue';
	
	Vue.filter('date' , function(value){
		 if (!value)return '00:00';
             let min, sed;
             parseInt(value / 60) > 9 ? min = parseInt(value / 60) : min = '0' + parseInt(value / 60);
             (value % 60).toFixed(0) > 9 ? sed = (value % 60).toFixed(0) : sed = '0' + (value % 60).toFixed(0);
              return `${min}:${sed}`;
	})
      export default{
		name:'Player',
		data(){
			return{
				currentProduct:[],
				getgc:[],
				current: null,
				str:0,
				strend:0,
				indexID:'',
				a:[],
				index:'',
				count:0,
		        lrc:{},
		        lrcData:{},
		        List:[],
		        isPlaying:true,
		        isgc:false,
                iscolor:false
			}
		},
		components:{
			[NavBar.name]:NavBar,
			[slider.name]:slider
		},
		
		created(){
			
			    //获取从index页面传过来的index
				var index = this.$route.query.index;
				this.index = index;
			   
			    //获取本地 存储
			    var data = []
			    var heat = []
				 data = JSON.parse(localStorage.getItem('paramsStr'))
				 heat = JSON.parse(localStorage.getItem('Heat'))
				
				
					this.current = data;
				console.log('ID',this.$route.params.pid)
				
				
				for(var i = 0;i<data.length;i++){
					if(this.$route.params.pid == data[i].id){
						this.currentProduct = data[i]
					this.back(this.currentProduct.id) 
					    
					}
				}
				
				for(var i = 0;i<heat.length;i++){
					if(this.$route.params.pid == heat[i].id){
						this.currentProduct = heat[i]
						
						this.back(this.currentProduct.id) 
						 
							
					}
				}
				
				this.axios.post('https://api.itooi.cn/music/netease/song?key=579621905&id='+ this.$route.params.pid +'').then(r =>{
					  			        
					 		this.currentProduct = r.data.data	
					 		this.back(this.currentProduct.id) 
					 		
					
				})	
				
				this.getgc = this.currentProduct
				
				
				
		 			var num = localStorage.getItem('b')
         			this.a = num == undefined?[]:JSON.parse(num)
         			
         			
         			
         			
         			
	},
    
    mounted(){
    		
   		this.bodyback()
   		
    },
    
 
	methods:{
		goState(path) {
				this.$router.push(path);
		},
		back(url){
         	    this.axios.post('https://api.itooi.cn/music/netease/lrc?key=579621905&id='+ url+'').then(r =>{
         	    	
         	    this.lrc = r.data
				//数据格式处理
				var lyrics = r.data.split("\n");
				//用\n替换得到数据的回车
				var lrcObj = {};
				for(var i = 0 ;i<lyrics.length;i++){
					var lyric = decodeURIComponent(lyrics[i]);
					//解码函数decodeURIComponent
					var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
					var timeRegExpArr = lyric.match(timeReg);
					if(!timeRegExpArr)continue;
					var clause = lyric.replace(timeReg,'');
						for(var k= 0,h = timeRegExpArr.length;k < h;k++ ){
							var t = timeRegExpArr[k];
							var min = Number(String(t.match(/\[\d*/i)).slice(1)),
								sec = Number(String(t.match(/\:\d*/i)).slice(1));
							var time = min*60 + sec;
							lrcObj[time] = clause;
						}
				}
				this.lrcData = lrcObj;
			
         	  })
         	  
		},
		Return(){
 
			this.$router.go(-1)
		},
		add(){
			for(var i = 0;i<this.a.length;i++){
              		if(this.a[i].id == this.currentProduct.id){
					return;
				}
             }			
           var b = {
            	id:this.currentProduct.id,
            	singer:this.currentProduct.singer,
            	name:this.currentProduct.name,
            	pic:this.currentProduct.pic,
            	url:this.currentProduct.url,
            	lrc:this.currentProduct.lrc,
            	time:this.currentProduct.time
            }
           this.a.unshift(b)
           var num = JSON.parse(localStorage.getItem('b'))
           
            localStorage.setItem('b', JSON.stringify(this.a))
		},
		Next(){ 
			this.index++;
		
           for(var i = 0; i<this.current.length; i++) {
           
           	if(this.index == i) {
           		this.currentProduct = this.current[i]
           		
           	}else if(this.index ==  (this.current.length - 1)){
          	 this.index = 0
          }
        }
              this.back(this.currentProduct.id) 
              this.bodyback()
      },
		Theprevious(){
			this.index--;
           for(var i = 0; i<this.current.length; i++) {
           	if(this.index == i) {
           		this.currentProduct = this.current[i]
           	 }
           }
            if(this.index < 0){
          	  return; 
          }
            this.back(this.currentProduct.id) 
             this.bodyback()
		},
		duration() {	
			this.strend = this.$refs.audio.duration 
			
			
		},
		currentTime(e){
			
			this.str = this.$refs.audio.currentTime 
			
			
	       
	  },

		getList(key,index){
			
		var lrcDiv = this.$refs.lrc
		if(key < this.str || key > this.str - (this.List[index+1] - this.List[index])){
			lrcDiv.style.top = -((index - 1)*0.8777)  + "rem"
		}
	
	},
  	rangeChange() {
      this.$refs.audio.currentTime = this.str;
    },
    
    play(){
    	 const audio = this.$refs.audio;
                if (this.isPlaying) {
                    audio.pause();
                    this.isPlaying = false;
                }else{
                	 audio.play();
                    this.isPlaying = true;
                }
        }, 
    bodyback(){
    
     var  num = document.querySelector('.player')

		num.style.height = document.documentElement.clientHeight + 'px'  
		
           
		
    },
  }
}
</script>
 
<style lang="less" scoped>    
     .player{
    
        background-repeat:repeat-y !important;
        background-size: 100% 100% !important;
     }
        
    .top{
    	height: 1.1111rem;
    	background-color: rgba(34,177,76,.1);
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
    	.Collection{
    		text-align: right;
    		.heart{
    			margin-right:0.2666rem;
    			margin-top: 0.2333rem;
    		}
    		.active{
    			color: red;
    		}
    	}
    }
     
     
	.van-nav-bar{
		height:1.3513rem ;
	/*	background-color:rgb(63,72,199);*/
	}
	.van-icon-arrow-left{
		font-size: 24px;
		font-weight:bold;
		color: #FFFFFF;
	}
	.animation{
		/*background-color: #0086B3;*/
		height: 100%;
	 	 .round{
		 width: 7rem;
		 height: 7rem;
		 position: relative;
		 top: 0.2666rem;
		 left:calc(50% - 140px);
		  .circle{
		  	width: 4.39rem;
		    height: 4.39rem;
		  	border: 1.3066rem solid #000;
		  	border-radius: 50%;
		  	.auto-img{
		  		border-radius: 50%;
		  		animation:myfirst 7s linear  infinite ;
		  	}
		  }
	   }
	   .title{
	   	text-align: center;
	   	font-size: 20px;
	   	font-weight: bold;
	   	color: #0077AA;
	   }
	   .gcList{
	   	height: 6.9888rem;
	   	position: relative;
	   	overflow: hidden;
	   	.gc{
	   		width: 100%;
	   		text-align: center;
	   		position: absolute;
	   		top: 0;
	   		p{
	   			font-size: 14px;
	   		    color: #55A532;
	   		}
	   		.active{
	   			color: red !important;
	   		}
	   	}
	   }
	}
	.audio{ 
		width: 100%;
		height: 0.8555rem;
		position: fixed;
		bottom: 0;
		background-color: rgba(34,177,76,.1);
		 .button{
		 	position: fixed;
		 	bottom: 5px;
		 }
		 .str{
		 	font-size: 14px;
		 	box-sizing: border-box;
		 	margin-top: 6px;
		 	text-align: center;	
		 	color: #FFFFFF;
		 }
		.slider{
			width: 97%;
			margin-top: 12px;
			text-align: center;
		}
		.strend{
			font-size: 14px;
		 	box-sizing: border-box;
		 	margin-top: 6px;	
		 	text-align: center;
		 	color: #FFFDEF;
		}

		.title{
	   		font-size: 20px;
	   		font-weight: bold;
	   		text-align: center;
	   }
	  
	   .van-slider__button{
	   	border: none;
	   }
	    .last{
	    	margin-top: 3px;
	    	margin-left: 3px;
            position: relative;
            display: inline-block;
            height: 20px;
            width: 20px;
            border: 2px solid #fff;
            border-radius: 20px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
        }

        .black-last {
            border-color: #000 !important;
        }

        .black-last:after {
            border-left-color: #000;
        }

        .black-last:before {
            background: #000;
        }

        .last:before {
            content: '';
            height: 0;
            width: 0;
            display: block;
            border: 6px transparent solid;
            border-left-width: 0;
            border-right-color: #fff;
            position: absolute;
            top: 4px;
            left: 9px;
        }

        .last:after {
            content: '';
            height: 10px;
            width: 2px;
            display: block;
            background: #fff;
            position: absolute;
            top: 5px;
            left: 5px;
        }
        
         .next {
         	margin-top: 3px;
         	margin-left: 5px;
            position: relative;
            display: inline-block;
            height: 20px;
            width: 20px;
            border: 2px solid #fff;
            border-radius: 20px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
        }

        .black-next {
            border-color: #000 !important;
        }

        .black-next:before {
            border-right-color: #000 !important;
        }

        .black-next:after {
            background: #000 !important;
        }

        .next:before {
            content: '';
            height: 0;
            width: 0;
            display: block;
            border: 6px transparent solid;
            border-right-width: 0;
            border-left-color: #fff;
            position: absolute;
            top: 0.1rem;
            left: 6px;
        }

        .next:after {
            content: '';
            height: 10px;
            width: 2px;
            display: block;
            background: #fff;
            position: absolute;
            top: 5px;
            left: 14px;
        }
        
	}
   .play {
   			margin-top: 3px;
   			margin-left: 5px;
            position: relative;
            display: inline-block;
            height: 20px;
            width: 20px;
            border: 2px solid #fff;
            border-radius: 20px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            background-color: transparent;
        }

        .black-play {
            border-color: #000 !important;
        }

        .black-play:after, .black-play:before {
            border-left-color: #000 !important;
        }

        .play:before {
            content: '';
            height: 0;
            width: 0;
            display: block;
            border: 8px transparent solid;
            border-right-width: 0;
            border-left-color: #fff;
            position: absolute;
            top: 3px;
            left: 7px;
        }

        .pause {
        	margin-top: 3px;
        	margin-left: 5px;
            position: relative;
            display: inline-block;
            height: 20px;
            width: 20px;
            border: 2px solid #fff;
            border-radius: 35px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            
        }

        .black-pause {
            border-color: #000 !important;
        }

        .black-pause:after.black-pause:before {
            background: #000 !important;
        }

        .pause:before, .pause:after {
            content: '';
            height: 10px;
            width: 3px;
            display: block;
            background: #fff;
            position: absolute;
            top: 5px;
            left: 5px;
        }

        .pause:after {
            left: 12px;
        }

	        input[type=range] {
            -webkit-appearance: none;
            width: 100%;
            height: 8px;
            border-radius: 10px;
            background-color: #fff;
        }

        /*input[type=range]::-moz-range-progress {*/
        /*height: 0;*/
        /*}*/
        input[type=range]::-webkit-slider-thumb, input[type=range]::-moz-range-thumb {
            -webkit-appearance: none;
        }

        input[type=range]::-webkit-slider-runnable-track {
            height: 8px;
            border-radius: 20px;
        }

        input[type=range]::-moz-range-track {
            height: 8px;
            border-radius: 20px;
            background-color: transparent;
        }

        input[type=range]:focus {
            outline: none;
        }

        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            margin-top: -3px;
            height: 14px;
            width: 14px;
            background: #eb7470;
            border-radius: 50%;
            border: solid 3px #fff;
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
        }

        input[type=range]::-moz-range-thumb {
            -webkit-appearance: none;
            margin-top: -3px;
            height: 10px;
            width: 10px;
            background: #eb7470;
            border-radius: 50%;
            border: solid 3px #fff;
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
        }
	
	@keyframes myfirst{
		0%{
			transform: rotateZ(0deg);
		}
	100%{
			transform: rotateZ(360deg);
		}
	}
</style>