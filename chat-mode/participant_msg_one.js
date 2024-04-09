import { 
	DomType,
	sydDOM,
	setStyle,
	styleComponent,
	getState,
	useState,
    preState,
	createElement 
} from "../sydneyDom.js";

import {} from './text_msg_design.js'
import {} from './participant_design.js'


setStyle([
    {
        nameTag:'topTabBtnStyle',
        style:{
            padding:'10px 20px',
            background:'#DFEBFF',
            borderRadius:'40px',
        }
    }
])

sydDOM.topTab = () =>{
    toggleParticipant_message_tab = (mode) =>{
        let add = mode;
        let remove = add === 'message_streamer_btn' ? 'participants_streamer_btn' : 'message_streamer_btn';

        //BUTTON UPDATE SECTION

        const CaddState = getState(add);
        const CremoveState = getState(remove);
        CaddState.bg = (preState(['topTab','bg'],'#fff') === '#fff' ? '#DFEBFF' : '#1E2757')
        CremoveState.bg = 'unset';
        //STORE MODE IN STATES 
        CaddState.mode = mode;
        CremoveState.mode = mode;
        useState(add,{type:'a',value:CaddState})
        useState(remove,{type:'a',value:CremoveState})

        // PAGE UPDATE SECTION

        const CaddPageState = getState(add + '_t');
        const CremovePageState = getState(remove + '_t');

        CaddPageState.z = '120';
        CaddPageState.o = '1';
        CremovePageState.o = '0';
        CremovePageState.z = '100';
        useState(add + '_t',{type:'a',value:CaddPageState})
        useState(remove + '_t',{type:'a',value:CremovePageState})
        
    }

    return createElement(
        'div',
        {
            style:styleComponent.btn_section([
                {method:'remove',style:['bottom','left']},
                {method:'add',style:{
                    width:'100%',
                    padding:'0 15px',
                    minHeight:'70px',
                    boxShadow:'0 0 3px #000',
                    columnGap:'10px',
                    background:`${preState(['topTab','bg'],'#fff')}`,
                    zIndex:'120'
                }}
            ])
        },
        [
            sydDOM.go_to_streaming(),
            createElement(
                'div',
                {style:'width:100%;display:inherit;justify-content:space-between;column-gap:10px;'},
                [
                    sydDOM.message_streamer_btn(),
                    sydDOM.participants_streamer_btn()
                ]
            ),
        ],
        {
            createState:{
                stateName:'topTab',
                state:{bg:'#fff'}
            },
            type:'topTab'
        }
    )
}

sydDOM.go_to_streaming = () =>{
    back_to_stream_page = () =>{
        let C_participant_state = getState('text_chat_participant');
        C_participant_state.o = '0';
        useState('text_chat_participant',{type:'a',value:C_participant_state})
        const timer = setTimeout(() => {
            C_participant_state.z = '90';
            C_participant_state.t = '80%';
            useState('text_chat_participant',{type:'a',value:C_participant_state})
            clearTimeout(timer)
        }, 300);
    }
    return createElement(
        'div',
        {
            style:styleComponent.recOnScreenButtons({method:'add',style:{backgroundImage:'url("../img/back.png")',backgroundColor:'unset'}}),
            class:'select recButton',
            id:'go_to_streaming',
            onclick:'back_to_stream_page()'
        },
        []
    )
}

sydDOM.message_streamer_btn = (number = 0) =>{
    return createElement(
        'div',
        {
            style:styleComponent.topTabBtnStyle({method:'add',style:{
                background:`${preState(['message_streamer_btn','bg'],'unset')};color:${preState(['message_streamer_btn','bg'],'unset') === 'unset' ? (preState(['topTab','bg'],'#fff') === '#fff' ? 'unset' : '#fff') : '#0060FF'};`
            }}),
            class:'select',
            onclick:`toggleParticipant_message_tab('message_streamer_btn')`
        },
        [
            "message " + `(${number})`
        ],
        {
            createState:{
                stateName:'message_streamer_btn',
                state:{bg:'unset'}
            },
            type:'message_streamer_btn'
        }
    )
}

sydDOM.participants_streamer_btn = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.topTabBtnStyle({method:'add',style:{
                background:`${preState(['participants_streamer_btn','bg'],'#DFEBFF')};color:${preState(['participants_streamer_btn','bg'],'#DFEBFF') === 'unset' ? (preState(['topTab','bg'],'#fff') === '#fff' ? 'unset' : '#fff') : '#0060FF'};`
            }}),
            class:'select',
            onclick:`toggleParticipant_message_tab('participants_streamer_btn')`
        },
        [
            "participants"
        ],
        {
            createState:{
                stateName:'participants_streamer_btn',
                state:{bg:'#DFEBFF',mode:'participants_streamer_btn'}
            },
            type:'participants_streamer_btn'
        }
    )
}


sydDOM.main_part_msg_section = () =>{
    return createElement(
        'div',
        {
            style:`margin-top:70px;height:calc(100% - 70px);position:relative;z-index:100`
        },
        [
            sydDOM.message_streamer_btn_t(),
            sydDOM.participants_streamer_btn_t()
        ]
    )
}