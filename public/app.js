let board = [[]];
let whitePlayer = false;
let blackPlayer = false;
let pieceArray;
let pieceArrayb;
let clicked = false;
let chosenPiece;
let chosenPieceName;
let chosenPieceIsFirstTime;
let chosenPieceColor;
let chosenPieceSrc;
let whiteturn = true;
var socket = io();
var userId=socket.id;
var url=document.location.href;
var roomid=url.substring(url.indexOf('=')+1,url.length)
var gameOver=false;
document.getElementById('roomid').innerHTML="Room's ID:"+roomid;
document.getElementById('hiddenmessage').innerHTML="Waiting for opponent..."


for (let i = 0; i < 8; i++) {
    // board[j]="";
    var line = document.createElement('div');
    line.setAttribute("id", "line" + i);
    document.getElementById("board").appendChild(line);
}
for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 8; i++) {
        var spot = document.createElement('div');
        spot.setAttribute("id", "button");
        if (j % 2 == 0 && i % 2 == 0) {
            spot.setAttribute("id", "spot" + j + i + 'w');
        }
        else if (j % 2 == 0) {
            spot.setAttribute("id", "spot" + j + i + 'b');
        }
        else if (j % 2 != 0 && i % 2 == 0) {
            spot.setAttribute("id", "spot" + j + i + 'b');
        }
        else { spot.setAttribute("id", "spot" + j + i + 'w'); }
        document.getElementById("line" + j).appendChild(spot);
    }
}
//note here
disableAllButtons();
//socket.on('connect',()=>{
    socket.emit("join",roomid);
    socket.emit("isReady",roomid);
