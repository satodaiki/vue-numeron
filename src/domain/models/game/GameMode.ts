enum GameModeEnum {
    SINGLE,
    MULTI
}

class GameMode {
    private _value: GameModeEnum;

    public constructor(value: GameModeEnum) {
        this._value = value;
    }

    get value(): GameModeEnum {
        return this._value;
    }
}

export default GameMode;
export { GameModeEnum };