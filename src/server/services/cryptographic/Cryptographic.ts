import { ICryptographicService } from './ICryptographicService';
import { provideSingleton } from '../../ioc/ioc';
import TYPES from '../../constant/types';

import * as bcrypt from 'bcrypt-nodejs';

@provideSingleton(TYPES.ICryptographicService)
export class Cryptographic implements ICryptographicService {

    public generateHash(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }

    public isPasswordValid(testedPassword: string, sourceHash: string): boolean {
        return bcrypt.compareSync(testedPassword, sourceHash);
    }
}
