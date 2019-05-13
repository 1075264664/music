
import RoutesCompone from './routesCompone.js'

export default[
 
			{
				path: '/',
				name: 'Index',
				component: RoutesCompone.Index,
			},
			{
					path: '/list',
					name: 'List',
					component: RoutesCompone.List
			},
			

 {
 	path:'/cssj',
 	name:'Cssj',
 	component:RoutesCompone.Cssj
 },
 {
 	path:'/player/:pid',
 	name:'Player',
 	component:RoutesCompone.Player
 },
  {
 	path:'/search',
 	name:'Search',
 	component:RoutesCompone.Search
 },
 {
 	path:'/hotsongs/:pid',
 	name:'Hotsongs',
 	component:RoutesCompone.Hotsongs
 },
  {
 	path:'/playmv/:pid',
 	name:'Playmv',
 	component:RoutesCompone.Playmv
 },
]
