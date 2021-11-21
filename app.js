
let board=[[]];
let clicked=false;
let chosenPiece;
let chosenPieceName;
let chosenPieceIsFirstTime;
let chosenPieceSrc;
for (let i=0;i<8;i++){
   // board[j]="";
    var line=document.createElement('div');
    line.setAttribute("id","line"+i);
    document.getElementById("board").appendChild(line);
    }
for (let j=0;j<8;j++){
    for (let i=0;i<8;i++){
         var spot=document.createElement('div');
         spot.setAttribute("id","button");
         if (j%2==0&&i%2==0){
         spot.setAttribute("id","spot"+j+i+'w');
         }
         else if (j%2==0){
             spot.setAttribute("id","spot"+j+i+'b');
         }
         else if (j%2!=0&&i%2==0){
            spot.setAttribute("id","spot"+j+i+'b');
            }
        else {spot.setAttribute("id","spot"+j+i+'w');}
         document.getElementById("line"+j).appendChild(spot);
         }
    }

var button=document.querySelectorAll('[id^="spot"]');
for (let i=0;i<button.length;i++){
button[i].addEventListener('click',()=>{
    if (clicked){
        if (chosenPieceName.includes('pawn')){
            if(checkValidMovePawn(chosenPiece,button[i].id,chosenPieceIsFirstTime)){
                console.log("right move");
                for (let k=0;k<pieceArray.length;k++){
                    if (pieceArray[k].positionn==chosenPiece){
                    pieceArray[k].movePawn(chosenPiece,button[i].id,chosenPieceSrc)
                    }
                }
            }
            else console.log("wromng move");
        }
        else if (chosenPieceName.includes('rook')){
            if (checkValidMoveRook(chosenPiece,button[i].id)){
                console.log("right move");
                for (let k=0;k<pieceArray.length;k++){
                    if (pieceArray[k].positionn==chosenPiece){
                    pieceArray[k].moveRook(chosenPiece,button[i].id,chosenPieceSrc);
                    }
                }
            }
        }
        else if (chosenPieceName.includes('knight'))
        //else if (chosenPieceName.includes('bishop'))
       // else if (chosenPieceName.includes('queen'))
       // else if (chosenPieceName.includes('king'))
    }
    else{
        if(document.getElementById(button[i].id).innerHTML==""){
            alert("Nothing is here");
            clicked=!clicked;
        }
        else{
        chosenPiece=button[i].id;
        chosenPieceSrc=document.querySelectorAll('#'+button[i].id+" img")[0].src;
        for (let i=0;i<pieceArray.length;i++){
            if (pieceArray[i].positionn==chosenPiece){
            chosenPieceIsFirstTime=pieceArray[i].isFirstTime;
            chosenPieceName=pieceArray[i].name;
            console.log(chosenPieceName);
            }
        }
        }
    }
    clicked=!clicked;
});
}

