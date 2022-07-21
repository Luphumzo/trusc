<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col-sm-6">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Pick a country:</h5>
            <div class="card-text">
              <v-select
                v-model="selectedCountry"
                :options="retrieveCountries"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div
          class="card mb-4"
          v-for="country in retrieveSelectedCountryDetails"
          :key="country.area"
        >
          <div class="card-body">
            <div class="d-flex text-black">
              <div class="w-50 p-3 d-inline-block">
                <img
                  :src="country.flags.png"
                  alt="Generic placeholder image"
                  class="img-fluid"
                  style="width: 100%; height: 100%; border-radius: 10px"
                />
              </div>
              <div class="flex-grow-1 ms-3">
                <h5 class="card-title">
                  {{ country.name.common }}
                </h5>
                <p class="mb-2 pb-1" style="color: #2b2a2a">
                  <span>Area: </span>{{ country.area }}
                </p>

                <div
                  class="d-flex justify-content-center rounded-3 p-3 mb-2"
                  style="background-color: #efefef"
                >
                  <div>
                    <p class="small text-muted mb-1">Population</p>
                    <p class="mb-0">{{ country.population }}</p>
                  </div>
                  <div
                    class="px-3"
                    v-for="currency in country.currencies"
                    :key="currency.name"
                  >
                    <p class="small text-muted mb-1">Currency</p>
                    <p class="mb-0">{{ currency.name }}</p>
                  </div>
                  <div>
                    <p class="small text-muted mb-1">Region</p>
                    <p class="mb-0">{{ country.region }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CountriesComponent",
  components: {},
  data() {
    return {
      selectedCountry: "",
    };
  },
  watch: {
    selectedCountry(newCountry, oldCountry) {
      if (oldCountry !== newCountry) {
        this.$store.dispatch("setSelectedCountry", newCountry);
        this.getCountry(newCountry);
      }
    },
  },
  computed: {
    ...mapGetters([
      "retrieveCountries",
      "retrieveSelectedCountry",
      "retrieveSelectedCountryDetails",
    ]),
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      this.$store.dispatch("getAllCountries");
    },
    getCountry(countryName) {
      this.$store.dispatch("getOneCountry", countryName);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
