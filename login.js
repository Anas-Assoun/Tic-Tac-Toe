const usernameInput = document.querySelector('#username');

let userInfo = {
    username:'Player',
    avatar:''
};



document.querySelector('#username').addEventListener('change', (e)=>{
    userInfo.username = e.target.value;
})

document.querySelectorAll('.avatarContainer span').forEach(ele => ele.addEventListener('click', (e)=>{
    userInfo.avatar = e.target.getAttribute("src");
    e.target.parentElement.style.opacity = 1;
    e.target.parentElement.style.border = "3px solid #fd04e8";
   
}))

const btn = document.querySelector('button[type="submit"]');
const loginHandler = document.querySelector('.loginHandler');
btn.addEventListener('click', (e)=>{
    e.preventDefault();
    loginHandler.style.width = 0;
    loginHandler.style.height = 0;
    loginHandler.style.opacity = 0;
    if(localStorage.length<1 || !(userInfo.username == 'Player' && userInfo.avatar == '')){
        document.querySelector(".profile.player img").src = userInfo.avatar;
        document.querySelector(".profile.player p").innerHTML = userInfo.username;
        localStorage.setItem('username', userInfo.username);
        localStorage.setItem('avatar', userInfo.avatar);
    }else{
        document.querySelector(".profile.player img").src = localStorage.getItem('avatar');
        document.querySelector(".profile.player p").innerHTML = localStorage.getItem('username');
    }
    board.done = true;
    alert("Don't forget to activate the sound  !!!!!!!");
}, false);


