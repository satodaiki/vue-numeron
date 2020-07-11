<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Start from '@/components/templates/Start.vue';
import Play from '@/components/templates/Play.vue';

interface IInputHistory {
  index: number;
  number: string;
  get: number;
  near: number;
}

@Component({
  name: 'App',
  components: {
    Start,
    Play,
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
// a {
//   color: inherit;
//   text-decoration: none;
// }
</style>