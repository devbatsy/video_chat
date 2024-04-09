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
setStyle([
    {
        nameTag:'settings',
        style:{
            height:'80%',
            maxHeight:'400px',
            width:'300px',
            transition:'transform linear .3s',
            position:'relative',
            borderRadius:'15px',
            padding:'10px',
            paddingTop:'70px'
        }
    }
])

sydDOM.setting_container = () =>{
    return createElement(
        'div',
        {
            style:`height:100vh;width:100vw;background:rgba(0,0,0,.7);position:absolute;transition:opacity linear .3s;align-items:center;z-index:200;display:${preState(['setting_container','d'],'none')};opacity:${preState(['setting_container','o'],'0')}`
        },
        [
            sydDOM.setting_main()
        ],
        {
            createState:{
                stateName:'setting_container',
                state:{d:'none',o:'0'}
            },
            type:'setting_container'
        }
    )
}

sydDOM.setting_main = () =>{
    exit_settings = () =>{
        const stateOne = getState('setting_container');
        const stateTwo = getState('setting_main');

        stateOne.o = '0';
        stateTwo.trx = '-100%'
        useState('setting_container',{type:'a',value:stateOne});
        useState('setting_main',{type:'a',value:stateTwo});
        const timer = setTimeout(() =>{
            stateOne.d = 'none';
            useState('setting_container',{type:'a',value:stateOne});
            clearTimeout(timer)
        },300)
    }
    return createElement(
        'div',
        {
            style:styleComponent.settings() + `transform:translateX(${preState(['setting_main','trx'],'-100%')});background:${preState(['setting_main','bg'],'#F6F6F6')}`
        },
        [
            sydDOM.recButtonTemplate({type:'settings_exit'}).addAttr({style:styleComponent.recOnScreenButtons({method:'remove',style:['backgroundColor']})+'position:absolute;top:10px;right:10px;background-image:url("../img/exit.png")'}).addAttr({onclick:'exit_settings()'}),
            sydDOM.twoContent()
        ],
        {
            createState:{
                stateName:'setting_main',
                state:{trx:'-100%',bg:'#F6F6F6'}
            },
            type:'setting_main'
        }
    )
}

sydDOM.twoContent = () =>{
    return createElement(
        'div',
        {
            style:`height:60px;width:100%;display:flex;justify-content:space-between;cursor:pointer;padding:0 15px;align-items:center;background:${preState(['setting_main','bg'],'#F6F6F6') === '#F6F6F6' ? '#fff' : '#161929'};border-radius:40px;color:${preState(['setting_main','bg'],'#F6F6F6') === '#F6F6F6' ? '#000' : '#fff'}`,
            onclick:'switchF()'
        },
        [
            createElement('p',{},['Theme']),
            sydDOM.switch()
        ]
    )
}

sydDOM.switch = () =>{
    return createElement(
        'div',
        {//background://#DFEBFF
            style:`height:30px;width:50px;padding:5px;background:${preState(['setting_main','bg'],'#F6F6F6') === '#F6F6F6' ? '#DFEBFF' : '#242737'};border-radius:20px;`,
            class:'select'
        },
        [
            sydDOM.Sball()
        ]
    )
}
sydDOM.Sball = () =>{
    switchF = () =>{
        //STATES DECLERATION
        const navStateOne = getState
        ('chat_mode_nav');
        const videoStateOne = getState('subChat');
        const topTabTStateOne = getState('topTab');
        const msg_part_stateOne = getState('text_chat_participant');
        const utilitiesState = getState('utilities_msg_kit');
        const settingState = getState('setting_main')

        const darkTheme = () =>{
            // STATES UPDATES
            navStateOne.bg = '#161929';
            videoStateOne.bg = '#1F2335';
            topTabTStateOne.bg = '#161929';
            msg_part_stateOne.bg = '#242737'
            utilitiesState.bg = '#161929';
            settingState.bg = '#242737'
        }
        const lightTheme = () =>{
            // STATES UPDATES
            navStateOne.bg = '#fff';
            videoStateOne.bg = '#EDF0F6';
            topTabTStateOne.bg = '#fff';
            msg_part_stateOne.bg = '#F6F6F6';
            utilitiesState.bg = '#fff';
            settingState.bg = '#F6F6F6'
        }
        const theme_state = preState(['Sball'],0);
        switch(true)
        {
            case theme_state === 100:
                darkTheme();
                break;
            default:
                lightTheme()
        }
        //USESTATE UPDATE SECTION
        useState('chat_mode_nav',{type:'a',value:navStateOne})
        useState('subChat',{type:'a',value:videoStateOne});
        useState('topTab',{type:'a',value:topTabTStateOne})
        useState('text_chat_participant',{type:'a',value:msg_part_stateOne})
        useState('utilities_msg_kit',{type:'a',value:utilitiesState})
        useState('setting_main',{type:'a',value:settingState})

        toggleParticipant_message_tab(getState('participants_streamer_btn').mode)
        
        useState('Sball')
    }
    return createElement(
        'div',
        {
            style:`height:20px;width:20px;background:#0060FF;border-radius:50%;transform:translateX(${preState(['Sball'],0)}%);transition:transform linear .3s;cursor:pointer;`,
        },
        [],
        {
            createState:{
                stateName:'Sball',
                tenary:true,
                tenaryOptions:[0,100]
            },
            type:'Sball'
        }
    )
}