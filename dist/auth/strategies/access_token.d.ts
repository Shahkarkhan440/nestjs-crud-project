import { Strategy } from "passport-jwt";
declare const AccessToken_base: new (...args: any[]) => Strategy;
export declare class AccessToken extends AccessToken_base {
    constructor();
    validate(payload: any): any;
}
export {};
