new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false, 
        turns: []
    }, 
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
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
            let healing = 10;
            if (this.playerHealth <= 90){
                this.playerHealth += healing;
            } else {
                healing = 100 - this.playerHealth;
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: "Player heals for " + healing
            });
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
            let damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false, 
                text: 'Monster hits player for ' + damage
            });
            this.checkWinner();
        }, 
        playerAttack: function(min, max){
            let damage = this.calculateDamage(min,max);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true, 
                text: 'Player hits monster for ' + damage
            });
            if (this.checkWinner()){
                return true;
            }
            return false;
        }
    }
});