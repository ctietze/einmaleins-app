<script setup>
import {ref, computed} from 'vue'
import Home from './views/Home.vue'
import Einmaleins from './views/Einmaleins.vue'
import Results from './views/Results.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'

const routes = {
  '/': Home,
  '/einmaleins': Einmaleins,
  '/ergebnisse': Results,
  '/ueber': About
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div class="row">
    <div class="col-lg-12">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#/einmaleins">Einmaleins Training</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#/ergebnisse">Letzte Ergebnisse</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#/ueber">Über uns</a>
        </li>
      </ul>
    </div>
  </div>

  <component :is="currentView"/>
</template>
