

var rows,cols;
var w =20;
var grid= [];
var current ;
var stack =[];
function setup() {
    createCanvas(500, 500);
    rows =  floor(width/w);
    cols =  floor(width/w);
   frameRate(20);
    for (var j = 0 ; j<rows ; j++) {
    	for (var  i =0 ; i<cols ; i++) {
    	var cell =  new Cell(i,j);
    		grid.push(cell);
    	}
    }
    current=grid[0];
  }
  
  function draw() {
    background(51);
    for (var  i= 0 ; i<grid.length; i++ ) {
    		grid[i].show();
    }

    //step1
    current.visited=true;

    current.heighlight();
   var next= current.checkneighbour();

   if(next) {
    next.visited=true;
      stack.push(current); 
    removewalls(current,next);
    current=next;
   }
   else if(stack.length>0) {
    current=stack.pop();

   }
  }
  function index(i,j) {
    if(i<0 || j<0 || i>cols-1 || j>rows-1) {
      return -1;
    }
    return i+j*cols;
  }
  function Cell(i,j) {
  	this.i=i;
  	this.j=j;
    this.walls = [true ,true ,true , true];
    this.visited=false;
    this.heighlight= function() {
      var x=this.i*w;
      var y = this.j*w;
      noStroke();
      fill(0,0,0,255);
      rect(x,y,w,w);


     
    }
  	this.show= function() {
  		var x=this.i*w;
  		var y = this.j*w;
  		stroke(255);
  		noFill();
      if(this.walls[0]) {
          line(x,y,x+w,y);
      }
  	   if(this.walls[1]) {
        line(x+w,y,x+w,y+w);
       }
       if(this.walls[2]) {
         line(x+w,y+w,x,y+w);
       }
       if(this.walls[3]) {
         line(x,y+w,x,y+w);
       }
       if(this.visited) {
        noStroke();
        fill(220,20,60);
        rect(x,y,w,w);
       }

  		
       	
  	}
    this.checkneighbour=function() {
          var neighbour = [];
          var top = grid[index(i,j-1)];
          var right = grid[index(i+1,j)];
          var bottom = grid[index(i,j+1)];
          var left = grid[index(i-1,j)];
          if(top && !top.visited) {
            neighbour.push(top);
          }
          if(right && !right.visited) {
            neighbour.push(right);
          }
          if(bottom && !bottom.visited) {
            neighbour.push(bottom);
          }
          if(left && !left.visited) {
            neighbour.push(left);
          }
          if(neighbour.length >0) {
            var k=Math.floor(Math.random() * (+neighbour.length )); 
            console.log(neighbour);
            return neighbour[k];
          }
          else {
            return undefined;
          }
    }
  }


function removewalls(a,b) {
  var x =a.i-b.i;
  if(x===1) {
    a.walls[3]=false;
    b.walls[1]=false;
  }
  else if (x===-1) {
    a.walls[1]=false;
    b.walls[3]=false;

  }
  var y =a.j-b.j;
  if(y===1) {
    a.walls[0]=false;
    b.walls[2]=false;
  }
  else if (y===-1) {
    a.walls[2]=false;
    b.walls[0]=false;
    
  }
}