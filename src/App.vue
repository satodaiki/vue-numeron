<template>
  <v-app>
    <v-container>
      <v-simple-table
        :dense="dense"
        :fixed-header="fixedHeader"
        :height="height"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Input Number</th>
              <th class="text-left">Get</th>
              <th class="text-left">Near</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in getPlayer()" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>

    <v-container>
      <v-text-field placeholder="Please input number." maxlength="4" />
      <v-btn type="button" id="submit_button">Submit</v-btn>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Player, IPlayer } from './store/modules/numeron';

@Component({
  computed: {
    ...mapGetters('numeron', ['getPlayer']),
  },
})
export default class App extends Vue {

  private player1 = new Player();
  
  public create() {
    this.player1.createNumeronNumber();

    this.$store.commit('numeron/addPlayer', this.player1);
  }


}
</script>
