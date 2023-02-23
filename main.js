document.addEventListener('DOMContentLoaded',()=>{

  const background = document.querySelector('.grid');
  const doodler = document.createElement('div');

  let startPoint = 150;
  let doodlerLeftSpace = 50;
  let doodlerBottomSpace = startPoint;

  let platformCount = 5;
  let platforms = [];

  let upTimerId;
  let downTimerId;
  let leftTimerId;
  let rightTimerId;

  let isGameover = false;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let score = 0

  const createDoodler = ()=> {
    background.appendChild(doodler)

    doodlerLeftSpace = platforms[0].left;

    doodler.classList.add('doodler')
    doodler.style.left = `${doodlerLeftSpace}px`
    doodler.style.bottom = `${doodlerBottomSpace}px`
  }

  class Platform {
    constructor(newPlatBottom) {
      this.bottom = newPlatBottom;
      this.left = Math.random()* 315;
      this.visual = document.createElement('div');
      
      const visual = this.visual;
      visual.classList.add('platform');

      visual.style.bottom = `${this.bottom}px`;
      visual.style.left = `${this.left}px`;

      background.appendChild(visual);
    }
  }

  const createPlatforms = () => {
    for(let i=0;i< platformCount;i++){
      
      let platformGap = 600 / platformCount;
      let newPlatBottom = 100 + i * platformGap;
      let newPlatForm = new Platform(newPlatBottom);

      platforms.push(newPlatForm);

      console.table(platforms)
    }
  }

  const movePlatforms = () => {
    if(doodlerBottomSpace>200){
      platforms.forEach(platform=>{
        platform.bottom -= 4;

        let visual = platform.visual
        visual.style.bottom = `${platform.bottom}px` 

        if(platform.bottom<10){
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove('platform')
          platforms.shift()
          score++
          console.log(platforms)
          let newPlatForm = new Platform(600)
          platforms.push(newPlatForm)
        }
      })
    }
  }

  const jump = () => {
    clearInterval(downTimerId)
    isJumping= true

    upTimerId = setInterval(function(){
      
      doodlerBottomSpace+=20;
      doodler.style.bottom = `${doodlerBottomSpace}px`

      if(doodlerBottomSpace>startPoint+200){
        fall()
      }
    },30)
  }

  const fall = () => {
    clearInterval(upTimerId)
    isJumping = false

    downTimerId = setInterval(function() {
      
      doodlerBottomSpace -= 5;
      doodler.style.bottom = `${doodlerBottomSpace}px`

      if(doodlerBottomSpace<=0){
        gameOver()
      }

      platforms.forEach(platform=>{
        if(
          (doodlerBottomSpace >= platform.bottom) &&
          (doodlerBottomSpace <= (platform.bottom + 15)) &&
          ((doodlerLeftSpace + 60) >= platform.left) && 
          (doodlerLeftSpace <= (platform.left + 85)) &&
          !isJumping
          ) {
            console.log('landed')
            startPoint = doodlerBottomSpace
            jump()
          }
      })
    },30)
  }

  const gameOver = () => {
    isGameover = true;

    while(background.firstChild){
      background.removeChild(background.firstChild)
    }
    grid.innerHTML = score
    clearInterval(downTimerId);
    clearInterval(upTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId)

  }

  const control = (e)=> {
    if(e.key==='ArrowLeft'){
      moveLeft()
    }else if(e.key==='ArrowRight'){
      moveRight()
    }else if(e.key==='ArrowUp'){
      moveStraight()
    }
  }

  const moveLeft = () => {
    if(isGoingRight){
      clearInterval(rightTimerId)
      isGoingRight = false
    }

    leftTimerId = setInterval(function(){
      if(doodlerLeftSpace>=0){
        doodlerLeftSpace -= 5;
        doodler.style.left = `${doodlerLeftSpace}px`        
      }else moveRight()

    },30)
    
  }

  const moveRight = () => {
    if(isGoingLeft){
      clearInterval(leftTimerId)
      isGoingLeft = false
    }
    isGoingRight = true;

    rightTimerId = setInterval(function(){
      if(doodlerLeftSpace<=340){
        doodlerLeftSpace += 5;
        doodler.style.left = `${doodlerLeftSpace}px`        
      }else moveLeft()

    },30)
    
  }

  const moveStraight = () => {
    isGoingLeft = false
    isGoingRight = false
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
  }

  const start = () => {
    if(!isGameover){
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms,30);
      jump()
      document.addEventListener('keyup',control)

    } 
  }
  start()
})