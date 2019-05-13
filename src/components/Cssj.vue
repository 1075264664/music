<template>
<div>
   <button @click="add">数据</button>
   <button @click='Mush'>推荐</button>
   <button @click="heat">热歌</button>
</div>
</template>

<script>
	
	import qs from 'qs'
	
	export default {
		name:'Cssj',
		methods:{
			
	add(){
	   var params =  {
       	 "TransCode": "020112",
         "OpenId": "123456789",
         "Body": {
           "SongListId": "141998290"
        }
      };
        var paramsStr = qs.stringify(params);
				this.axios({
        		method: 'POST',
        		url:'https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0',
        		data: paramsStr
     		 }).then(result => {
     	         localStorage.setItem('paramsStr', JSON.stringify(result.data.data.songs));
     	         
      			})
			},
			Mush(){
				 this.axios.post('https://api.itooi.cn/music/netease/highQualitySongList?key=579621905&cat=全部&limit=100').then( r =>{
				 	
	
				 	
				 	localStorage.setItem('playlists', JSON.stringify(r.data.data.playlists));
		
				})
			},
			heat(){
				this.axios.post('https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0').then(r =>{
		    		    
	      
	   		      localStorage.setItem('Heat', JSON.stringify(r.data.data.songs));
	   	
		    	   
		    	})
			}
		}
	}
</script>

<style>
</style>