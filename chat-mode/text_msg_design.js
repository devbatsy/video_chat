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

class textObjectTemplate
{
    constructor({username = 'you',userImg = 'test.png', msg = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita obcaecati eligendi illo deleniti! Cum, error.'} = {}, type = 'user')
    {
        const date = new Date();
        this.username = username;
        this.userImg = userImg;
        this.time = `${date.getHours().toString().length === 1 ? '0'+date.getHours().toString() : date.getHours().toString()}:${date.getMinutes().toString().length === 1 ? '0'+date.getMinutes().toString() : date.getMinutes().toString()}`;
        this.geo = date.getHours() >= 12 ? ' PM' : ' AM';
        this.time = this.time+this.geo;
        this.msg = msg;
        this.type = type;
    }
}

setStyle([
    {
        nameTag:'chatStyle',
        style:{
            height:'fit-content',
            width:'fit-content',
            display:'flex',
            columnGap:'20px',
        }
    }
])

sydDOM.message_streamer_btn_t = () =>{
    const componentData = []
    const spreadAvailableChat = () =>{
        const get_message_chats_state = preState(['message_streamer_btn_t','chats'],[]);
        get_message_chats_state.forEach(val =>{
            const {username,time,userImg,msg} = val
            switch(true)
            {
                case val.username === 'you':
                    componentData.push(sydDOM.insideChat({username:username,time:time,userImg:userImg,msg:msg}));
                break;
                default:
                    componentData.push(sydDOM.outsideChat({username:username,time:time,userImg:userImg,msg:msg}));
            }
        })
        return componentData
    }
    return createElement(
        'div',
        {
            style:styleComponent.participant_msg_style({method:'add',style:{
                zIndex:preState(['message_streamer_btn_t','z'],'100'),
                opacity:preState(['message_streamer_btn_t','o'],'0'),
                paddingBottom:'140px',
                // background:`${preState(['message_streamer_btn_t','bg'],'#F6F6F6')}`
            }})
        },
        [
            ...spreadAvailableChat(),
            sydDOM.utilities_msg_kit()
        ],
        {
            createState:{
                stateName:'message_streamer_btn_t',
                state:{z:'100',o:'0',chats:[],bg:'#F6F6F6'}
            },
            type:'message_streamer_btn_t'
        }
    )
}

sydDOM.outsideChat = ({username, time, userImg, msg} = {}) =>{
    return createElement(
        'div',
        {
            style:styleComponent.chatStyle()
        },
        [
            sydDOM.circleProfilePic(userImg),
            createElement(
                'div',
                {
                    style:'display:flex;flex-direction:column;row-gap:5px'
                },
                [
                    createElement(
                        'div',
                        {
                            style:`background:${preState(['topTab','bg'],'#fff') === '#fff' ? '#fff' : '#161929'};`
                        },
                        [
                            sydDOM.name_time_bar(username,time,'row'),
                            sydDOM.actMessageComponent(msg)
                        ]
                    )
                ]
            )
        ]
    )
}

sydDOM.insideChat = ({username, time, userImg, msg} = {}) =>{
    const date = new Date();
    return createElement(
        'div',
        {
            style:styleComponent.chatStyle({method:'add',style:{flexDirection:'row-reverse',alignSelf:'flex-end'}})
        },
        [
            sydDOM.circleProfilePic(userImg),
            createElement(
                'div',
                {
                    style:'display:flex;flex-direction:column;row-gap:5px'
                },
                [
                    createElement(
                        'div',
                        {
                            style:`background:${preState(['topTab','bg'],'#fff') === '#fff' ? '#fff' : '#161929'};padding:5px;border-radius:15px;color:${preState(['topTab','bg'],'#fff') === '#fff' ? '#373131' : '#fff'}`
                        },
                        [
                            sydDOM.name_time_bar('you',time,'row-reverse'),
                            sydDOM.actMessageComponent(msg)
                        ]
                    )
                ]
            )
        ]
    )
}

sydDOM.name_time_bar = (name,time,drx) =>{
    return createElement(
        'div',
        {
            style:`display:flex;width:100%;justify-content:space-between;color:lightgrey;flex-direction:${drx};`
        },
        [
            createElement('small',{style:'color:#AFAFAF'},[name]),
            createElement('small',{style:'#A8A8A8'},[time]),
        ]
    )
}
sydDOM.actMessageComponent = (msg,txtAlg) =>{
    return createElement(
        'div',
        {
            style:'width:fit-content;max-width:350px;min-width:200px;padding:10px 0;border-radius:15px;font-size:14px'
        },
        [
            msg
        ]
    )
}
sydDOM.utilities_msg_kit = () =>{
    return createElement(
        'div',
        {
            style:`display:flex;flex-direction:column;row-gap:15px;width:100%;height:140px;position:fixed;bottom:0;left:0;background:${preState(['utilities_msg_kit','bg'],'#fff')};justify-content:center;padding:20px`
        },
        [
            sydDOM.isTypingSection(),
            sydDOM.messageBox()
        ],
        {
            createState:{
                stateName:'utilities_msg_kit',
                state:{bg:'#fff'}
            },
            type:'utilities_msg_kit'
        }
    )
}

sydDOM.isTypingSection = (name = 'xxxxxxx') =>{
    return createElement(
        'div',
        {
            style:`display:flex;column-gap:15px;height:fit-content;align-items:center;width:fit-content;opacity:${preState(['isTypingSection','o'],'1')}`
        },
        [
            sydDOM.typingAnimation('test.png'),//remember to put the loading git image
            createElement('small',{},[`${name}...`])
        ],
        {
            createState:{
                stateName:'isTypingSection',
                state:{o:'1'}
            },
            type:'isTypingSection'
        }
    )
}
sydDOM.typingAnimation = (gifImg) =>{
    return createElement(
        'div',
        {
            style:'min-height:25px;min-width:25px;height:25px;width:25px;border-radius:50%;'+styleComponent.bg([{method:'add',style:{backgroundImage:`url('${gifImg}')`}},{method:'remove',style:['backgroundColor']}])
        }
    )
}
sydDOM.messageBox = () =>{
    return createElement(
        'div',
        {
            style:`min-height:70px;width:100%;border-radius:40px;background:${preState(['utilities_msg_kit','bg'],'#fff') === '#fff' ? '#F6F6F6' : '#242737'};padding:10px;padding-left:20px;display:flex;align-items:center;column-gap:10px`
        },
        [
            sydDOM.typingAnimation('../img/upload.png').addAttr({class:'select'}),//rememeber to put button to access files content
            sydDOM.inputMessageBox(),
            sydDOM.sendButton()

        ]
    )
}

sydDOM.inputMessageBox = () =>{
    return createElement(
        'textarea',
        {
            style:`outline:none;resize:none;height:35px;padding:5px;padding-left:10px;width:100%;border:none;border-left:1px solid grey;background:unset;display:flex;align-items:center;color:${preState(['utilities_msg_kit','bg'],'#fff') === '#fff' ? '#373131' : '#fff'}`,
            placeholder:'Type Something...'
        },
        [],
        {
            type:'inputMessageBox'
        }
    )
}
sydDOM.sendButton = () =>{
    printTextbox_send = () =>{
        switch(true)
        {
            case virtualDom['inputMessageBox'].value.length > 0:
                const get_message_state = getState('message_streamer_btn_t');
                get_message_state.chats.push(new textObjectTemplate({msg:virtualDom['inputMessageBox'].value}));
                useState('message_streamer_btn_t',{type:'a',value:get_message_state})
            break;
            default:
                alert('please enter a message')
        }
    }
    return createElement(
        'div',
        {
            style:'height:40px;width:40px;min-height:40px;min-width:40px;border-radius:50%;'+styleComponent.bg([{method:'add',style:{backgroundImage:'url("../img/send.png")'}},{method:'remove',style:['backgroundColor']}]),
            class:'select',
            onclick:'printTextbox_send()'
        }
    )
}