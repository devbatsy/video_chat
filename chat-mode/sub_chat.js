import { 
	DomType,
	sydDOM,
	setStyle,
	styleComponent,
	getState,
	useState,
    preState,
	createElement,
    virtualDom
} from "../sydneyDom.js";

import {} from './participant_msg_one.js';
import {} from './settings.js'

setStyle([
    {
        nameTag:'subChat',
        style:{
            height:'calc(100% - 70px)',
            width:'100vw',
            background:'#EDF0F6',
            display:'flex',
            flexDirection:'row-reverse',
            justifyContent:'space-between;',

        }
    },
    {
        nameTag:'btn_section',
        style:{
            minHeight:'50px',
            height:'fit-content',
            width:'calc(100% - 20px)',
            background:'#fff',
            position:'absolute',
            bottom:'10px',
            left:'10px',
            borderRadius:'inherit',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        }
    },
    {
        nameTag:'recOnScreenButtons',
        style:{
            borderRadius:'50%',
            backgroundPosition:'center center',
            backgroundSize:'90%',
            backgroundRepeat:'no-repeat',
            backgroundColor:'#DFEBFF'
        }
    }
])

sydDOM.subChat = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.subChat()+`background:${preState(['subChat','bg'],'#EDF0F6')}`
        },
        [   
            sydDOM.text_chat_participant(),
            sydDOM.video_interaction_sec(),
        ],
        {
            createState:{
                stateName:'subChat',
                state:{bg:'#EDF0F6'}
            },
            type:'subChat'
        }
    )
}

sydDOM.video_interaction_sec = () =>{
    return createElement(
        'div',
        {
            style:`height:100%;width:100%;display:flex;flex-direction:column;row-gap:10px;position:relative;z-index:100;`
        },
        [
            sydDOM.video_interactUpper(),
        ]
    )
}

sydDOM.video_interactUpper = () =>
{
    return createElement(
        'div',
        {
            style:'display:flex;flex-direction:column;row-gap:10px;height:100%;width:100%;padding:10px;'
        },
        [
            sydDOM.streamerDiv(),
        ]
    )
}

sydDOM.viewConnectedDiv = () =>{
    const spread_connected_views = () =>{
        const viewConnectedState = preState(['viewConnectedDiv','data'],[]);
        const dataArray = new Array();

        viewConnectedState.forEach(val =>{
            dataArray.push(
                sydDOM.viewConnectedDivTabs({name:`${val.username.split(' ')[0] + '.' + val.username.split(' ')[1][0] + '.'}`,url:val.userImg,mutedUrl:val.muted}),
            )
        })
        return dataArray;
    }
    return createElement(
        'div',
        {
            style:'height:calc(100% - 90px);padding:10px 5px;width:fit-content;column-gap:15px;flex-direction:column;align-items:center;row-gap:15px;position:absolute;right:min(5% , 10px);top:20px;',
            id:'viewConnectedDiv'
        },
        [
                ...spread_connected_views()
        ],
        {
            createState:{
                stateName:'viewConnectedDiv',
                state:{data:[]}
            },
            type:'viewConnectedDiv'
        }
    )
}

sydDOM.viewConnectedDivTabs = ({name = 'you',url = 'test.png', mutedUrl = 'test.png'} = {}) =>{
    return createElement(
        'div',
        {
            style:'border-radius:10px;position:relative;color:#0060FF;border:1px solid #fff;text-transform:capitalize;'+styleComponent.bg({method:'add',style:{backgroundImage:`url('${url}')`,backgroundSize:'cover',backgroundColor:'unset'}}),
            class:"viewConnectedDivTabs"
        },
        [
            createElement('p',{style:'padding :3px 3px;border-radius:10px;position:absolute;top:2px;left:2px;text-align:left'},[name]),
            createElement('div',{style:'height:20px;width:20px;position:absolute;bottom:5px;right:5px;border-radius:50%;'+styleComponent.bg({method:'add',style:{backgroundImage:`url('${mutedUrl}')`,backgroundColor:'unset'}})})
        ]
    )
}

