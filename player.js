class Player{
    constructor(username,avatar){
        this.username = username;
        this.avatar = avatar;
        this.score = 0;
        
    }
}


// const {username, avatarId} = userInfo;
const player = new Player(localStorage.getItem('username'),localStorage.getItem('avatar'));
