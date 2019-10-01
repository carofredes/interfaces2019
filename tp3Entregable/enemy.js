class Enemy {
  constructor(id, reward) {
    this.showingEnemy = false;
    this.idEnemy = id;
    this.hasRewards = false;
    this.reward = reward || 0;
  }

  isShowing() {
    return this.showingEnemy;
  }

  hasReward() {
    return this.hasRewards;
  }

  getReward() {
    return this.reward;
  }

  hideEnemy() {
    this.showingEnemy = false;
    $(`#${this.idEnemy}`).removeClass('showEnemy');
    $(`#${this.idEnemy}`).removeClass('stopEnemy');
  }
  
  showEnemy() {
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
    if (this.showingEnemy){
      if (this.idEnemy === 'copa') {
        if ((100 <= enemy.left && enemy.left <= 230) && (other.top >= 474)){
          return true;
        }
      }
      else if (this.idEnemy === 'smallFireCoins1') {
        if ((100 <= enemy.left && enemy.left <= 180) && (340 <= other.top && other.top <=380)){
          return true;
        }
      }
      else if (this.idEnemy === 'smallCoins') {
        if ((100 <= enemy.left && enemy.left <= 300) && (300 <= other.top && other.top <=380)){
          return true;
        }
      }
    }
    
    return false;
  }
}