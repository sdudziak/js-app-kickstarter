export class DoubleIdentifierMap<T> {
    protected ID_1_list: { [key: string]: T};
    protected ID_2_list: { [key: string]: T};

    constructor() {
        this.ID_1_list = {};
        this.ID_2_list = {};
    }

    public add(firstKey: string, secondKey: string, value: T): void {
        this.ID_1_list[firstKey]  = value;
        this.ID_2_list[secondKey] = value;
    }

    public has(key: string): boolean {
        return key in this.ID_1_list || key in this.ID_2_list;
    }

    public getByFirstKey(key: string): T {
        return this.ID_1_list[key];
    }

    public getBySecondKey(key: string): T {
        return this.ID_2_list[key];
    }

    public remove(firstKey: string, secondKey: string): void {
        delete(this.ID_1_list[firstKey]);
        delete(this.ID_2_list[secondKey]);
    }
}
