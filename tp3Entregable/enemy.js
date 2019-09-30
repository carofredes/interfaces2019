class Enemy {
  constructor(id, reward) {
    this.showingEnemy = false;
    this.idEnemy = id;
    this.reward = reward || 0;
  }

  isShowing() {
    return this.showingEnemy;
  }

  getReward() {
    return this.reward;
  }

  hideEnemy() {
    this.showingEnemy = false;
  }
  
  showEnemy() {
    console.log("showEnemy")

    $(`#${this.idEnemy}`).addClass('showEnemy');
    this.showingEnemy = true;
  }

  stop() {
    console.log("stop")

    $(`#${this.idEnemy}`).addClass('stopEnemy');
  }

  resuming() {
    if ($(`#${this.idEnemy}`).hasClass('stopEnemy')) {
      $(`#${this.idEnemy}`).removeClass('stopEnemy');
    }
  }

  getLeftMin() {
    const thisSize = this.sizes.filter(enemy => enemy.id === this.idEnemy );
    return thisSize[0].leftMin;
  }

  getLeftMax() {
    const thisSize = this.sizes.filter(enemy => enemy.id === this.idEnemy );

    return thisSize[0].leftMax;
  }

  getOtherTop() {
    const thisSize = this.sizes.filter(enemy => enemy.id === this.idEnemy );
    return thisSize[0].topOther;
  }

  checkCollision(other) {
    const enemy = $(`#${this.idEnemy}`).position();

   // console.log( "fire",enemy.top)
    if (this.showingEnemy){
      switch (this.idEnemy) {
        case 'copa':
          if (this.showingEnemy && (100 <= enemy.left && enemy.left <= 230) && (other.top >= 474)){
            return true;
          }
        case 'smallFireCoins1':
          if ((100<=enemy.left && enemy.left<=180) && (340 <=other.top && other.top <=380)){
            return true;
          }
        default:
          return false;
      }
    }
    return false;
  }
}