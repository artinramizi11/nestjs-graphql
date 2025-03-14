import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

@ObjectType()
@Entity()
export class User {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({unique: true})
    username: string

    @Field()
    @Column()
    password: string 

    @Field()
    @Column({nullable: true})
    age:number 

    @Field()
    @Column({nullable: true})
    city: string

    @Field(() => Profile , {nullable: true})
    @OneToOne(() => Profile, profile => profile.user)
    profile: Promise<Profile>
}