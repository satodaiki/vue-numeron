class PlayerNumeron {

    private _value: string;
    private _size: number;
    
    public constructor(size: number, value?: string) {
        if (size > 10 || size < 1) {
            throw new Error('numeronは1桁以上10桁以内で設定してください。');
        }
        if (value) {
            if (value.length !== size) {
                throw new Error(`[${value}]は指定された桁数で設定されていません。指定桁数: ${size}`);
            }
            this._value = value;
            this._size = size;
            return;
        }

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

        this._value = result.slice(0, size);
        this._size = size;
    }

    get value() {
        return this._value;
    }

    get size() {
        return this._size;
    }
}

export default PlayerNumeron;