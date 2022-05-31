import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express'
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshToken extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'refresh-token-secret',
            passReqToCallback: true
        })
    }

    validate(req:Request, payload:any){
        const refreshToken= req.get('authorization').replace('Bearer', '').trim()
        return {...payload, refreshToken}
    }

}