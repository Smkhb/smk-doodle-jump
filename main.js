document.addEventListener('DOMContentLoaded',()=>{

  const background = document.querySelector('.grid');
  const doodler = document.createElement('div');

  let doodlerLeftSpace = 50;
  let doodlerBottomSpace = 150;

  let platformCount = 5;
  let platforms = [];

  let upTimerId
  let downTimerId

  let isGameover = false;

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
      })
    }
  }

  const jump = () => {
    clearInterval(downTimerId)

    upTimerId = setInterval(function(){
      
      doodlerBottomSpace+=20;
      doodler.style.bottom = `${doodlerBottomSpace}px`

      if(doodlerBottomSpace>350){
        fall()
      }
    },30)
  }

  const fall = () => {
    clearInterval(upTimerId)

    downTimerId = setInterval(function() {
      
      doodlerBottomSpace -= 5;
      doodler.style.bottom = `${doodlerBottomSpace}px`

      if(doodlerBottomSpace<=0){
        gameOver()
      }
    },30)
  }

  const gameOver = () => {
    isGameover = true;

    clearInterval(downTimerId);
    clearInterval(upTimerId);

  }

  const control = (e)=> {
    if(e.key==='ArrowLeft'){

    }else if(e.key==='ArrowRight'){

    }else if(e.key==='ArrowUp'){
      moveStraight
    }
  }

  const start = () => {
    if(!isGameover){
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms,30);
      jump()

    } 
  }
  start()
})