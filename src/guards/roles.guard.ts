import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector:Reflector,
    ){}
    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context)
        const user = ctx.getContext().req.user

        const requiredRoles = this.reflector.getAllAndOverride("roles", [context.getHandler(),context.getClass()])
        const isPublic = this.reflector.getAllAndOverride("public",[context.getHandler(),context.getClass()])

        if(!requiredRoles || isPublic) {
            return true
        }

       const hasAnyRequiredRole = requiredRoles.some((role) => user.role.includes(role))

       if(hasAnyRequiredRole) {
        return true
       }

      
        throw new HttpException("You dont have the right role to do this action",HttpStatus.UNAUTHORIZED)

    }
}