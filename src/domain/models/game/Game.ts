import * as uuid from 'uuid';
import Player from '@/domain/models/player/Player';
import GameMode, { GameModeEnum } from '@/domain/models/game/GameMode';
import PlayerNumeron from '@/domain/models/player/PlayerNumeron';

class Game {
    public readonly id: string;
    private _mode: GameMode;
    private _players: Array<Player>;

    public constructor(mode: GameMode, players: Array<Player>) {
        this.id = uuid.v4();
        this._mode = mode;
        switch (mode.value) {
            case GameModeEnum.SINGLE:
                if (players.length !== 1) {
                    throw new Error('playerは1人のみ設定してください。');
                }
                const computer = new Player('computer', new PlayerNumeron(players[0].numeron.size));
                this._players = [...players, computer];
                break;
            default:
                if (players.length < 2) {
                    throw new Error('playerは2人以上を設定してください。');
                }
                this._players = players;
                break;
        }
    }
}

export default Game;