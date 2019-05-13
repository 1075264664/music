<template>
 <video :src="msuer" controls="controls" height="300px"  width="100%">
您的浏览器不支持 video 标签。
</video>
</template>

<script>
	 export default{
	 	name:'Playmv',
	 	data(){
	 		return{
	 			 msuer:''
	 		}
	 	},
	 	created(){
	 		  
	 		  
	 		  console.log(this.$route.params.pid)
	 		
	 		this.axios.get('https://api.itooi.cn/music/netease/mvUrl?key=579621905&id='+this.$route.params.pid +'').then(r =>{
	 			 	
	 			  console.log(r)
	 		},err =>{
	 			console.log('错误')
	 		})
	 		
	 	}
	 }
</script>

<style>
</style>