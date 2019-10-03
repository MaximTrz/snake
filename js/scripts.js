window.onload = function (e) {

    var div = document.querySelector('.fields');
    var matrix = new Matrix(div, 15, 15);
    matrix.create();
    
    var fruit = new Fruit(matrix, [[1, 4]]);
    fruit.show();

    var points = 0;
    
    (new Wall(matrix, [[4, 7], [5, 7], [6, 7], [7, 7]])).show();

    (new Wall(matrix, [[4, 9], [5, 9], [6, 9], [7, 9]])).show();

    (new Wall(matrix, [[9, 7], [10, 7], [11, 7], [12, 7]])).show();
    
    (new Wall(matrix, [[9, 9], [10, 9], [11, 9], [12, 9]])).show();

    
    var snake = new Snake(matrix, [[5, 5], [4, 5], [3, 5]], 'right');
    snake.show();
    
    document.onkeydown = function(e){
        
        //snake.course = e.keyCode;
        
        /* добавить защиту от смены курса на противоположный */
        switch(e.keyCode){
            case 37:
                snake.changeCourse('left');
                break;
            case 38:                
                snake.changeCourse('up');
                break;
            case 39:
                snake.changeCourse('right');                
                break;
            case 40:
                snake.changeCourse('down');
                break;
        }
    }
    
    let timer = setInterval(() => {
        snake.move();
        
        if(!snake.alive){
            clearInterval(timer);
            alert('gameover');
        }

        if (snake.getEat()){
            
            points++;
            
            let x,y;

            while ( (matrix.getCell(x,y)) !='' ){
                x = Math.trunc((Math.random()*15)+1); 
                y = Math.trunc((Math.random()*15)+1);
            }

            
            (new Fruit(matrix, [[x, y]])).show();
            
            
            console.log(points);
        }

        /* 
         * если покушала, новый фрукт на случайном поле + очки
         * 
         * */
    }, 200);
}
