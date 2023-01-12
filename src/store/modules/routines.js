import axios from "axios";
const state = {
  routines:[],
  loading:true,
};
const getters = {};

const actions = {
  getRoutines({ commit }, user_id) {
    commit("setLoading", true);
    axios.get(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/workout_routines?filter[user_id]=" + user_id).then(response => {
        commit("setRoutines", response.data.data[0]);
        commit("setLoading", false);
    });
},
};

const mutations = {
  setRoutines(state, data){
    state.routines = data;
  },
  setLoading(state, data) {
    state.loading = data
},
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}