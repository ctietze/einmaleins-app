<script setup>
import {ref, computed} from 'vue'
import HomeView from './views/HomeView.vue'
import EinmaleinsView from './views/EinmaleinsView.vue'
import ResultsView from './views/ResultsView.vue'
import AboutView from './views/AboutView.vue'
import NotFoundView from './views/NotFoundView.vue'

const routes = {
  '/': HomeView,
  '/einmaleins': EinmaleinsView,
  '/ergebnisse': ResultsView,
  '/ueber': AboutView
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFoundView
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
