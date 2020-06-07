<template>
  <div class="app-main-layout">

    <Navbar @click="isOpen = !isOpen" />

    <Sidebar v-model="isOpen" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link
        tag="a"
        class="btn-floating btn-large blue"
        :to="'/record'"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/menu/Navbar.vue';
import Sidebar from '../components/menu/Sidebar.vue';

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
  }),
  components: {
    Navbar,
    Sidebar,
  },
};
</script>
