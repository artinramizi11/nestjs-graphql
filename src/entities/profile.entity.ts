import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Profile {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number 

    @Field()
    @Column()
    address: string 

    @Field()
    @Column()
    city: string 

    @Field()
    @Column()
    postalCode: string

    @Field(() => User)
    @OneToOne(() => User, user => user.profile)
    @JoinColumn()
    user: Promise<User>



}