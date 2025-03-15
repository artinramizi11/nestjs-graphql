import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ){}
   async canActivate(context: ExecutionContext) {
       const ctx = GqlExecutionContext.create(context)
       const request = ctx.getContext().req;
       const authHeader = request.headers?.authorization
       if(!authHeader){
        throw new UnauthorizedException()
       }
       const [bearer,token] = authHeader.split(" ")
       if(!bearer){
        throw new UnauthorizedException()
       }

       const payload = await this.jwtService.verifyAsync(token, {secret: this.configService.get("jwt_secret_key")})

       console.log(payload)

       if(payload){
        return true
       }

       throw new UnauthorizedException()

    }
    
}