import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

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

    @Field()
    @Column({nullable: true})
    role: string

    
}