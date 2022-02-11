function rowFill (row, cellNum, cellRatio, rowId){    
    let cellBorderRadius = cellRatio*2;
    let cellBorder = cellRatio;
    for (let i = 0; i < cellNum; i++) {
        let cell = document.createElement('div');
        cell.className = "cell";
        cell.id = `${rowId}_${i}`;        
        cell.style.borderRadius = `${cellBorderRadius}px`;
        cell.style.borderWidth = `${cellBorder}px`;
        cell.style.background = 'hsl(0, 30%, 95%)';
        cell.addEventListener("mouseover", changeColor);
        row.append(cell);
    }
    
}

function createRow(cellNum, gameDiv, gap, cellRatio, rowID) {
    let div = document.createElement('div');
    div.style.gap = `${gap}px`;        
    div.className = "rowFlex";
    div.id = rowID;
    rowFill (div, cellNum, cellRatio, rowID);
    gameDiv.append(div);
}

function createTable(cellNum) {
    let gameDiv = document.querySelector('.game');
    let width = getComputedStyle(gameDiv).width;
    width = width.slice(0,width.length-2);
    let  cellGap = 0;
    //let cellGap = (width / cellNum*0.01).toFixed(2);
    let cellRatio = (width / cellNum*0.01).toFixed(2)
    gameDiv.style.gap = `${cellGap}px`;
    for (let i = 0; i < cellNum; i++) {
        createRow(cellNum, gameDiv, cellGap, cellRatio, `${i}`);
    } 
}

function randomRGB() {
    let R = Math.floor(Math.random()*256);
    let G = Math.floor(Math.random()*256);
    let B = Math.floor(Math.random()*256);
    return `rgb(${R},${G},${B})`
}

function darkenRGB(rgb,ratio) {
    let color = rgb.slice(rgb.indexOf('(')+1, rgb.indexOf(')')).split(', ');
    color.forEach((item,index) => color[index] = Math.floor(+item*ratio));  
    console.log(color.join(', '))  
    return `rgb(${color.join(', ')})`;
}

function changeColor() {    
    //let lightness = getComputedStyle(this).background;
    let color = this.style.background;
    //console.log(color);
    this.style.background = darkenRGB(color,0.8);
       
}

const startButton = document.querySelector('#header-button');
startButton.addEventListener('click',() => {
    let cellNum = +prompt('Enter cells in row quantity, not more then 100','16');
    if (Number.isInteger(cellNum)&&(cellNum>0)&&(cellNum<=100)) {
        let gameDiv = document.querySelector('.game');
        gameDiv.innerHTML = '';
        createTable(cellNum);
    }   else alert('Integer number between 0 and 100 was expected!') 
})

createTable(16);