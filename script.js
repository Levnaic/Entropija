//FORMIRANJE TABELE
const table = document.querySelector('.tableConainer');
const rowNum = 4;
const colNum = 6;
let matrix = [];

for (let i = 0; i < rowNum; i++) {
  matrix[i] = [];
  for (let j = 0; j < colNum; j++) {
    matrix[i][j] = [1, 2, 3, 4, 5];
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = i;
    cell.dataset.column = j;
    cell.style.flex = `1 0 calc(${100 / colNum}% - 2px)`;
    table.append(cell);

    //right
    const right1 = document.createElement('div');
    const right2 = document.createElement('div');
    right1.classList.add('right1');
    right2.classList.add('right2');
    cell.append(right1);
    cell.append(right2);

    //left
    const left1 = document.createElement('div');
    const left2 = document.createElement('div');
    left1.classList.add('left1');
    left2.classList.add('left2');
    cell.append(left1);
    cell.append(left2);

    //up
    const up1 = document.createElement('div');
    const up2 = document.createElement('div');
    up1.classList.add('up1');
    up2.classList.add('up2');
    cell.append(up1);
    cell.append(up2);

    //down
    const down1 = document.createElement('div');
    const down2 = document.createElement('div');
    down1.classList.add('down1');
    down2.classList.add('down2');
    cell.append(down1);
    cell.append(down2);
  }
}

//PROMENJIVE
const cells = document.querySelectorAll('.cell');

//FUMKCIJE
function getRand(cell) {
  //return Math.floor(Math.random() * 5 + 1);
  let meta = matrix[cell.dataset.row][cell.dataset.column];

  return meta[Math.floor(Math.random() * meta.length)];
}

function chooseSide(cell, direction) {
  switch (direction) {
    case 1:
      cell.querySelector('.right1').style.visibility = 'visible';
      cell.querySelector('.right2').style.visibility = 'visible';
      cell.classList.add('clicked');
      break;

    case 2:
      cell.querySelector('.left1').style.visibility = 'visible';
      cell.querySelector('.left2').style.visibility = 'visible';
      cell.classList.add('clicked');
      break;

    case 3:
      cell.querySelector('.up1').style.visibility = 'visible';
      cell.querySelector('.up2').style.visibility = 'visible';
      cell.classList.add('clicked');
      break;

    case 4:
      cell.querySelector('.down1').style.visibility = 'visible';
      cell.querySelector('.down2').style.visibility = 'visible';
      cell.classList.add('clicked');
      break;

    case 5:
      cell.classList.add('clicked');
      break;

    default:
      console.log('greska u prvoj f-ji');
      break;
  }
}

function removingCandidates(e, direction) {
  let metaR;
  let metaL;
  let metaG;
  let metaD;

  if (e.target.dataset.row - 1 >= 0) {
    metaG = matrix[e.target.dataset.row - 1][e.target.dataset.column];
  }

  if (+e.target.dataset.row + 1 < rowNum) {
    metaD = matrix[+e.target.dataset.row + 1][e.target.dataset.column];
  }

  if (+e.target.dataset.column + 1 <= colNum) {
    metaR = matrix[e.target.dataset.row][+e.target.dataset.column + 1];
  }

  if (e.target.dataset.column - 1 >= 0) {
    metaL = matrix[e.target.dataset.row][e.target.dataset.column - 1];
  }

  function tailUp(metaG) {
    if (metaG != undefined) {
      for (let i = 0; i <= metaG.length; i++) {
        if (metaG[i] === 3) metaG.splice(i, 1);
        if (metaG[i] === 5) metaG.splice(i, 1);
      }
      matrix[e.target.dataset.row - 1][e.target.dataset.column] = metaG;
    }
  }
  function tailDown(metaD) {
    if (metaD != undefined) {
      for (let i = 0; i <= metaD?.length; i++) {
        if (metaD[i] === 4) metaD.splice(i, 1);
        if (metaD[i] === 5) metaD.splice(i, 1);
      }
      matrix[+e.target.dataset.row + 1][e.target.dataset.column] = metaD;
    }
  }
  function tailRight(metaR) {
    for (let i = 0; i <= metaR?.length; i++) {
      if (metaR[i] === 1) metaR.splice(i, 1);
      if (metaR[i] === 5) metaR.splice(i, 1);
    }
    matrix[e.target.dataset.row][+e.target.dataset.column + 1] = metaR;
  }
  function tailLeft(metaL) {
    for (let i = 0; i <= metaL?.length; i++) {
      if (metaL[i] === 2) metaL.splice(i, 1);
      if (metaL[i] === 5) metaL.splice(i, 1);
    }
    matrix[e.target.dataset.row][e.target.dataset.column - 1] = metaL;
  }
  function nonUp(metaG) {
    if (metaG != undefined) {
      for (let i = 0; i <= metaG?.length; i++) {
        if (metaG[i] === 1) metaG.splice(i, 1);
        if (metaG[i] === 2) metaG.splice(i, 1);
        if (metaG[i] === 4) metaG.splice(i, 1);
      }
      matrix[e.target.dataset.row - 1][e.target.dataset.column] = metaG;
    }
  }
  function nonDown(metaD) {
    if (metaD != undefined) {
      for (let i = 0; i <= metaD?.length; i++) {
        if (metaD[i] === 1) metaD.splice(i, 1);
        if (metaD[i] === 2) metaD.splice(i, 1);
        if (metaD[i] === 3) metaD.splice(i, 1);
      }
      matrix[+e.target.dataset.row + 1][e.target.dataset.column] = metaD;
    }
  }
  function nonRight(metaR) {
    for (let i = 0; i <= metaR?.length; i++) {
      if (metaR[i] === 2) metaR.splice(i, 1);
      if (metaR[i] === 3) metaR.splice(i, 1);
      if (metaR[i] === 4) metaR.splice(i, 1);
    }
    matrix[e.target.dataset.row][+e.target.dataset.column + 1] = metaR;
  }
  function nonLeft(metaL) {
    for (let i = 0; i <= metaL?.length; i++) {
      if (metaL[i] === 1) metaL.splice(i, 1);
      if (metaL[i] === 3) metaL.splice(i, 1);
      if (metaL[i] === 4) metaL.splice(i, 1);
    }
    matrix[e.target.dataset.row][e.target.dataset.column - 1] = metaL;
  }

  let nizMeta = [metaR, metaL, metaG, metaD];

  switch (direction) {
    // u slucaju da je izabrana desna
    case 1:
      tailUp(metaG);
      tailDown(metaD);
      tailRight(metaR);
      nonLeft(metaL);
      break;
    // u sluvaju da je izabrana leva
    case 2:
      tailUp(metaG);
      tailDown(metaD);
      nonRight(metaR);
      tailLeft(metaL);
      break;
    // gornja
    case 3:
      tailUp(metaG);
      nonDown(metaD);
      tailRight(metaR);
      tailLeft(metaL);
      break;
    //donja
    case 4:
      nonUp(metaG);
      tailDown(metaD);
      tailRight(metaR);
      tailLeft(metaL);
      break;
    //prazna
    case 5:
      nonUp(metaG);
      nonDown(metaD);
      nonRight(metaR);
      nonLeft(metaL);
      break;
    default:
      console.log('greska u 2. f-ji');
      break;
  }
}

//LOGIKA
cells.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    let direction = getRand(cell);
    chooseSide(cell, direction);
    removingCandidates(e, direction);
  });
});