class Piece{
constructor(name,position,src,color){
    this.name=name;
    this.position=position;
    this.src=src;
    this.color=color;
    this.draww();
}
 draww(){
    var image=document.createElement('img');
    image.setAttribute("src",this.src);
    image.setAttribute("id","piece");
    document.getElementById(this.position).appendChild(image);
    }   
    movePawn(oldposition,newposition,source){
        var temp=document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1=document.createElement('img');
        image1.setAttribute("src",source);
        image1.setAttribute("id","piece");
        document.getElementById(newposition).appendChild(image1);
        //update position
        this.position=newposition;
    }
    moveRook(oldposition,newposition,source){
        var temp=document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1=document.createElement('img');
        image1.setAttribute("src",source);
        image1.setAttribute("id","piece");
        document.getElementById(newposition).appendChild(image1);
        this.position=newposition;
    }
    moveBishop(oldposition,newposition,source){
        var temp=document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1=document.createElement('img');
        image1.setAttribute("src",source);
        image1.setAttribute("id","piece");
        document.getElementById(newposition).appendChild(image1);
        this.position=newposition;
    }
    moveKnight(oldposition,newposition,source){
        var temp=document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1=document.createElement('img');
        image1.setAttribute("src",source);
        image1.setAttribute("id","piece");
        document.getElementById(newposition).appendChild(image1);
        this.position=newposition;
    }
    moveQueen(oldposition,newposition,source){
        var temp=document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1=document.createElement('img');
        image1.setAttribute("src",source);
        image1.setAttribute("id","piece");
        document.getElementById(newposition).appendChild(image1);
        this.position=newposition;
    }
    moveKing(oldposition,newposition,source){
        var temp=document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1=document.createElement('img');
        image1.setAttribute("src",source);
        image1.setAttribute("id","piece");
        document.getElementById(newposition).appendChild(image1);
        this.position=newposition;
    }
    get positionn(){
        return this.position;
    }
}
class Pawn extends Piece{
    constructor(name,position,src,color){
        super(name,position,src,color);
        this.isFirstTime=true;
    }
}
var pawnn0w =new Pawn("pawn0","spot60w","./pieces/pawn.png","white");
var pawnn1w =new Pawn("pawn1","spot61b","./pieces/pawn.png","white");
var pawnn2w =new Pawn("pawn2","spot62w","./pieces/pawn.png","white");
var pawnn3w =new Pawn("pawn3","spot63b","./pieces/pawn.png","white");
var pawnn4w =new Pawn("pawn4","spot64w","./pieces/pawn.png","white");
var pawnn5w =new Pawn("pawn5","spot65b","./pieces/pawn.png","white");
var pawnn6w =new Pawn("pawn6","spot66w","./pieces/pawn.png","white");
var pawnn7w =new Pawn("pawn7","spot67b","./pieces/pawn.png","white");
var rook0w=new Piece("rook0","spot70b","./pieces/rook.png","white");
var rook1w=new Piece("rook1","spot77w","./pieces/rook.png","white");
var knight0w=new Piece("knight0","spot71w","./pieces/knight.png","white");
var knight1w=new Piece("knight1","spot76b","./pieces/knight.png","white");
var bishop0w=new Piece("bishop0","spot72b","./pieces/bishop.png","white");
var bishop1w=new Piece("bishop1","spot75w","./pieces/bishop.png","white");
var queenw=new Piece("queenw","spot73w","./pieces/queen.png","white");
var kingw=new Piece("king","spot74b","./pieces/king.png","white");
var pieceArray = [pawnn0w,pawnn1w,pawnn2w,pawnn3w,pawnn4w,pawnn5w,pawnn6w,pawnn7w,rook0w,rook1w,knight0w,knight1w,bishop0w,bishop1w,queenw,kingw];
function checkValidMovePawn(position1,position2,isFirstTime){
if (isFirstTime){
    console.log("first time")
    if (Number(position2.charAt(5))==Number(position1.charAt(5))&&(Number(position2.charAt(4))==Number(position1.charAt(4)-1)||Number(position2.charAt(4))==Number(position1.charAt(4)-2))&&isEmpty(position2)){
        for (let i=0;i<pieceArray.length;i++){
            if (pieceArray[i].positionn==position1){
                pieceArray[i].isFirstTime=false;
            }
        }
        return true;
    }
    else return false;
}
else{
    console.log("not first time")
    if (Number(position2.charAt(5))==Number(position1.charAt(5))&&Number(position2.charAt(4))==Number(position1.charAt(4)-1)&&isEmpty(position2)){
    return true;
    }
    else return false;
}
}
function isEmpty(position){
    if (document.getElementById(position).innerHTML=="")
    return true;
    else return false;
}
function checkValidMoveRook(oldposition,newposition){
    if ((Number(newposition.charAt(5))==Number(oldposition.charAt(5))||(Number(newposition.charAt(4)==Number(oldposition.charAt(4)))))&&isEmpty(newposition)){
        return true;
    }
    else return false;
}
function checkValidMoveKnight(oldposition,newposition){
    var upperpoint=Number(oldposition.charAt(4))-2;
    var lowerpoint=Number(oldposition.charAt(4))+2;
    var rightpoint=Number(oldposition.charAt(5)+2);
    var leftpoint=Number(oldposition.charAt(5)-2);
    var point1= String((Number(oldposition.charAt(4))-1))+ rightpoint;
    var point2=String(Number(oldposition.charAt(5))+1)+upperpoint;
    var point3=upperpoint+String(Number(oldposition.charAt(5)-1));
    var point4= +leftpoint;
    var point5=+leftpoint
    var point6=lowerpoint+
    var point7=lowerpoint+
    var point8=+rightpoint;
    if (Number(new))
}