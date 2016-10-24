export class Token {
    private _payload: { id: string, expireAt: number };
    private _tokenValue: string;

    public constructor(payload: { id: string, expireAt: number }, tokenValue: string) {
        this._payload    = payload;
        this._tokenValue = tokenValue;
    }

    public get payload(): any {
        return this._payload;
    }

    public toString(): string {
        return this._tokenValue;
    }

    public toJson(): {expireAt: number, token: string} {
        return {
            expireAt: this._payload.expireAt,
            token:    this._tokenValue
        }
    }
}