//})
socket.emit("checkFor2nd",{roomid:roomid,userid:userId});
var button = document.querySelectorAll('[id^="spot"]');
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', () => { //if whiteturn
        if (clicked) {
            if (chosenPieceName.includes('pawn') && chosenPieceColor.includes("white")) {
                if (checkValidMovePawn(chosenPiece, button[i].id, chosenPieceIsFirstTime)) {
                    for (let k = 0; k < pieceArray.length; k++) {
                        if (pieceArray[k].positionn == chosenPiece) {
                            pieceArray[k].movePawn(chosenPiece, button[i].id, chosenPieceSrc)
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("white");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);
                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }
            else if (chosenPieceName.includes('pawn') && chosenPieceColor.includes("black")) {
                if (checkValidMovePawnBlack(chosenPiece, button[i].id, chosenPieceIsFirstTime)) {
                    for (let k = 0; k < pieceArrayb.length; k++) {
                        if (pieceArrayb[k].positionn == chosenPiece) {
                            pieceArrayb[k].movePawn(chosenPiece, button[i].id, chosenPieceSrc)
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("black");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);
                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }
            else if (chosenPieceName.includes('rook') && chosenPieceColor.includes("white")) {
                if (checkValidMoveRook(chosenPiece, button[i].id, "white")) {
                    for (let k = 0; k < pieceArray.length; k++) {
                        if (pieceArray[k].positionn == chosenPiece) {
                            pieceArray[k].moveRook(chosenPiece, button[i].id, chosenPieceSrc);
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("white");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);

                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }
            else if (chosenPieceName.includes('rook') && chosenPieceColor.includes('black')) {
                if (checkValidMoveRook(chosenPiece, button[i].id, "black")) {
                    for (let k = 0; k < pieceArrayb.length; k++) {
                        if (pieceArrayb[k].positionn == chosenPiece) {
                            pieceArrayb[k].moveRook(chosenPiece, button[i].id, chosenPieceSrc);
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("black");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);

                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }
            else if (chosenPieceName.includes('knight') && chosenPieceColor.includes("white")) {
                if (checkValidMoveKnight(chosenPiece, button[i].id, "white")) {
                    for (let k = 0; k < pieceArray.length; k++) {
                        if (pieceArray[k].positionn == chosenPiece) {
                            pieceArray[k].moveKnight(chosenPiece, button[i].id, chosenPieceSrc);
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("white");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);

                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }
            else if (chosenPieceName.includes('knight') && chosenPieceColor.includes("black")) {
                if (checkValidMoveKnight(chosenPiece, button[i].id, "black")) {
                    for (let k = 0; k < pieceArrayb.length; k++) {
                        if (pieceArrayb[k].positionn == chosenPiece) {
                            pieceArrayb[k].moveKnight(chosenPiece, button[i].id, chosenPieceSrc);
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("black");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);

                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }

            else if (chosenPieceName.includes('bishop') && chosenPieceColor.includes("white")) {
                if (checkValidMoveBishop(chosenPiece, button[i].id, "white")) {
                    for (let k = 0; k < pieceArray.length; k++) {
                        if (pieceArray[k].positionn == chosenPiece) {
                            pieceArray[k].moveBishop(chosenPiece, button[i].id, chosenPieceSrc);
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("white");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);

                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }
            else if (chosenPieceName.includes('bishop') && chosenPieceColor.includes("black")) {
                if (checkValidMoveBishop(chosenPiece, button[i].id, "black")) {
                    for (let k = 0; k < pieceArrayb.length; k++) {
                        if (pieceArrayb[k].positionn == chosenPiece) {
                            pieceArrayb[k].moveBishop(chosenPiece, button[i].id, chosenPieceSrc);
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("black");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);

                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }
            else if (chosenPieceName.includes('queen') && chosenPieceColor.includes("white")) {
                if (checkValidMoveBishop(chosenPiece, button[i].id, "white") || checkValidMoveRook(chosenPiece, button[i].id, "white")) {
                    for (let k = 0; k < pieceArray.length; k++) {
                        if (pieceArray[k].positionn == chosenPiece) {
                            pieceArray[k].moveQueen(chosenPiece, button[i].id, chosenPieceSrc);
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("white");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);

                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }
            else if (chosenPieceName.includes('queen') && chosenPieceColor.includes("black")) {
                if (checkValidMoveBishop(chosenPiece, button[i].id, "black") || checkValidMoveRook(chosenPiece, button[i].id, "black")) {
                    for (let k = 0; k < pieceArrayb.length; k++) {
                        if (pieceArrayb[k].positionn == chosenPiece) {
                            pieceArrayb[k].moveQueen(chosenPiece, button[i].id, chosenPieceSrc);
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("black");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);

                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }
            else if (chosenPieceName.includes('king') && chosenPieceColor.includes("white")) {
                if (checkValidMoveKing(chosenPiece, button[i].id, "white")) {
                    for (let k = 0; k < pieceArray.length; k++) {
                        if (pieceArray[k].positionn == chosenPiece) {
                            pieceArray[k].moveKing(chosenPiece, button[i].id, chosenPieceSrc);
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("white");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);

                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }
            else if (chosenPieceName.includes('king') && chosenPieceColor.includes("black")) {
                if (checkValidMoveKing(chosenPiece, button[i].id, "black")) {
                    for (let k = 0; k < pieceArrayb.length; k++) {
                        if (pieceArrayb[k].positionn == chosenPiece) {
                            pieceArrayb[k].moveKing(chosenPiece, button[i].id, chosenPieceSrc);
                            socket.emit("move",{id:roomid,cpn: chosenPieceName,cpc: chosenPieceColor,cp: chosenPiece,b: button[i].id,cps: chosenPieceSrc})
                            check("black");
                            disableAllButtons();
                            socket.emit("nextTurn",roomid);
                        }
                    }
                }
                else {
                    whiteturn = !whiteturn;
                }
            }
            socket.emit("checkwinner",roomid);
            if (gameOver==false){
            updateTurn();
            whiteturn = !whiteturn;
            socket.emit("updateTurn",{id:roomid,value:whiteturn});
            
            }

        }

        else {
            if (whiteturn) {
                if (!checkEmptyClick(button[i].id, "white")) {
                    alert("Nothing is here");
                    clicked = !clicked;
                }
                else {
                    chosenPiece = button[i].id;
                    chosenPieceSrc = document.querySelectorAll('#' + button[i].id + " img")[0].src;
                    for (let i = 0; i < pieceArray.length; i++) {
                        if (pieceArray[i].positionn == chosenPiece) {
                            chosenPieceIsFirstTime = pieceArray[i].isFirstTime;
                            chosenPieceName = pieceArray[i].name;
                            chosenPieceColor = pieceArray[i].color;
                        }
                    }
                }
            }
            else if (!whiteturn) {
                if (!checkEmptyClick(button[i].id, "black")) {
                    alert("Nothing is here");
                    clicked = !clicked;
                }
                else {
                    chosenPiece = button[i].id;
                    chosenPieceSrc = document.querySelectorAll('#' + button[i].id + " img")[0].src;

                    for (let i = 0; i < pieceArrayb.length; i++) {
                        if (pieceArrayb[i].positionn == chosenPiece) {
                            chosenPieceIsFirstTime = pieceArrayb[i].isFirstTime;
                            chosenPieceName = pieceArrayb[i].name;
                            chosenPieceColor = pieceArrayb[i].color;
                        }
                    }
                }
            }
        }

        clicked = !clicked;
    });
}

class Piece {
    constructor(name, position, src, color) {
        this.name = name;
        this.position = position;
        this.src = src;
        this.color = color;
        this.draww();
    }
    draww() {
        var image = document.createElement('img');
        image.setAttribute("src", this.src);
        image.setAttribute("id", "piece");
        document.getElementById(this.position).appendChild(image);
    }
    movePawn(oldposition, newposition, source) {
        var temp = document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1 = document.createElement('img');
        image1.setAttribute("src", source);
        image1.setAttribute("id", "piece");
        document.getElementById(newposition).appendChild(image1);
        //update position
        this.position = newposition;
    }
    moveRook(oldposition, newposition, source) {
        var temp = document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1 = document.createElement('img');
        image1.setAttribute("src", source);
        image1.setAttribute("id", "piece");
        document.getElementById(newposition).appendChild(image1);
        this.position = newposition;
    }
    moveBishop(oldposition, newposition, source) {
        var temp = document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1 = document.createElement('img');
        image1.setAttribute("src", source);
        image1.setAttribute("id", "piece");
        document.getElementById(newposition).appendChild(image1);
        this.position = newposition;
    }
    moveKnight(oldposition, newposition, source) {
        var temp = document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1 = document.createElement('img');
        image1.setAttribute("src", source);
        image1.setAttribute("id", "piece");
        document.getElementById(newposition).appendChild(image1);
        this.position = newposition;
    }
    moveQueen(oldposition, newposition, source) {
        var temp = document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1 = document.createElement('img');
        image1.setAttribute("src", source);
        image1.setAttribute("id", "piece");
        document.getElementById(newposition).appendChild(image1);
        this.position = newposition;
    }
    moveKing(oldposition, newposition, source) {
        var temp = document.getElementById(oldposition);
        temp.removeChild(temp.lastElementChild);
        var image1 = document.createElement('img');
        image1.setAttribute("src", source);
        image1.setAttribute("id", "piece");
        document.getElementById(newposition).appendChild(image1);
        this.position = newposition;
    }
    get positionn() {
        return this.position;
    }
}
class Pawn extends Piece {
    constructor(name, position, src, color) {
        super(name, position, src, color);
        this.isFirstTime = true;
    }
}
initialize();
function initialize() {
    var pawnn0w = new Pawn("pawn0", "spot60w", "./pieces/pawn.png", "white");
    var pawnn1w = new Pawn("pawn1", "spot61b", "./pieces/pawn.png", "white");
    var pawnn2w = new Pawn("pawn2", "spot62w", "./pieces/pawn.png", "white");
    var pawnn3w = new Pawn("pawn3", "spot63b", "./pieces/pawn.png", "white");
    var pawnn4w = new Pawn("pawn4", "spot64w", "./pieces/pawn.png", "white");
    var pawnn5w = new Pawn("pawn5", "spot65b", "./pieces/pawn.png", "white");
    var pawnn6w = new Pawn("pawn6", "spot66w", "./pieces/pawn.png", "white");
    var pawnn7w = new Pawn("pawn7", "spot67b", "./pieces/pawn.png", "white");
    var rook0w = new Piece("rook0", "spot70b", "./pieces/rook.png", "white");
    var rook1w = new Piece("rook1", "spot77w", "./pieces/rook.png", "white");
    var knight0w = new Piece("knight0", "spot71w", "./pieces/knight.png", "white");
    var knight1w = new Piece("knight1", "spot76b", "./pieces/knight.png", "white");
    var bishop0w = new Piece("bishop0", "spot72b", "./pieces/bishop.png", "white");
    var bishop1w = new Piece("bishop1", "spot75w", "./pieces/bishop.png", "white");
    var queenw = new Piece("queen", "spot73w", "./pieces/queen.png", "white");
    var kingw = new Piece("king", "spot74b", "./pieces/king.png", "white");
    pieceArray = [pawnn0w, pawnn1w, pawnn2w, pawnn3w, pawnn4w, pawnn5w, pawnn6w, pawnn7w, rook0w, rook1w, knight0w, knight1w, bishop0w, bishop1w, queenw, kingw];

    var pawnn0b = new Pawn("pawn0", "spot10b", "./pieces/pawnb.png", "black");
    var pawnn1b = new Pawn("pawn1", "spot11w", "./pieces/pawnb.png", "black");
    var pawnn2b = new Pawn("pawn2", "spot12b", "./pieces/pawnb.png", "black");
    var pawnn3b = new Pawn("pawn3", "spot13w", "./pieces/pawnb.png", "black");
    var pawnn4b = new Pawn("pawn4", "spot14b", "./pieces/pawnb.png", "black");
    var pawnn5b = new Pawn("pawn5", "spot15w", "./pieces/pawnb.png", "black");
    var pawnn6b = new Pawn("pawn6", "spot16b", "./pieces/pawnb.png", "black");
    var pawnn7b = new Pawn("pawn7", "spot17w", "./pieces/pawnb.png", "black");
    var rook0b = new Piece("rook0", "spot00w", "./pieces/rookb.png", "black");
    var rook1b = new Piece("rook1", "spot07b", "./pieces/rookb.png", "black");
    var knight0b = new Piece("knight0", "spot01b", "./pieces/knightb.png", "black");
    var knight1b = new Piece("knight1", "spot06w", "./pieces/knightb.png", "black");
    var bishop0b = new Piece("bishop0", "spot02w", "./pieces/bishopb.png", "black");
    var bishop1b = new Piece("bishop1", "spot05b", "./pieces/bishopb.png", "black");
    var queenb = new Piece("queen", "spot03b", "./pieces/queenb.png", "black");
    var kingb = new Piece("king", "spot04w", "./pieces/kingb.png", "black");
    pieceArrayb = [pawnn0b, pawnn1b, pawnn2b, pawnn3b, pawnn4b, pawnn5b, pawnn6b, pawnn7b, rook0b, rook1b, knight0b, knight1b, bishop0b, bishop1b, queenb, kingb];
}

function checkValidMovePawn(position1, position2, isFirstTime) {
    if (isFirstTime) {
        if (Number(position2.charAt(5)) == Number(position1.charAt(5)) && (Number(position2.charAt(4)) == Number(position1.charAt(4) - 1) || Number(position2.charAt(4)) == Number(position1.charAt(4) - 2)) && isEmpty(position2)) {
            for (let i = 0; i < pieceArray.length; i++) {
                if (pieceArray[i].positionn == position1) {
                    pieceArray[i].isFirstTime = false;
                }
            }
            return true;
        }
        else return false;
    }
    else {
        if (Number(position2.charAt(5)) == Number(position1.charAt(5)) && Number(position2.charAt(4)) == Number(position1.charAt(4) - 1) && isEmpty(position2)) {
            return true;
        }
        else return false;
    }
}
function isEmpty(position, color) {
    if (color == "black") {
        for (let i = 0; i < pieceArrayb.length; i++) {
            if (pieceArrayb[i].position == position) {
                return false;
            }
        }
    }
    else if (color == "white") {
        for (let i = 0; i < pieceArray.length; i++) {
            if (pieceArray[i].position == position) {
                return false;
            }
        }
    }
    return true;
}

function checkValidMoveRook(oldposition, newposition, color) {
    var goUp = false;
    var goDown = false;
    var goRight = false;
    var goLeft = false;
    var vertical = false;
    var horizontal = false;
    if ((Number(newposition.charAt(5)) == Number(oldposition.charAt(5)))) vertical = true;
    if ((Number(newposition.charAt(4)) == Number(oldposition.charAt(4)))) horizontal = true;
    if (vertical) {
        if (Number(newposition.charAt(4)) < Number(oldposition.charAt(4)))
            goUp = true;
        else
            goDown = true;
    }
    else if (horizontal) {
        if (Number(newposition.charAt(5)) > Number(oldposition.charAt(5)))
            goRight = true;
        else
            goLeft = true;
    }
    if ((Number(newposition.charAt(5)) == Number(oldposition.charAt(5)) || (Number(newposition.charAt(4) == Number(oldposition.charAt(4))))) && isEmpty(newposition, color)) {
        if (goUp) {
            for (let i = Number(newposition.charAt(4)) + 1; i < Number(oldposition.charAt(4)); i++) {
                for (let k = 0; k < pieceArray.length; k++) {
                    if (pieceArray[k].position.includes(`spot${i}` + oldposition.charAt(5)))
                        return false;
                }
            }
            for (let i = Number(newposition.charAt(4)) + 1; i < Number(oldposition.charAt(4)); i++) {
                for (let k = 0; k < pieceArrayb.length; k++) {
                    if (pieceArrayb[k].position.includes(`spot${i}` + oldposition.charAt(5)))
                        return false;
                }
            }
        }
        else if (goDown) {

            for (let i = Number(oldposition.charAt(4)) + 1; i < Number(newposition.charAt(4)); i++) {
                for (let k = 0; k < pieceArray.length; k++) {
                    if (pieceArray[k].position.includes(`spot${i}` + oldposition.charAt(5)))
                        return false;
                }
            }


            for (let i = Number(oldposition.charAt(4)) + 1; i < Number(newposition.charAt(4)); i++) {
                for (let k = 0; k < pieceArrayb.length; k++) {
                    if (pieceArrayb[k].position.includes(`spot${i}` + oldposition.charAt(5)))
                        return false;
                }
            }

        }
        else if (goRight) {

            for (let i = Number(oldposition.charAt(5)) + 1; i < Number(newposition.charAt(5)); i++) {
                for (let k = 0; k < pieceArray.length; k++) {
                    if (pieceArray[k].position.includes("spot" + oldposition.charAt(4) + `${i}`))
                        return false;
                }
            }


            for (let i = Number(oldposition.charAt(5)) + 1; i < Number(newposition.charAt(5)); i++) {
                for (let k = 0; k < pieceArrayb.length; k++) {
                    if (pieceArrayb[k].position.includes("spot" + oldposition.charAt(4) + `${i}`))
                        return false;
                }
            }

        }
        else if (goLeft) {

            for (let i = Number(newposition.charAt(5)) + 1; i < Number(oldposition.charAt(5)); i++) {
                for (let k = 0; k < pieceArray.length; k++) {
                    if (pieceArray[k].position.includes("spot" + oldposition.charAt(4) + `${i}`))
                        return false;
                }
            }

            for (let i = Number(newposition.charAt(5)) + 1; i < Number(oldposition.charAt(5)); i++) {
                for (let k = 0; k < pieceArrayb.length; k++) {
                    if (pieceArrayb[k].position.includes("spot" + oldposition.charAt(4) + `${i}`))
                        return false;
                }
            }

        }
        return true;
    }
    else return false;
}
function checkValidMoveKnight(oldposition, newposition, color) {
    var upperpoint = Number(oldposition.charAt(4)) - 2;
    var lowerpoint = Number(oldposition.charAt(4)) + 2;
    var rightpoint = Number(oldposition.charAt(5)) + 2;
    var leftpoint = Number(oldposition.charAt(5) - 2);
    var point1 = String(Number(oldposition.charAt(4)) - 1) + rightpoint;
    var point2 = upperpoint + String(Number(oldposition.charAt(5)) + 1);
    var point3 = upperpoint + String(Number(oldposition.charAt(5) - 1));
    var point4 = String(Number(oldposition.charAt(4)) - 1) + leftpoint;
    var point5 = String(Number(oldposition.charAt(4)) + 1) + leftpoint;
    var point6 = lowerpoint + String(Number(oldposition.charAt(5)) - 1);
    var point7 = lowerpoint + String(Number(oldposition.charAt(5)) + 1);
    var point8 = String((Number(oldposition.charAt(4)) + 1)) + rightpoint;
    if ((newposition.includes(point1) || newposition.includes(point2) || newposition.includes(point3) || newposition.includes(point4) || newposition.includes(point5) || newposition.includes(point6) || newposition.includes(point7) || newposition.includes(point8)) && isEmpty(newposition, color)) {
        return true;
    }
    return false;
}
function checkValidMoveBishop(oldposition, newposition, color) {
    var goUpRight = false;
    var goUpLeft = false;
    var goDownRight = false;
    var goDownLeft = false;
    if (newposition.charAt(4) < oldposition.charAt(4)) {
        if (newposition.charAt(5) > oldposition.charAt(5))
            goUpRight = true;
        else
            goUpLeft = true;
    }
    else if (newposition.charAt(4) > oldposition.charAt(4)) {
        if (newposition.charAt(5) > oldposition.charAt(5))
            goDownRight = true;
        else
            goDownLeft = true;
    }
    if (((newposition.slice(4, 6) - oldposition.slice(4, 6)) % 11 == 0 || (newposition.slice(4, 6) - oldposition.slice(4, 6)) % 9 == 0) && isEmpty(newposition, color)) {
        if (goUpRight) {
            var temp = 1;
            for (let i = Number(oldposition.charAt(4)) - 1; i > newposition.charAt(4); i--) {
                for (let k = 0; k < pieceArray.length; k++) {
                    if (pieceArray[k].position.includes(`spot${i}` + String((Number(oldposition.charAt(5)) + temp))))
                        return false;
                }
                temp = temp + 1;
            }
            var temp1 = 1;
            for (let i = Number(oldposition.charAt(4)) - 1; i > newposition.charAt(4); i--) {
                for (let k = 0; k < pieceArrayb.length; k++) {
                    if (pieceArrayb[k].position.includes(`spot${i}` + String((Number(oldposition.charAt(5)) + temp1))))
                        return false;
                }
                temp1 = temp1 + 1;
            }
        }
        else if (goUpLeft) {
            var temp = -1;
            for (let i = Number(oldposition.charAt(4)) - 1; i > newposition.charAt(4); i--) {
                for (let k = 0; k < pieceArray.length; k++) {
                    if (pieceArray[k].position.includes(`spot${i}` + String((Number(oldposition.charAt(5)) + temp))))
                        return false;
                }
                temp = temp - 1;
            }

            var temp1 = -1;
            for (let i = Number(oldposition.charAt(4)) - 1; i > newposition.charAt(4); i--) {
                for (let k = 0; k < pieceArrayb.length; k++) {
                    if (pieceArrayb[k].position.includes(`spot${i}` + String((Number(oldposition.charAt(5)) + temp1))))
                        return false;
                }
                temp1 = temp1 - 1;
            }
        }
        else if (goDownLeft) {
            var temp = -1;
            for (let i = Number(oldposition.charAt(4)) + 1; i < newposition.charAt(4); i++) {
                for (let k = 0; k < pieceArray.length; k++) {
                    if (pieceArray[k].position.includes(`spot${i}` + String((Number(oldposition.charAt(5)) + temp))))
                        return false;
                }
                temp = temp - 1;
            }

            var temp1 = -1;
            for (let i = Number(oldposition.charAt(4)) + 1; i < newposition.charAt(4); i++) {
                for (let k = 0; k < pieceArrayb.length; k++) {
                    if (pieceArrayb[k].position.includes(`spot${i}` + String((Number(oldposition.charAt(5)) + temp1))))
                        return false;
                }
                temp1 = temp1 - 1;
            }
        }
        else if (goDownRight) {
            var temp = 1;
            for (let i = Number(oldposition.charAt(4)) + 1; i < newposition.charAt(4); i++) {
                for (let k = 0; k < pieceArray.length; k++) {
                    if (pieceArray[k].position.includes(`spot${i}` + String((Number(oldposition.charAt(5)) + temp))))
                        return false;
                }
                temp = temp + 1;
            }

            var temp1 = 1;
            for (let i = Number(oldposition.charAt(4)) + 1; i < newposition.charAt(4); i++) {
                for (let k = 0; k < pieceArrayb.length; k++) {
                    if (pieceArrayb[k].position.includes(`spot${i}` + String((Number(oldposition.charAt(5)) + temp1))))
                        return false;
                }
                temp1 = temp1 + 1;
            }
        }
        return true;
    }
    return false;
}
function checkValidMoveKing(oldposition, newposition, color) {
    var upper = Number(oldposition.charAt(4)) - 1;
    var lower = Number(oldposition.charAt(4)) + 1;
    var right = Number(oldposition.charAt(5)) + 1;
    var left = Number(oldposition.charAt(5)) - 1;
    var point1 = oldposition.charAt(4) + right;
    var point2 = String(Number(oldposition.charAt(4)) - 1) + (Number((oldposition.charAt(5))) + 1);
    var point3 = upper + oldposition.charAt(5);
    var point4 = String(Number(oldposition.charAt(4)) - 1) + left;
    var point5 = String(oldposition.charAt(4)) + (Number(oldposition.charAt(5) - 1));
    var point6 = String(lower) + String(left);
    var point7 = String(Number(oldposition.charAt(4)) + 1) + String(Number(oldposition.charAt(5)));
    var point8 = String(lower) + String(right);

    if ((newposition.includes(point1) || newposition.includes(point2) || newposition.includes(point3) || newposition.includes(point4) || newposition.includes(point5) || newposition.includes(point6) || newposition.includes(point7) || newposition.includes(point8)) && isEmpty(newposition, color)) {
        return true;
    }
    return false;
}
function checkValidMovePawnBlack(position1, position2, isFirstTime) {
    if (isFirstTime) {
        if (Number(position2.charAt(5)) == Number(position1.charAt(5)) && (Number(position2.charAt(4)) == Number(position1.charAt(4)) + 1 || Number(position2.charAt(4)) == Number(position1.charAt(4)) + 2) && isEmpty(position2, "black")) {
            for (let i = 0; i < pieceArrayb.length; i++) {
                if (pieceArrayb[i].positionn == position1) {
                    pieceArrayb[i].isFirstTime = false;
                }
            }
            return true;
        }
        else return false;
    }
    else {
        if (Number(position2.charAt(5)) == Number(position1.charAt(5)) && Number(position2.charAt(4)) == Number(position1.charAt(4)) + 1 && isEmpty(position2, "black")) {
            return true;
        }
        else return false;
    }
}
function check(color) {
    loop1:
    for (let i = 0; i < pieceArray.length; i++) {
        for (let j = 0; j < pieceArrayb.length; j++) {
            if (pieceArrayb[j].position == pieceArray[i].position) {
                var temp = document.getElementById(pieceArrayb[j].position);
                temp.removeChild(temp.firstElementChild);
                if (color == "black") {
                    pieceArray.splice(i, 1);
                    break loop1;
                }
                else if (color == "white") {
                    pieceArrayb.splice(j, 1);
                    break loop1;
                }
            }
        }
    }
}
function checkGameOver() {
    var winner = true;
    if (whiteturn) {
        for (let i = 0; i < pieceArrayb.length; i++) {
            if (pieceArrayb[i].name.includes("king")) {
                winner = false;
            }
        }
    }
    else if (!whiteturn) {
        for (let i = 0; i < pieceArray.length; i++) {
            if (pieceArray[i].name.includes("king")) {
                winner = false;
            }
        }
    }
    if (winner) {
        gameOver=true;
        return true;
        
    }

    return false;
}
function checkEmptyClick(position, color) {
    if (color == "white") {
        for (let i = 0; i < pieceArray.length; i++) {
            if (pieceArray[i].positionn == position) {
                return true;
            }
        }
    }
    else if (color == "black") {
        for (let i = 0; i < pieceArrayb.length; i++) {
            if (pieceArrayb[i].position == position)
                return true;
        }
    }
    return false;
}
function stopGame() {
    for (let i = 0; i < pieceArray.length; i++) {
        pieceArray.splice(i, 1);

    }
    for (let j = 0; j < pieceArrayb.length; j++) {
        pieceArrayb.splice(j, 1);
    }

}
function updateTurn() {
    if (!whiteturn)
        document.getElementById('turndisplay').innerHTML = "White's turn";
    else
       { document.getElementById('turndisplay').innerHTML = "Black's turn"}


}
function disableAllButtons() {
    var button = document.querySelectorAll('[id^="spot"]');
    for (let i = 0; i < button.length; i++) {
        document.getElementById(button[i].id).style.pointerEvents = 'none';
    }
}
function enableAllButtons() {
    var button = document.querySelectorAll('[id^="spot"]');
    for (let i = 0; i < button.length; i++) {
        document.getElementById(button[i].id).style.pointerEvents = 'auto';
    }
}

socket.on("updatemove",(data) => {
    if (data.cpn.includes('pawn') && data.cpc.includes("white")) {
        for (let i = 0; i < pieceArray.length; i++) {
            if (pieceArray[i].position == data.cp) {
                pieceArray[i].movePawn(data.cp, data.b, data.cps);
                check("white");
            }
        }
    }
    else if (data.cpn.includes('pawn') && data.cpc.includes("black")) {
        for (let i = 0; i < pieceArrayb.length; i++) {
            if (pieceArrayb[i].position == data.cp) {
                pieceArrayb[i].movePawn(data.cp, data.b, data.cps);
                check("black");
            }
        }
    }
    else if (data.cpn.includes('rook') && data.cpc.includes("white")) {
        for (let i = 0; i < pieceArray.length; i++) {
            if (pieceArray[i].position == data.cp) {
                pieceArray[i].moveRook(data.cp, data.b, data.cps);
                check("white");
            }
        }
    }
    else if (data.cpn.includes('rook') && data.cpc.includes("black")) {
        for (let i = 0; i < pieceArrayb.length; i++) {
            if (pieceArrayb[i].position == data.cp) {
                pieceArrayb[i].moveRook(data.cp, data.b, data.cps);
                check("black");
            }
        }
    }
    else if (data.cpn.includes('knight') && data.cpc.includes("white")) {
        for (let i = 0; i < pieceArray.length; i++) {
            if (pieceArray[i].position == data.cp) {
                pieceArray[i].moveKnight(data.cp, data.b, data.cps);
                check("white");
            }
        }
    }
    else if (data.cpn.includes('knight') && data.cpc.includes("black")) {
        for (let i = 0; i < pieceArrayb.length; i++) {
            if (pieceArrayb[i].position == data.cp) {
                pieceArrayb[i].moveKnight(data.cp, data.b, data.cps);
                check("black");
            }
        }
    }
    else if (data.cpn.includes('bishop') && data.cpc.includes("white")) {
        for (let i = 0; i < pieceArray.length; i++) {
            if (pieceArray[i].position == data.cp) {
                pieceArray[i].moveBishop(data.cp, data.b, data.cps);
                check("white");
            }
        }
    }
    else if (data.cpn.includes('bishop') && data.cpc.includes("black")) {
        for (let i = 0; i < pieceArrayb.length; i++) {
            if (pieceArrayb[i].position == data.cp) {
                pieceArrayb[i].moveBishop(data.cp, data.b, data.cps);
                check("black");
            }
        }
    }
    else if (data.cpn.includes('queen') && data.cpc.includes("white")) {
        for (let i = 0; i < pieceArray.length; i++) {
            if (pieceArray[i].position == data.cp) {
                pieceArray[i].moveQueen(data.cp, data.b, data.cps);
                check("white");
            }
        }
    }
    else if (data.cpn.includes('queen') && data.cpc.includes("black")) {
        for (let i = 0; i < pieceArrayb.length; i++) {
            if (pieceArrayb[i].position == data.cp) {
                pieceArrayb[i].moveQueen(data.cp, data.b, data.cps);
                check("black");
            }
        }
    }
    else if (data.cpn.includes('king') && data.cpc.includes("white")) {
        for (let i = 0; i < pieceArray.length; i++) {
            if (pieceArray[i].position == data.cp) {
                pieceArray[i].moveKing(data.cp, data.b, data.cps);
                check("white");
            }
        }
    }
    else if (data.cpn.includes('king') && data.cpc.includes("black")) {
        for (let i = 0; i < pieceArrayb.length; i++) {
            if (pieceArrayb[i].position == data.cp) {
                pieceArrayb[i].moveKing(data.cp, data.b, data.cps);
                check("black");
            }
        }
    }

    whiteturn=!whiteturn;

});
socket.on("playerConnect", player => {
    if (player == "white") {
        whitePlayer = true;
    }
    else if (player == "black") {
        blackPlayer = true;
    }
})
socket.on("updateTurn",value=>{
    whiteturn=value;
    if (whiteturn){
        document.getElementById("turndisplay").innerHTML="White's turn"
    }
    else {
        document.getElementById('turndisplay').innerHTML="Black's turn"
    }
    
})
socket.on("nextTurn",()=>{
    enableAllButtons();
    if (checkGameOver()){
        if (whiteturn){
        document.getElementById("turndisplay").innerHTML="White wins"
        }
        else{ document.getElementById("turndisplay").innerHTML="Black wins"}
        socket.emit("havewinner",roomid);
       // stopGame();
        disableAllButtons();
    }
})

socket.on("message",msg=>{
})
socket.on("gameover",()=>{
    socket.emit("synchronize",{turn:whiteturn,id:roomid});
    disableAllButtons();
    
})
socket.on("checkwinnerResponse",()=>{
    if (checkGameOver()){
        gameOver=true;
        disableAllButtons();
        if (whiteturn){
        document.getElementById("turndisplay").innerHTML="White wins"
        }
        else{ document.getElementById("turndisplay").innerHTML="Black wins"}
        socket.emit("havewinner",roomid);
    }
});
socket.on("synchronizeDone",value=>{
    whiteturn=value;
    document.getElementById("hiddenmessage").innerHTML="Game over! Please create a new room to play again"
    if (whiteturn){
        document.getElementById("turndisplay").innerHTML="White wins"
        }
        else{ document.getElementById("turndisplay").innerHTML="Black wins"}
})
socket.on("readyToPlayResponse",()=>{
document.getElementById('hiddenmessage').innerHTML="a"
})
socket.on("ready",()=>{
document.getElementById('hiddenmessage').innerHTML=""

alert('All players are ready, let the game begin!');
})
//disableAllButtons();
/*
socket.on("firstConnection",msg=>{
    disableAllButtons();
    document.getElementById('board').style.transformOrigin="center";

   var spotList=document.querySelectorAll('[id^="spot"]')
   for (let j=0;j<spotList.length;j++){
       spotList[j].style.transformOrigin="center"
       spotList[j].style.transform="rotate(180deg)"
   }
   document.getElementById('board').style.transform="rotate(180deg)"

});
*/
socket.on("checkForSecondTrue",()=>{
    enableAllButtons();
   
})
socket.on("checkForFirstTrue",()=>{
    document.getElementById('board').style.transformOrigin="center";

    var spotList=document.querySelectorAll('[id^="spot"]')
    for (let j=0;j<spotList.length;j++){
        spotList[j].style.transformOrigin="center"
        spotList[j].style.transform="rotate(180deg)"
    }
    document.getElementById('board').style.transform="rotate(180deg)"
    
})
socket.on('connect',()=>{
    socket.on("disconnect",(roomid)=>{
        socket.emit("userLeft",roomid);
    })
})

socket.on("leaveMessage",()=>{
    alert('A user has left the game');
})