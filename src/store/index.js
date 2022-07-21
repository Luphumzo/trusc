import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state() {
    return { countries: [], selectedCountry: "", selectedCountryDetails: [] };
  },
  mutations: {
    addCountries(state, payload) {
      if (state.countries.length === 0)
        payload.filter((v) => {
          state.countries.push(v.name.common);
        });
    },
    addCountryDetails(state, payload) {
      state.selectedCountryDetails = payload;
    },
    setSelectedCountry(state, payload) {
      state.selectedCountry = payload;
    },
  },
  getters: {
    retrieveCountries(state) {
      return state.countries;
    },
    retrieveSelectedCountry(state) {
      return state.selectedCountry;
    },
    retrieveSelectedCountryDetails(state) {
      return state.selectedCountryDetails;
    },
  },
  actions: {
    async getAllCountries(context) {
      await axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          context.commit("addCountries", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setSelectedCountry(context, payload) {
      context.commit("setSelectedCountry", payload);
    },
    async getOneCountry(context, payload) {
      await axios
        .get("https://restcountries.com/v3.1/name/" + payload)
        .then((response) => {
          context.commit("addCountryDetails", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  modules: {},
});
