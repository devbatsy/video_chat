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

setStyle([
    {
        nameTag:'roundImage',
        style:{
            height:'40px',
            width:'40px',
            minHeight:'40px',
            minWidth:'40px',
            borderRadius:'50%',
            color:'#0060FF'
        }
    }
])

sydDOM.chat_mode_nav = () =>{
    return createElement(
        'div',
        {
            style:`display:flex;min-height:70px;align-items:center;padding:5px;justify-content:space-between;height:fit-content;width:100%;z-index:100;background:${preState(['chat_mode_nav','bg'],'#fff')};`
        },
        [
            sydDOM.nav_chat_mode_icon(),
            sydDOM.nav_nxt_section()
        ],
        {
            createState:{
                stateName:'chat_mode_nav',
                state:{bg:'#fff'}
            },
            type:'chat_mode_nav'
        }
    )
}

sydDOM.nav_chat_mode_icon = () =>{
    navIconChatMode = () =>{
        console.log('am clicking the navIconChatMode')
    }
    return createElement(//${preState(['chat_mode_nav','bg'],'#fff') === '#fff' ? '#0060FF' : '#fff'}
        'div',
        {
            style:styleComponent.bg({method:'add',style:{backgroundSize:'80%',backgroundColor:'transparent'}})+`height:50px;width:50px;border-right:2px solid #0060FF;background-image:url('${preState(['nav_chat_mode_icon','bg'],'../img/tVideo.png')}')`,
            onclick:'navIconChatMode()',
            id:'nav_chat_mode_icon'
        }
    )
}

// sydDOM.back_to_front_page = () =>{
//     return createElement(
//         'div',
//         {
//             style:styleComponent.bg({method:'add',style:{backgroundImage:'url("../img/tVideo.png")',backgroundColor:'transparent'}})+'height:30px;width:30px;border-right:1px solid #EAE9E9;padding:3px;display:none',
//             id:'back_to_front_page'
//         }
//     )
// }

sydDOM.navTwinTab = () =>{
    go_to_partcipant_msg_section = (mode) =>{
        let C_participant_state = getState('text_chat_participant');
        C_participant_state.z = '120';
            C_participant_state.o = '1';
            C_participant_state.t = '0';
            useState('text_chat_participant',{type:'a',value:C_participant_state});
            toggleParticipant_message_tab(mode)
    }
    return createElement(
        'div',
        { 
            style:`height:40px;width:80px;background:${preState(['chat_mode_nav','bg'],'#fff') === '#fff' ? '#DFEBFF' : '#1E2757'};border-radius:10px;align-items:center;justify-content:space-between;padding:0 5px`,
            id:'navTwinTab'
        },
        [
            sydDOM.nav_twin_tab_participant(),
            sydDOM.nav_twin_tab_msg()
        ]
    )
}

sydDOM.nav_twin_tab_participant = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.recOnScreenButtons({method:'remove',style:['backgroundColor']})+'background-image:url("../img/participant.png")',
            class:'select recButton',
            onclick:'go_to_partcipant_msg_section("participants_streamer_btn")'
        }
    )
}

sydDOM.nav_twin_tab_msg = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.recOnScreenButtons({method:'remove',style:['backgroundColor']})+'background-image:url("../img/msg.png")',
            class:'select recButton',
            onclick:'go_to_partcipant_msg_section("message_streamer_btn")'
        }
    )
}

sydDOM.nav_nxt_section = () =>{
    return createElement(
        'div',
        {
            style:'display:flex;justify-content:space-between;align-items:center;padding-left:15px;height:100%;width:100%;column-gap:10px'
        },
        [
            sydDOM.nav_titleBlock(),
            sydDOM.navTwinTab(),
            sydDOM.nav_participant(),
            sydDOM.moderator()
        ]
    )
}

sydDOM.nav_titleBlock = () =>{
    return createElement(
        'div',
        {
            style:'padding:5px;margin-right:30px;height:fit-content'
        },
        [
            sydDOM.nav_title(),
            sydDOM.Date()
        ]
    )
}

