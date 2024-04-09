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
} from "../sydneyDom.js";
import {} from './nav.js'
import {} from './sub_chat.js'

setStyle([
    {
        nameTag:'chatModePage',
        style:{
            height:'100%',
            width:'100%',
            display:'flex',
            flexDirection:'column',
            position:'absolute',
            top:'0',
            left:'0'
        }
    }
])

sydDOM.chatModePage = () =>{
	return createElement(
		'div',
		{
			style:styleComponent.chatModePage()
		},
        [
            sydDOM.chat_mode_nav(),
            sydDOM.subChat()
        ]
	)
}