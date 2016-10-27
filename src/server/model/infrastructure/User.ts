import { IIdentifiable } from '../IIdentifable';
import { ObjectID } from 'mongodb';
import { IPersistable } from '../IPersistable';

export class User implements IIdentifiable, IPersistable {

    private _id: ObjectID;
    private _mail: string;
    private _name: string;
    private _passwordHash: string;
    private _passwordSalt: string;

    public constructor(name: string, mail: string, passwordHash: string) {
        this.name = name;
        this.mail = mail;
        this.passwordHash = passwordHash;
    }

    public get id(): ObjectID {
        return this._id;
    }

    public set id(value: ObjectID) {
        this._id = value;
    }

    public get mail(): string {
        return this._mail;
    }

    public set mail(value: string) {
        this._mail = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get passwordHash(): string {
        return this._passwordHash;
    }

    public set passwordHash(value: string) {
        this._passwordHash = value;
    }

    public get passwordSalt(): string {
        return this._passwordSalt;
    }

    public set passwordSalt(value: string) {
        this._passwordSalt = value;
    }

    public get toPersistenceNative(): any {
        return {
            id:           this.id,
            mail:         this.mail,
            name:         this.name,
            passwordHash: this.passwordHash,
            passwordSalt: this.passwordSalt
        }
    }
}
