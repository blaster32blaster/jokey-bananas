<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/banana.jpg" alt="Vuetify.js" class="mb-5">
        <h4>Welcome to Jokey Bananas</h4>
        <div class="main-div-options">
          <v-btn color="info" @click="gotoCatchBanana">Catch a Banana</v-btn>
          <router-link to='catch-banana'>
          <v-btn color="info">Throw a Banana</v-btn>
          </router-link>
          <router-link to='CatchBanana'>
            <v-btn color="info">Peel a Banana</v-btn>
          </router-link>  
          <v-btn color="info">Squish a Banana</v-btn>
        </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
    import Vue from 'vue'
    import Toasted from 'vue-toasted'

    Vue.use(Toasted)
    export default {
      props: {
      },
      data () {
        return {
          catchBanana: '/catch-banana'
        }
      },
      methods: {
        gotoCatchBanana () {
          this.$router.push(this.catchBanana)
        }
      },
      mounted () {
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
h4 {
  justify-content: center;
  text-align: center;
}
.main-div-options {
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 100%;
  flex-wrap: wrap;
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
img {
  max-width: 90%;
}
.v-btn__content a {
  color: white;
  text-decoration: none;
}
</style>
