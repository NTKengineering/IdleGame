let oreMult = 1 
let oreFinalMult = 1 
let multLevel = 1
let multCost = 50
let ore = 0
let gold = 1
let autoMineLvl = 0
let autoMineSpeed = 900
let autoMineCost = 0

let calculateCost = () => {
  let totalCost= autoMineLvl * 50 
  // console.log(`${totalCost} cost`)
  autoMineCost = totalCost
}
let calculateMultCost = () => {
  let totalCost= multLevel * 50 
  console.log(`${totalCost} cost`)
  multCost = totalCost
}
calculateMultCost()

let speedAdjust = () => {
 autoMineSpeed-=100
 move()
}

let updateMult = () => {
  if (multLevel <= 2){
    document.querySelector("#oreManualID").innerHTML = '+' +1 * oreMult + ' ore'
    document.querySelector("#oreIdleID").innerHTML = '+' +1 * oreMult + ' ore'
  } else{
    document.querySelector("#oreManualID").innerHTML = '+' +
    oreFinalMult + ' ore'
    document.querySelector("#oreIdleID").innerHTML = '+' + 
    oreFinalMult + ' ore'
  }
}

let addOre = () => {
  if (multLevel <= 2){
    ore+=1 * oreMult
  } else{
    ore += oreFinalMult
  }
  console.log(`oreMult ${oreMult}// multLevel ${multLevel}`)
  console.log(`oreFinalMult ${oreFinalMult}`)
  updateMult()
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
  <button class="goldMult" onclick="OreMult();">Gold<br>Mult<br>${multCost}</button>
  <button class="back" onclick="back();">Back</button>`
  } else {
    document.getElementById('buttonContainer').innerHTML = 
    `<button class="autoMine" onclick="autoMine();">Auto<br>Mine<br>${autoMineCost}</button>
    <button class="goldMult" onclick="OreMult();">Gold<br>Mult<br>${multCost}</button>
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
        if (multLevel <= 2){
          ore+=1 * oreMult
        } else{
          ore += oreFinalMult
        }
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
        // return console.log(`yes`)
      
      }

    }
  }
}

let autoMine = () => { 
  autoMineSpeed
  calculateCost()

// 1st Purchase
  if (gold >= 25 && autoMineLvl == 1) {
    // console.log(`purchased AutoMine`)
    gold = gold - 25
    refreshGold()
    autoMineLvl++
    move()
  }
// Next purchases
  if (gold > autoMineCost || gold == autoMineCost) {
    // console.log(`purchased NewAutoMine`)
    gold = gold - autoMineCost
    refreshGold()
    autoMineLvl++
    speedAdjust()
    move()
    // console.log(`${autoMineSpeed} Speed`)
  }
  calculateCost()
  document.getElementById('buttonContainer').innerHTML = 
  `<button class="autoMine" onclick="autoMine();">Auto<br>Mine<br>${autoMineCost}</button>
  <button class="goldMult" onclick="OreMult();">Gold<br>Mult<br>${multCost}</button>
  <button class="back" onclick="back();">Back</button>`
}

let OreMult = () => { 
  
  // 1st Purchase
  if (gold >= 50 && multLevel == 1) {
    // alert('mult')
    console.log(`purchased mult`)
    gold = gold - 50
    refreshGold()
    multLevel=2
    oreMult = oreMult+1
    // move()
    updateMult()
    calculateMultCost()
    document.getElementById('buttonContainer').innerHTML = 
    `<button class="autoMine" onclick="autoMine();">Auto<br>Mine<br>${autoMineCost}</button>
    <button class="goldMult" onclick="OreMult();">Gold<br>Mult<br>${multCost}</button>
    <button class="back" onclick="back();">Back</button>`
  }
  // Next purchases
  if (gold > multCost && multLevel > 1 || gold == multCost && multLevel > 1) {
    // alert('mult')
    console.log(`purchased NewMult`)
    gold = gold - multCost
    refreshGold()
    multLevel+=1
    oreFinalMult = (multLevel*2)
    // move()
    console.log(`${multLevel} multLevel`)
    console.log(`${oreFinalMult} oreFinalMult`)
    calculateMultCost()
    updateMult()
    document.getElementById('buttonContainer').innerHTML = 
    `<button class="autoMine" onclick="autoMine();">Auto<br>Mine<br>${autoMineCost}</button>
    <button class="goldMult" onclick="OreMult();">Gold<br>Mult<br>${multCost}</button>
    <button class="back" onclick="back();">Back</button>`
  }
}