import { GraphQLResolveInfo } from 'graphql';
import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseResolver, Context } from 'warthog';

import {
  UserCreateInput,
  UserWhereArgs,
  UserWhereInput,
  UserUpdateArgs,
  UserWhereUniqueInput
} from '../../../generated/classes';
import { User } from './user.entity';

@Resolver(User)
export class UserResolver extends BaseResolver<User> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(User, userRepository);
    // or else it complains about userRepository not being used
    console.log.call(null, typeof this.userRepository);
  }

  @Query(returns => [User])
  async users(
    @Args() { where, orderBy, limit, offset }: UserWhereArgs,
    @Ctx() ctx: Context,
    info: GraphQLResolveInfo
  ): Promise<User[]> {
    return this.find<UserWhereInput>(where, orderBy, limit, offset);
  }

  @Query(returns => User)
  async user(@Arg('where') where: UserWhereUniqueInput): Promise<User> {
    return this.findOne<UserWhereUniqueInput>(where);
  }

  @Mutation(returns => User)
  async createUser(@Arg('data') data: UserCreateInput, @Ctx() ctx: Context): Promise<User> {
    return this.create(data, ctx.user.id);
  }

  @Mutation(returns => User)
  async updateUser(@Args() { data, where }: UserUpdateArgs, @Ctx() ctx: Context): Promise<User> {
    return this.update(data, where, ctx.user.id);
  }
}