sydDOM.nav_title = () =>{
    return createElement(
        'h4',
        {style:`margin-bottom:15px;font-weight:700;text-transform:capitalize;color:${preState(['chat_mode_nav','bg'],'#fff') === '#fff' ? '#373131' : '#fff'}`,class:'nav_title'},
        [
            preState(['nav_title','txt'],'work and sales')
        ],
        {
            createState:{
                stateName:'nav_title',
                state:{txt:'work and sales'}
            },
            type:'nav_title'
        }
    )
}
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
sydDOM.Date = () =>{
    const generateDate_Time = () =>{
        let array = new Array();
        const date = new Date();
        // array = ['jan 12th, 2020','11:00 AM']
        array.push(`${months[date.getMonth()]} ${date.getUTCDate()}, ${date.getFullYear()}`,`${date.getHours().toString().length === 1 ? '0'+date.getHours().toString() : date.getHours().toString()}:${date.getMinutes().toString().length === 1 ? '0'+date.getMinutes().toString() : date.getMinutes().toString()}`)
        //run some date generating code here
        return array;
    }
    return createElement(
        'div',
        {
            style:'display:flex;height:20px;width:fit-content;column-gap:5px;font-size:12px;color:#ACACAC;text-transform:capitalize;padding:2px'
        },
        [
            generateDate_Time()[0],
            createElement('div',{style:'height:100%;width:1px;background:lightgrey'}),
            generateDate_Time()[1]
        ]
    )
}

sydDOM.nav_participant = () =>{
    const generateCircularParticipant = () =>{
        const participants = preState(['nav_participant','part'],[]);
        const childArray = new Array();
        // let borderClr = 
        
        for(let i = 0; i < participants.length; i++)
        {
            if(i > 3)
            {
                childArray.push(
                    sydDOM.nav_circleProfilePic(undefined,i,participants.length-i,preState(['nav_participant','childB']))
                )
                break
            }else{
                childArray.push(
                    sydDOM.nav_circleProfilePic(participants[i].userImg,i,undefined,preState(['nav_participant','childB']))
                )
            }
        }
        return childArray
    }
    return createElement(
        'div',
        {
            style:'height:50px;width:fit-content;min-width:150px;position:relative',
            id:'adjustNavParticipant'
        },
        [
            ...generateCircularParticipant()
        ],
        {
            createState:{
                stateName:'nav_participant',
                state:{part:[],childB:'#fff'}
            },
            type:'nav_participant'
        }
    )
}

sydDOM.nav_circleProfilePic = (bg = '',idx,remain,borderC) =>{
    // console.log((idx * 30)-(10*idx) < 0 ? 0 : (idx * 30)-(10*idx))
    return createElement(
        'div',
        {
            style:styleComponent.bg()+`background-image:url('${bg}');position:absolute;top:50%;transform:translateY(-50%);left:${(idx * 30)-(10*idx) < 0 ? 0 : (idx * 30)-(10*idx)}px;display:flex;justify-content:center;align-items:center;border:2px solid ${preState(['chat_mode_nav','bg'],'#fff') === '#fff' ? '#fff' : '#161929'};font-size:13px;`+styleComponent.roundImage()
        },
        [
            remain === undefined ? '' : `+${remain}`
        ]
    )
}

sydDOM.moderator = () =>{
    return createElement(
        'div',
        {
            style:`background:${preState(['chat_mode_nav','bg'],'#fff') === '#fff' ? '#F6F6F6' : '#1E2757'};border-radius:30px;align-items:center;color:${preState(['chat_mode_nav','bg'],'#fff') === '#fff' ? '#373131' : '#fff'}`,
            class:'nav_title',
            id:'adjustModerator'
        },
        [
            sydDOM.reusableProfile({msg:'moderator'})
        ]
    )
}

sydDOM.reusableProfile = ({url = 'test.png',name = 'nworah favour',msg = '',bg = 'transparent',color = 'unset'} = {}) =>{
    return createElement(
        'div',
        {
            style:'display:flex;column-gap:15px;align-items:center;height:fit-content;width:100%;'+`background-color:${bg};padding:8px 8px;border-radius:20px`
        },
        [
            sydDOM.circleProfilePic(url),
            createElement(
                'div',
                {
                    style:'display:flex;flex-direction:column;row-gap:5px;text-transform:capitalize'
                },
                [
                    createElement('h5',{style:`font-weight:700;color:${color}`},[name]),
                    msg === '' ? '' : createElement('small',{style:'font-weight:300;color:grey'},[msg])

                ]
            )
        ]
    )
}

sydDOM.circleProfilePic = (url) =>{
    return createElement(
        'div',
        {
            style:styleComponent.roundImage()+styleComponent.bg({method:'remove',style:['backgroundColor']})+`background-image:url('${url}')`
        }
    )
}