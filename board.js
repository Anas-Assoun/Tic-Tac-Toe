class Board {
    constructor(width, height, boxes, uncheckedBoxes, playerCheckedBoxes, ordiCheckedBoxes){
        this.width = width;
        this.height = height;
        this.boxes = boxes;
        this.uncheckedBoxes = uncheckedBoxes;
        this.playerCheckedBoxes = playerCheckedBoxes;
        this.ordiCheckedBoxes = ordiCheckedBoxes;
        this.boxW = this.width/3;
        this.boxH = this.height/3;
        this.done = false;
        this.turn = 0;
        this.marksHandler = [xMark,oMark];
        this.winnerID;
        this.round = 1;
    }


    pushBoxes(){
        for(let i=0; i<this.boxes/3; i++){
            for(let j=0; j<this.boxes/3; j++){
                this.uncheckedBoxes.push({x:j,y:i});
            }
        }
    }

    drawMark(img,x,y,width,height){
        c.drawImage(img,x,y,width,height);
    }

    drawBoxes(){
        this.uncheckedBoxes.forEach(ele => {
            c.beginPath();
            c.rect(ele.x*this.boxW,
                    ele.y*this.boxH,
                    this.boxW,
                    this.boxH);
            c.stroke();
        });

        
        this.playerCheckedBoxes.forEach(ele => {
            c.beginPath();
            c.rect(ele.position.x*this.boxW,
                    ele.position.y*this.boxH,
                    this.boxW,
                    this.boxH);
            c.stroke();
            this.drawMark(this.marksHandler[ele.playerId],ele.position.x*this.boxW, ele.position.y*this.boxH, this.boxW, this.boxH)
        });
        

        this.ordiCheckedBoxes.forEach(ele => {
            c.beginPath();
            c.rect(ele.position.x*this.boxW,
                    ele.position.y*this.boxH,
                    this.boxW,
                    this.boxH);
            c.stroke();
            this.drawMark(this.marksHandler[ele.playerId],ele.position.x*this.boxW, ele.position.y*this.boxH, this.boxW, this.boxH)
        });
    }

    traversElems(boxX,boxY){

        if(this.turn == 0){
            this.uncheckedBoxes.forEach((ele,index) =>{
                if(ele.x == boxX && ele.y == boxY){
                    this.uncheckedBoxes.splice(index, 1);
                    this.playerCheckedBoxes.push({position:{x:boxX, y:boxY}, playerId: this.turn});
                    this.turn = 1;
                }
            });
        }else{
            this.uncheckedBoxes.forEach((ele,index) =>{
                if(ele.x == boxX && ele.y == boxY){
                    this.uncheckedBoxes.splice(index, 1);
                    this.ordiCheckedBoxes.push({position:{x:boxX, y:boxY}, playerId: this.turn});
                    this.turn = 0;
                }
            });
        }
        
    }


    checkBox(){
        document.addEventListener('click',(e)=>{
            if(this.done){
                if(e.clientX-canvasOffset.width<this.width && e.clientX-canvasOffset.width>=0 && e.clientY-canvasOffset.height<this.height && e.clientY-canvasOffset.height>=0){
                    let boxX = Math.floor((e.clientX-canvasOffset.width)/this.boxW);
                    let boxY = Math.floor((e.clientY-canvasOffset.height)/this.boxH);
                    if(!(JSON.stringify(this.playerCheckedBoxes).includes(`"position":{"x":${boxX},"y":${boxY}}`))){
                        if(!(JSON.stringify(this.ordiCheckedBoxes).includes(`"position":{"x":${boxX},"y":${boxY}}`))){
                            this.traversElems(boxX,boxY);
                            // this.checkWinner();
                            playerOrdi.checkBoard();
                            this.checkWinner();
                        }
                    }
                }
            }
        })
    }


    checkWinner(){
        let wasFoundP;
        let wasFoundO;
        for (let i = 0; i < progress.winStatements.length; i++) {
            const winStatement = progress.winStatements[i];
            wasFoundP = 0;
            wasFoundO = 0;
            winStatement.forEach((pos)=>{
                if(board.playerCheckedBoxes.find(item => _.isEqual(item.position,pos))){
                    wasFoundP += 1;

                }
            })
            if(wasFoundP >=3){
                this.winnerID = 0;
            }

            winStatement.forEach((pos)=>{
                if(board.ordiCheckedBoxes.find(item => _.isEqual(item.position,pos))){
                    wasFoundO += 1;
                    
                }
            })
            if(wasFoundO >=3){
                this.winnerID = 1;
                
            }
            
        }


        if(this.uncheckedBoxes.length < 1 || typeof(this.winnerID) === 'number'){
            let winnerHolder;
            this.round++;
            if(typeof(this.winnerID) === 'number'){
                winnerHolder = document.querySelector(`#player${this.winnerID}`);
                switch (this.winnerID) {
                    case 0:
                        player.score++;
                        winnerHolder.innerHTML = player.score;
                        break;
                    case 1:
                        playerOrdi.score++;
                        winnerHolder.innerHTML = playerOrdi.score;
                        break;
                
                }
                
            }
            document.querySelector('.theGame .round span').innerHTML = this.round;
            setTimeout(()=>{
                board.uncheckedBoxes = [];
                board.pushBoxes();
                board.playerCheckedBoxes = []
                board.ordiCheckedBoxes = []
                board.turn = 0;
                this.winnerID = undefined;
                if(this.round >= 4){
                    /* player.score = 0;
                    playerOrdi.score = 0;
                    document.querySelector(`#player0`).innerHTML = player.score;
                    document.querySelector(`#player1`).innerHTML = playerOrdi.score;
                    this.round = 1;
                    document.querySelector('.theGame .round span').innerHTML = this.round; */
                    let winnerIs = player.score - playerOrdi.score;


                   
                    
                    document.querySelector('.gameContainer').innerHTML = 
                    `
                    <h1>Winner !</h1>
                    <div class="winner">
                    <div  class="trophy">
                        <img src="./assets/trophy.png" alt="">
                    </div>
                        <div class="theWinner">
                            <img src=${winnerIs < 0 ? playerOrdi.avatar : player.avatar} alt="">
                            <p class="winner_name">${winnerIs < 0 ?playerOrdi.username : player.username}</p>
                        </div>
                        <div  class="trophy">
                        <img src="./assets/trophy.png" alt="">
                    </div>
                    </div>
                    `
                    if(winnerIs < 0){
                        var failaudio = new Audio('./assets/faileffect.mp3');
                        failaudio.play();
                    }else{
                        var winaudio = new Audio('./assets/wineffect.mp3');
                        winaudio.play();
                    }
                }
            }, 2000);
        }
        

    }


}

const board = new Board(size.width, size.height, 9, [], [], []);

//board.drawOutline();
board.pushBoxes();
board.checkBox();
