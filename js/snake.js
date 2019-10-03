class Snake extends Elem{
    
    constructor(matrix, coords, course){

        super(matrix, coords);
        this.value = 'snake';
        this.course = course;
        this.alive = true;
        this.eat = false;

    }

    move(){

        if(!this.alive){
            return;
        }
        
        var head = this.cords[0].slice();

        switch(this.course){
            case 'right':
                head[0]++;
                break;
            case 'left':
                head[0]--;
                break;
            case 'up':
                head[1]--;
                break;
            case 'down':
                head[1]++;
                break;
        }
        
        if(!this._checkAlive(head)){
            this.alive = false;
            return;
        }
        
        /* getCell 
         *  фрукт - покушали, хвост не отпал
         *  стена - gameover
         *  змея - gameoverстена - gameover
         * */
        console.log(  ) ;

        var nextCell = this.matrix.getCell(head[0], head[1]);

        switch(nextCell){
            
            case 'wall':
                this.alive = false;
                return;
            
            case 'snake':
                this.alive = false;
            return;

            case 'fruit':
                this.eat = true;
            break;

            default:
                this.eat = false;
            break;

        }

        var tail = this.cords.pop();
        this.matrix.setCell(tail[0], tail[1], '');
        
        this.cords.unshift(head);
        this.matrix.setCell(head[0], head[1], 'snake');

        if (this.eat){
            
            this.cords.push([tail[0], tail[1]]);

        }

    }

    changeCourse (course){

        if ( (course =='left')&&(this.course=='right') || (course =='right')&&(this.course=='left')  
        || (course =='up')&&(this.course=='down') || (course =='down')&&(this.course=='up') ){
            return;
        }

        this.course = course;

    } 

    _checkAlive(head){
        return head[0] >= 1 && head[0] <= this.matrix.cols &&
               head[1] >= 1 && head[1] <= this.matrix.rows;
    }

    getEat(){
        return this.eat;
    }


}