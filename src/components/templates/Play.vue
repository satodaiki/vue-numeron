<template>
  <v-app>
    <v-container>{{ numeron }}</v-container>
    <v-container>
      <div class="text-h4">Current Player: {{ this.currentPlayer + 1 }}</div>
    </v-container>
    <v-container id="player-1">
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
            <tr v-for="item in inputHistoryArr[0]" :key="item.index">
              <td>{{ item.number }}</td>
              <td>{{ item.get }}</td>
              <td>{{ item.near }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-container id="player-2">
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
            <tr v-for="item in inputHistoryArr[1]" :key="item.index">
              <td>{{ item.number }}</td>
              <td>{{ item.get }}</td>
              <td>{{ item.near }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-container>
      <v-form @submit.prevent>
        <v-text-field
          label="Input Number..."
          v-model="inputNumber"
          :counter="4"
          maxlength="4"
        ></v-text-field>
        <v-btn color="primary" @click="compareAnswer">Send</v-btn>
      </v-form>
    </v-container>
    <v-container>
        <v-btn to="/">Back</v-btn>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface IInputHistory {
  index: number;
  number: string;
  get: number;
  near: number;
}

@Component({
  name: 'Play',
  watch: {
      '$route': 'setMode',
  }
})
export default class Play extends Vue {
  private inputHistoryArr: Array<Array<IInputHistory>> = [];
  private inputNumber: string = '';
  private currentPlayer: number = 0;
  private numeron = '0000';
  private mode = 'single';

  mounted() {
    for (let i = 0; i < 2; i++) {
        this.inputHistoryArr.push(new Array<IInputHistory>());
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

    this.inputHistoryArr[this.currentPlayer].push({
      index: this.inputHistoryArr[this.currentPlayer].length,
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

        ++this.currentPlayer;
        this.inputHistoryArr[this.currentPlayer].push({
            index: this.inputHistoryArr[this.currentPlayer].length,
            number: conputerNumeron,
            get: conputerResult[0],
            near: conputerResult[1],
        });

        this.currentPlayer = 0;
        return;
    }

    if (this.inputHistoryArr.length + 1 === this.currentPlayer) this.currentPlayer = 0
    else this.currentPlayer++;
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
