import UUID from 'uuid';

export interface INumeronState {
    players: Array<IPlayer>;
}
export interface IPlayer {
    id: string;
    numeron?: string;
    inputHistory?: Array<INumeronInput>;
}
export interface INumeronInput {
    number: string;
    get: number;
    near: number;
}
export class NumeronState implements INumeronState {
    players: Array<IPlayer> = [];
}
export class Player implements IPlayer {

    id = UUID.v4();
    numeron = "";
    inputHistory = [];
    
    createNumeronNumber() {
        let numArr: Array<number> = [0,1,2,3,4,5,6,7,8,9];
        let length: number = numArr.length;

        while (length) {
            var j = Math.floor( Math.random() * length );
            var t = numArr[--length];
            numArr[length] = numArr[j];
            numArr[j] = t;
        }
        
        let result: string = "";
        numArr.forEach(v => result += v);

        this.numeron = result.slice(0, 4);
    }
}
export class NumeronInput implements INumeronInput {
    number: string = "";
    get: number = 0;
    near: number = 0;

    private compareInputValue(v: string) {
        if (this.number == v) {
            this.get = 4;
            this.near = 0;
        } else {
            let g: number = 0;
            let n: number = 0;
            for (let i = 0; i < 4; i++) {
                if (this.number[i] === v[i]) {
                    g++;
                    continue;
                }
                for (let j = 0; j < 4; j++) {
                    if (i === j) continue;
                    else if (this.number[i] === v[j]) n++;
                }
            }
            this.get = g;
            this.near = n;
        }
    }
}

const state: INumeronState = {
    players : [],
}

const getters = {
    getPlayer(state: INumeronState, playerId: string) :IPlayer | undefined {
        return state.players.find(p => p.id === playerId);
    }
}

const mutations = {
    addPlayer(state: INumeronState, player: IPlayer) {
        state.players.push(player);
    },
    addInputHistory(state: INumeronState, playerId: string, inputInfo: INumeronInput) {
        let inputHistory = state.players.find(p => p.id === playerId)?.inputHistory;
        if (inputHistory) {
            inputHistory.push(inputInfo);
        }
    },
}

const actions = {
}


export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}