sydDOM.streamerDiv = () =>{
    return createElement(
        'div',
        {
            style:'height:100%;width:100%;border:2px solid #0060FF;border-radius:15px;position:relative'
        },
        [
            sydDOM.viewConnectedDiv(),
            sydDOM.btn_section(),
        ]
    )
}

sydDOM.btn_section = () =>{
    tog_settings = () =>{
        const stateOne = getState('setting_container');
        const stateTwo = getState('setting_main');

        stateOne.d = 'flex';
        useState('setting_container',{type:'a',value:stateOne});
        let timer1 = setTimeout(() => {
            stateOne.o = '1';
            stateTwo.trx = 'calc(0% + 10px)'
            useState('setting_container',{type:'a',value:stateOne});
            useState('setting_main',{type:'a',value:stateTwo});
            clearTimeout(timer1)
        }, 100);
    }
    return createElement(
        'div',
        {
            style:styleComponent.btn_section({method:'remove',style:['background']})
        },
        [
            createElement(
                'div',
                {
                    style:'width:100%;max-width:350px;display:inherit;justify-content:space-between;column-gap:10px;align-items:center'
                },
                [
                    sydDOM.recButtonTemplate({type:'mute/unmute video',img:'../img/video.png'}),
                    sydDOM.recButtonTemplate({type:'mute/unmute audio',img:'../img/Mic.png'}),
                    sydDOM.recButtonTemplate({type:'settings',img:'../img/setting.png'}).addAttr({onclick:'tog_settings()'}),
                    sydDOM.endCall(),
                ]
            ),
        ]
    )
}
sydDOM.recButtonTemplate = ({type = 'mute',bg = 'lightblue',img = 'test.png'} = {}) =>{
    return createElement(
        'div',
        {
            style:styleComponent.recOnScreenButtons({method:'add',style:{backgroundImage:`url("${img}")`,backgroundSize:'80%',backgroundColor:`${preState(['subChat','bg'],'#EDF0F6') === '#EDF0F6' ? '#DFEBFF' : '#1E2757'}`}}),
            class:'select recButton',
            title:type
        }
    )
}
sydDOM.endCall = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.recOnScreenButtons({method:'add',style:{backgroundImage:'url("../img/eCall.png")',width:'60px',height:'35px',backgroundColor:'#EB5757',borderRadius:'5px',backgroundSize:'contain'}}),
            class:'select',
            title:'end call'
        }
    )
}

sydDOM.text_chat_participant = () =>{
    function reversal()
    {
        let C_participant_state = getState('text_chat_participant');
        C_participant_state.z = '120';
        C_participant_state.o = '1';
        C_participant_state.t = '0';
        useState('text_chat_participant',{type:'a',value:C_participant_state})
    }
    window.onresize = (e) =>{
        if(window.innerWidth > 800)
        {
            reversal()
        }
    }
    window.onload = (e) =>{

        if(window.innerWidth > 800)
        {
            reversal()
        }
    }
    return createElement(
        'div',
        {
            style:`height:100%;background:#fff;padding-bottom:10px;background:${preState(['text_chat_participant','bg'],'#F6F6F6')};min-width:350px;z-index:${preState(['text_chat_participant','z'],'90')};opacity:${preState(['text_chat_participant','o'],'0')};transform:translateX(${preState(['text_chat_participant','t'],'80%')});overflow:hidden`,
            id:'text_chat_participant'
        },
        [
            sydDOM.topTab(),
            sydDOM.main_part_msg_section()
        ],
        {
            createState:{
                stateName:'text_chat_participant',
                state:{z:'90',o:'0',t:'80%',bg:'#F6F6F6'}
            },
            type:'text_chat_participant'
        }
    )
}