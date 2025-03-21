import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Role } from "src/role.enum";

@ObjectType()
@Entity()
export class User {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number 

    @Field()
    @Column({unique: true})
    email: string;

    @Column()
    password: string 

    @Field(() => Profile , {nullable: true})
    @OneToOne(() => Profile, profile => profile.user , {cascade: true})
    profile: Profile

    @Field(() => Role, {nullable: true})
    @Column({type:"enum", enum: Role , default:Role.USER})
    role: Role

    @CreateDateColumn({type:"timestamp"})
    createdAt: Date

    @UpdateDateColumn({type:"timestamp"})
    updatedAt: Date

    
}