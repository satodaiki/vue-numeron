import * as uuid from 'uuid';
import PlayerNumeron from '@/domain/models/player/PlayerNumeron';
import InputHisoty from '@/domain/models/inputHistory/InputHistory';

class Player {
    public readonly id: string;
    private _name: string;
    private _numeron: PlayerNumeron;
    private _history = new Array<InputHisoty>();

    public constructor(name: string, numeron: PlayerNumeron) {
        this.id = uuid.v4();
        this._name = name;
        this._numeron = numeron;
    }

    get numeron() {
        return this._numeron;
    }

    public addHistory(history: InputHisoty) {
        this._history.push(history);
    }
}

export default Player;