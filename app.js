let ore = 0
let gold = 0
let autoMineLvl = 1
let autoMineSpeed = 900
let autoMineCost = 0

let calculateCost = () => {
  let totalCost= autoMineLvl * 50 
  console.log(`${totalCost} cost`)
  autoMineCost = totalCost
}

let speedAdjust = () => {
 autoMineSpeed-=100
 move()
}


let addOre = () => {
  ore++

// +1 Ore Animation

  if ($(".oreManual").classList = $(".oreManualAnimate")) {
    $(".oreManual").removeClass('oreManualAnimate')
  } 

  $(".oreManual").addClass('oreManualAnimate')
  setTimeout(function() {
    $(".oreManual").removeClass('oreManualAnimate');
  }, 200);
// End of +1 Ore Animation

  document.getElementById('oreCount').innerHTML = `<p class="countText">${ore}</p>`
}
addOre();

let refreshOre = () => {
  document.getElementById('oreCount').innerHTML = `<p class="countText">${ore}</p>`
}

let sellOre = () => {
  gold = ore + gold
  document.getElementById('goldCount').innerHTML = `<p class="countText">${gold}</p>`
  ore = -1
  ore++
  document.getElementById('oreCount').innerHTML = `<p class="countText">${ore}</p>`
  
} 

let refreshGold = () => [
document.getElementById('goldCount').innerHTML = `<p class="countText">${gold}</p>`
]

let shop = () => {
  $(".container").addClass('containerAnimate')
  setTimeout(function() {
    $(".container").removeClass('containerAnimate');
  }, 800);

  $(".mine,.sell,.shop").addClass('buttonsAnimate')
  setTimeout(function() {
    $(".mine,.sell,.shop").removeClass('buttonsAnimate');
  }, 800);

  setTimeout(function() {
    if (autoMineLvl == 1){
  document.getElementById('buttonContainer').innerHTML = 
  `<button class="autoMine" onclick="autoMine();">Auto<br>Mine<br>25</button>
  <button class="goldMult" onclick="sellOre();">Gold<br>Mult</button>
  <button class="back" onclick="back();">Back</button>`
  } else {
    document.getElementById('buttonContainer').innerHTML = 
    `<button class="autoMine" onclick="autoMine();">Auto<br>Mine<br>${autoMineCost}</button>
    <button class="goldMult" onclick="sellOre();">Gold<br>Mult</button>
    <button class="back" onclick="back();">Back</button>`
  }
  }, 200);

  $(".autoMine,.goldMult,.back").addClass('buttonsAnimateIn')
  setTimeout(function() {
    $(".autoMine,.goldMult,.back").removeClass('buttonsAnimateIn');
  }, 400);
}

let back = () => {
  $(".container").addClass('containerAnimate')
  setTimeout(function() {
    $(".container").removeClass('containerAnimate');
  }, 800);
  document.getElementById('buttonContainer').innerHTML = 
  `<button class="mine" onclick="addOre();">Mine</button>
  <button class="sell" onclick="sellOre();">Sell</button>
  <button class="shop" onclick="shop();">Shop</button>`
}

//$(".oreIdle").addClass('oreIdleAnimate')
let i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 20);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        ore++
        refreshOre()
        i = 0;
        move()

        var el = document.getElementById('oreIdleID')
        dynamics.animate(el, {
        scale: 1,
        opacity: 1,
        translateX: Math.random() * 20 - 5
       }, {
        type: dynamics.bounce,
        frequency: 100,
        friction: 70,
        duration: 1000
       })

      } else {
        width+=autoMineLvl;
        elem.style.width = width + "%";
      }
      if (width >= 40 && width <= 90){
        dynamics.stop(document.getElementById('oreIdleID'))
        document.getElementById('oreIdleID').style.opacity = "0"
        return console.log(`yes`)
      
      }

    }
  }
}

let autoMine = () => { 
  autoMineSpeed
  calculateCost()

// 1st Purchase
  if (gold >= 25 && autoMineLvl == 1) {
    console.log(`purchased AutoMine`)
    gold = gold - 25
    refreshGold()
    autoMineLvl++
    move()
  }
// Next purchases
  if (gold > autoMineCost || gold == autoMineCost) {
    console.log(`purchased NewAutoMine`)
    gold = gold - autoMineCost
    refreshGold()
    autoMineLvl++
    speedAdjust()
    move()
    console.log(`${autoMineSpeed} Speed`)
  }
  calculateCost()
  document.getElementById('buttonContainer').innerHTML = 
  `<button class="autoMine" onclick="autoMine();">Auto<br>Mine<br>${autoMineCost}</button>
  <button class="goldMult" onclick="sellOre();">Gold<br>Mult</button>
  <button class="back" onclick="back();">Back</button>`
}