// import { BaseModel, EmailField, EnumField, Model, OneToMany, StringField } from 'warthog';
import { BaseModel, EmailField, Model, OneToMany, StringField } from 'warthog';

import { Post } from './post.model';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

@Model()
export class User extends BaseModel {
  @StringField({ maxLength: 30 })
  firstName?: string;

  @StringField({ maxLength: 50, minLength: 2, nullable: true })
  lastName?: string;

  // Note: enums are not currently working well in sqlite, so I'm commenting out of the starter for now
  // https://github.com/typeorm/typeorm/pull/4379
  // @EnumField('UserStatus', UserStatus)
  // status?: UserStatus;
  @StringField({ maxLength: 30 })
  status?: string;

  @EmailField() email?: string;

  @OneToMany(() => Post, (post: Post) => post.user)
  posts?: Post[];
}
