class Progress{
    constructor(){
        this.winStatements = [
            [{x:0,y:0},{x:0,y:1},{x:0,y:2}],
            [{x:1,y:0},{x:1,y:1},{x:1,y:2}],
            [{x:2,y:0},{x:2,y:1},{x:2,y:2}],
            
            [{x:0,y:0},{x:1,y:0},{x:2,y:0}],
            [{x:0,y:1},{x:1,y:1},{x:2,y:1}],
            [{x:0,y:2},{x:1,y:2},{x:2,y:2}],

            [{x:0,y:0},{x:1,y:1},{x:2,y:2}],
            [{x:2,y:0},{x:1,y:1},{x:0,y:2}]
        ];
    }

    
}

const progress = new Progress();



function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,size.width,size.height);
    board.drawBoxes();
}
animate();