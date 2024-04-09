import { 
	DomType,
	sydDOM,
	setStyle,
	styleComponent,
	mount,
	getState,
	useState,
	preState,
	createElement 
} from "./sydneyDom.js";

import {} from './chat-mode/chat-mode-page.js'

setStyle([
	{
		nameTag:'container',
		style:{
			height:'100vh',
			width:'100vw',
			position:'relative',
			fontFamily:'ubuntu',
			overflow:'hidden',
			color:'#373131'
		}
	},
	{
		nameTag:'bg',
		style:{
			backgroundRepeat:'no-repeat',
			backgroundSize:'cover',
			backgroundPosition:'center',
			backgroundColor:'#DFEBFF'
		}
	}
])

sydDOM.container = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.container()
		},
		[
			// sydDOM.frontPage(),
			sydDOM.chatModePage(),
			sydDOM.setting_container()
		]
	)
}
sydDOM.frontPage = () =>{
	return createElement(
		'div',
		{
			style:''
		}
	)
}

mount(sydDOM.container())