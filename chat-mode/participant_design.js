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

setStyle([
    {
        nameTag:'participant_msg_style',
        style:{
            position:'absolute',
            top:'0',
            left:'0',
            height:'100%',
            width:'100%',
            display:'flex',
            flexDirection:'column',
            rowGap:'50px',
            padding:'20px',
            // transition:'opacity linear .3s',
            overflowY:'scroll',
            background:'transparent'
        }
    }
])
class connectedUsersTeplate{
    constructor({username = 'xxxxxxxxxx',userImg = 'test.png', muted = true} = {})
    {
        this.background = '#fff';
        this.username = username;
        this.userImg = userImg;
        this.muted = muted ? '../img/mutemic.png' : '../img/mic.png'
    }
}

const timer = setTimeout( ()=>{
    clearTimeout(timer)
    setInterval(() =>{
        const getConnectedUsers_store = getState('participants_streamer_btn_t');
        const nav_participant_state = getState('nav_participant');
        const viewConnectedState = getState('viewConnectedDiv');
        nav_participant_state.part.push(
            new connectedUsersTeplate({username:'guy hawkins',userImg:'../img/man.avif'})
        )
        getConnectedUsers_store.connectedUsers.push(
            new connectedUsersTeplate({username:'guy hawkins',userImg:'../img/man.avif'})
        );
        viewConnectedState.data.push(
            new connectedUsersTeplate({username:'guy hawkins',userImg:'../img/man.avif'})
        )
        useState('participants_streamer_btn_t',{type:'a',value:getConnectedUsers_store})
        useState('nav_participant',{type:'a',value:nav_participant_state})
        useState('viewConnectedDiv',{type:'a',value:viewConnectedState})
    },5000);
},2000);

sydDOM.participants_streamer_btn_t = () =>{
    const spread_connected_users = () =>{
        const getConnectedUsers = preState(['participants_streamer_btn_t','connectedUsers'],[]);
        const users = []
        getConnectedUsers.forEach(val =>{
            users.push(
                sydDOM.reusableProfile({
                    bg:preState(['topTab','bg'],'#fff') === '#fff' ? '#fff' : '#161929',
                    color:preState(['topTab','bg'],'#fff') === '#fff' ? '#373131' : '#fff',
                    name:val.username,
                    url:val.userImg
                }),
            )
        })
        return users;
    }
    return createElement(
        'div',
        {
            style:styleComponent.participant_msg_style({method:'add',style:{
                rowGap:'15px',
                zIndex:preState(['participants_streamer_btn_t','z'],'120'),
                opacity:preState(['participants_streamer_btn_t','o'],'1'),
            }})
        },
        [
            ...spread_connected_users()
        ],
        {
            createState:{
                stateName:'participants_streamer_btn_t',
                state:{z:'120',o:'1',connectedUsers:[]}
            },
            type:'participants_streamer_btn_t'
        }
    )
}

// window.onload = (e) =>{

// }

// CONNECTION SIMULATION TEST COMPLETE