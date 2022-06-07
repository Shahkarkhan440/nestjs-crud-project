import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt'){
    constructor(private reflector: Reflector){
        super();
    }

    canActivate(context: ExecutionContext){
        const isPublicRoute = this.reflector.getAllAndOverride('isPublicRoute',[
            context.getHandler(),
            context.getClass()
        ]) 
        if(isPublicRoute) return true
        return super.canActivate(context)
    }
 
}