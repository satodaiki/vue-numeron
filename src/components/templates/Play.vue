<template>
  <v-container fluid>
    <v-content>
      <div class="text-h4">Current Player: {{ this.currentPlayerIndex + 1 }}</div>
    </v-content>
    <v-content id="player-1">
      <div class="text-h4">Player 1</div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Input Number</th>
              <th class="text-left">Get</th>
              <th class="text-left">Near</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in players[0].history" :key="item.index">
              <td>{{ item.number }}</td>
              <td>{{ item.get }}</td>
              <td>{{ item.near }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-content>
    <v-content id="player-2">
      <div class="text-h4">Player 2</div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Input Number</th>
              <th class="text-left">Get</th>
              <th class="text-left">Near</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in players[1].history" :key="item.index">
              <td>{{ item.number }}</td>
              <td>{{ item.get }}</td>
              <td>{{ item.near }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-content>

    <v-content class="input-bar">
      <v-container>
        <v-layout>
          <v-flex>
            <v-content>
              <v-form @submit.prevent>
                <v-text-field
                  label="Input Number..."
                  v-model="inputNumber"
                  :counter="4"
                  maxlength="4"
                ></v-text-field>
                <v-btn color="primary" @click="compareAnswer">Send</v-btn>
              </v-form>
            </v-content>
          </v-flex>
          <v-flex>
            <v-content>
                <v-btn to="/">Back</v-btn>
            </v-content>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { uuid } from 'vue-uuid';

interface IPlayer {
  id: string;
  numeron: string;
  history: Array<IInputHistory>;
}
interface IInputHistory {
  index: number;
  number: string;
  get: number;
  near: number;
}
class Player implements IPlayer {
  id: string = uuid.v4();
  numeron: string = '';
  history: Array<IInputHistory> = [];

  constructor(numeron: string) {
    this.numeron = numeron;
  }
}

@Component({
  name: 'Play',
  watch: {
      '$route': 'setMode',
  }
})
export default class Play extends Vue {
  private players: Array<IPlayer> = [];
  private inputNumber: string = '';
  private currentPlayerIndex: number = 0;
  private numeron = '0000';
  private mode = 'single';

  mounted() {
    for (let i = 0; i < 2; i++) {
        this.players.push(new Player(this.computeNumeron()));
    }

    this.setMode();

    switch (this.mode) {
        case 'single':
        case 'multi':
            this.numeron = this.computeNumeron();
            break;
    }
  }

  private setMode() {
      this.$nextTick(() => {
          this.mode = this.$route.params.mode;
      })
  }

  private compareAnswer(): void {
    const result = this.compareInputValue(this.inputNumber, this.numeron);

    if (result[0] === 4) {
        alert('you win');
        this.$router.push({
            name: 'start'
        });
    }

    this.players[this.currentPlayerIndex].history.push({
      index: this.players[this.currentPlayerIndex].history.length,
      number: this.inputNumber,
      get: result[0],
      near: result[1],
    });

    if (this.mode === 'single') {
        const conputerNumeron = this.computeNumeron();
        const conputerResult = this.compareInputValue(conputerNumeron, this.numeron);

        if (conputerResult[0] === 4) {
            alert('you win');
            this.$router.push({
                name: 'start'
            });
        }

        ++this.currentPlayerIndex;
        this.players[this.currentPlayerIndex].history.push({
          index: this.players[this.currentPlayerIndex].history.length,
          number: conputerNumeron,
          get: conputerResult[0],
          near: conputerResult[1],
        });

        this.currentPlayerIndex = 0;
        return;
    }

    if (this.players.length - 1 === this.currentPlayerIndex) this.currentPlayerIndex = 0
    else this.currentPlayerIndex++;
  }

  /**
   * 値比較
   * 
   * @param {*} v 入力値
   * @param {*} a 比較値
   */
  private compareInputValue(v: string, a: string) {
    if (a === v) {
        return [4, 0];
    } else {
        let get = 0;
        let near = 0;
        for (let i = 0; i < 4; i++) {
            if (a[i] === v[i]) {
                get++;
                continue;
            }
            for (let j = 0; j < 4; j++) {
                if (i === j) continue;
                else if (a[i] === v[j]) near++;
            }
        }
        return [get, near];
    }
  }

  /**
   * 4桁で、各桁が違う数値の乱数を生成する
   */
  private computeNumeron(): string {
    let arr = [0,1,2,3,4,5,6,7,8,9];
    let length = arr.length;

    while (length) {
        var j = Math.floor( Math.random() * length );
        var t = arr[--length];
        arr[length] = arr[j];
        arr[j] = t;
    }
    
    let result = "";
    arr.forEach(v => result += v);

    return result.slice(0, 4);
  }
}
</script>

<style lang="scss">
.input-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: white;
}
</style>