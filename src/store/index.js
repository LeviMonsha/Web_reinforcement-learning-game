import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      score: 0,
      qTable: {},
    };
  },
  mutations: {
    incrementScore(state) {
      state.score++;
    },
    updateQTable(state, { stateKey, action, value }) {
      if (!state.qTable[stateKey]) {
        state.qTable[stateKey] = {};
      }
      state.qTable[stateKey][action] = value;
    },
  },
});

export default store;
