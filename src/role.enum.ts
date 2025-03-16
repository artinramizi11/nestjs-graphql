import { registerEnumType } from "@nestjs/graphql";

export enum Role {
    USER = "user",
    ADMIN = "admin",
    SUPERADMIN = "super-admin"
}

registerEnumType(Role, {
    name:"Role"
})