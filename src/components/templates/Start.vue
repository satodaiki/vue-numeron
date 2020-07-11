<template>
    <v-container>
        <div class="text-h3">SELECT MODE.</div>
        <v-radio-group v-model="mode" :mandatory="false">
            <v-radio label="Single" value="single"></v-radio>
            <v-radio label="Multi (To Be Continued...)" value="multi"></v-radio>
        </v-radio-group>
        <v-btn @click="movePlay">Start</v-btn>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'Start'
})
export default class Start extends Vue {
    private mode: string = 'single';

    private movePlay() {
        this.$router.push({
            name: 'play',
            params: {
                mode: this.mode
            }
        })
    }
}
</script>