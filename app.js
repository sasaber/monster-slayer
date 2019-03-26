new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false
    }, 
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function() {
            if (this.playerAttack(3,10)){
                return;
            }
            this.monsterAttack();
        }, 
        specialAttack: function() {
            if (this.playerAttack(10,20)){
                return;
            }
            this.monsterAttack();
        }, 
        heal: function() {
            if (this.playerHealth <= 90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttack();
        }, 
        giveUp: function() {
            this.gameIsRunning = false;
        }, 
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        }, 
        checkWinner: function(){
            if (this.monsterHealth <= 0) {
                if (confirm("You Won! New Game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if (this.playerHealth <= 0) {
                if (confirm("You lost! New Game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }, 
        monsterAttack: function() {
            this.playerHealth -= this.calculateDamage(5,12);
            this.checkWinner();
        }, 
        playerAttack: function(min, max){
            this.monsterHealth -= this.calculateDamage(min,max);
            if (this.checkWinner()){
                return true;
            }
            return false;
        }
    }
});