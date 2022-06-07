import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const getRequestUser = createParamDecorator(
    (data: string | undefined , context: ExecutionContext)=>{
        const request = context.switchToHttp().getRequest()
        if(!data) return request.user
        return request.user['data']
    }
);  