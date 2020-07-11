<template>
  <v-app>
    <v-container>
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
            <tr v-for="item in inputHistory" :key="item.index">
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
})
export default class Play extends Vue {
  private inputHistory: Array<IInputHistory> = [];
  private inputNumber: string = '';
  private numeron = '0000';

  created() {
    this.numeron = this.computeNumeron();
  }

  private compareAnswer() {
    const result = this.compareInputValue(this.inputNumber, this.numeron);

    if (result[0] === 4) alert('you win');

    this.inputHistory.push({
      index: this.inputHistory.length,
      number: this.inputNumber,
      get: result[0],
      near: result[1],
    })
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
  private computeNumeron() {
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
