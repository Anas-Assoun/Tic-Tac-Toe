
class PlayerOrdi extends Player{
    constructor(username, avatar, score){
        super(username, avatar, score);
        this.ordiToPlay = {};
    };


    randomPic(inputArray){
        let randomNum = Math.floor(Math.random() * inputArray.length)
        return randomNum;
    }

    checkBoard(){
        let wasFound;
        if(board.playerCheckedBoxes.length <= 1){
            const rndNum= this.randomPic(board.uncheckedBoxes)
            const pickedBox = board.uncheckedBoxes[rndNum];
            board.uncheckedBoxes.splice(rndNum, 1);
            board.ordiCheckedBoxes.push({position:{x:pickedBox.x, y:pickedBox.y}, playerId: board.turn});
            board.turn = 0;
        }
        else {

            
            for (let i = 0; i < progress.winStatements.length; i++) {
                const winStatement = progress.winStatements[i];
                wasFound = 0;
                winStatement.forEach((pos)=>{
                    if(board.ordiCheckedBoxes.find(item => _.isEqual(item.position,pos))){
                        wasFound += 1;
                        // console.log(wasFound, pos, winStatement,'attack')

                    }else{
                        if(!(board.playerCheckedBoxes.find(item => _.isEqual(item.position,pos)))){
                            // console.log("////////", pos)
                            this.ordiToPlay = pos;
                        }
                    }
                })

                if(wasFound >= 2 && Object.keys(this.ordiToPlay).length !== 0){
                    break;
                }else{
                    this.ordiToPlay = {};
                }
            }


            
            if(Object.keys(this.ordiToPlay).length === 0){

                for (let i = 0; i < progress.winStatements.length; i++) {
                    const winStatement = progress.winStatements[i];
                    wasFound = 0;
                    winStatement.forEach((pos)=>{
                        if(board.playerCheckedBoxes.find(item => _.isEqual(item.position,pos))){
                            wasFound += 1;
    
                        }else{
                            if(!(board.ordiCheckedBoxes.find(item => _.isEqual(item.position,pos)))){
                                this.ordiToPlay = pos;
                            }
                        }
                    })
    
                    if(wasFound >= 2 && Object.keys(this.ordiToPlay).length !== 0){
                        break;
                    }
                }

            }

            
            
            // console.log(this.ordiToPlay);
            this.ordiMove();
            
        }
        
    }

    ordiMove(){
        board.traversElems(this.ordiToPlay.x, this.ordiToPlay.y);
        this.ordiToPlay = {};
    }
}

const playerOrdi = new PlayerOrdi('Computer','./assets/computer_avatar.png',0);

