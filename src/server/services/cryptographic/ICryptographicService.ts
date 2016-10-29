export interface ICryptographicService {
    generateHash(password: string): string;
    isPasswordValid(testedPassword: string, sourceHash: string): boolean
}
