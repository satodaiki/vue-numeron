import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import Player from '@/domain/models/player/Player'

@Module({ dynamic: true, store, namespaced: true, name: 'game' })
class Game extends VuexModule {
    private players = new Array<Player>();

    @Mutation
    private ADD_PLAYER(payload: Player) {
        this.players.push(payload);
    }

    @Action
    public addPlayer(payload: Player) {
        this.ADD_PLAYER(payload);
    }
}
  
export const GameModule = getModule(Game)