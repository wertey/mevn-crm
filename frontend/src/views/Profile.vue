<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form"
          @submit.prevent="updateName"
    >
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
        >
        <label for="description">Имя</label>
        <span
          class="helper-text invalid">name</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import localStorageToken from '../mixins/localStorageToken';
import UserApi from '../api/UserApi';

export default {
  name: 'Proflie',
  mixins: [localStorageToken],
  data: () => ({
    name: '',
  }),
  methods: {
    updateName() {
      const oldName = this.name;
      UserApi.updateUserName(oldName, this.name);
    },
  },
  beforeMount() {
    this.name = this.$store.getters.info.name;
  },
};
</script>

<style scoped lang="scss">

</style>
