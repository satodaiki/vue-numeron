<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Start from '@/components/templates/Start.vue';
import Play from '@/components/templates/Play.vue';

@Component({
  name: 'App',
  components: {
    Start,
    Play,
  }
})
export default class App extends Vue {}
</script>
