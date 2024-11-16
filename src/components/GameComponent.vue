<template>
  <div class="game-container">
    <h3 class="text-xl">Текущий счет: {{ score }}</h3>
    <button @click="startGame" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Начать игру</button>
    <ScoreBoard :score="score" />
  </div>
</template>

<script>
import ScoreBoard from './ScoreBoardComponent.vue';

export default {
  components: {
    ScoreBoard,
  },
  data() {
    return {
      score: 0,
      qTable: {},
      currentState: null,
      actions: ['action1', 'action2', 'action3'], // Пример действий
    };
  },
  methods: {
    startGame() {
      this.resetGame();
      this.runQlearning();
    },
    resetGame() {
      this.score = 0;
      this.currentState = this.getInitialState();
      // Сброс таблицы Q и других параметров
      this.qTable = {};
    },
    getInitialState() {
      return 'initialState'; // Логика для получения начального состояния
    },
    chooseAction(state) {
      // Логика выбора действия на основе таблицы Q (пока рандомно)
      return this.actions[Math.floor(Math.random() * this.actions.length)];
    },
    updateQTable(state, action, reward, nextState) {
      if (!this.qTable[state]) {
        this.qTable[state] = {};
      }
      if (!this.qTable[state][action]) {
        this.qTable[state][action] = 0;
      }
      
      const maxNextQ = Math.max(...Object.values(this.qTable[nextState] || {}));
      const alpha = 0.1; // Коэффициент обучения
      const gamma = 0.9; // Дисконтирующий фактор

      this.qTable[state][action] += alpha * (reward + gamma * maxNextQ - this.qTable[state][action]);
    },
    runQlearning() {
      for (let episode = 0; episode < 100; episode++) { // Количество эпизодов
        let state = this.getInitialState();
        let done = false;

        while (!done) {
          const action = this.chooseAction(state);
          const { nextState, reward } = this.takeAction(action); // Метод для выполнения действия и получения следующего состояния и награды

          this.updateQTable(state, action, reward, nextState);
          state = nextState;
          // if (/* условие завершения */) {
          //   done = true;
          // }
        }
      }
    },
    takeAction(action) {
      const nextState = 'nextState'; // Пример следующего состояния
      const reward = Math.random(); // Пример награды (можно заменить на реальную логику)
      
      return { nextState, reward };
    },
  },
};
</script>

<style scoped>
.game-container {
  padding: 20px;
}
</style>
