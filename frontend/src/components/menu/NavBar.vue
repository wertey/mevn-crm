<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">
          {{ date }}
        </span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link
                tag="a"
                class="black-text"
                :to="'/profile'"
              >
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a
                href="#"
                class="black-text"
                @click.prevent="logout"
              >
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css';
import moment from 'moment';

export default {
  name: 'Navbar',
  data: () => ({
    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    interval: null,
    dropdown: null,
  }),
  computed: {
    userName() {
      return this.$store.getters.info.name;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = moment().locale('ru').format('MMMM Do YYYY, h:mm:ss');
    }, 1000);
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },
  beforeDestroy() {
    console.log('before destroy');
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>
