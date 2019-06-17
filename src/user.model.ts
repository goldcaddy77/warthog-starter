import { BaseModel, EmailField, EnumField, Model, OneToMany, StringField } from 'warthog';

import { Post } from './post.model';

// Note: this must be exported and in the same file where it's attached with @EnumField
// Also - must use string enums
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

  @EnumField('UserStatus', UserStatus)
  status?: UserStatus;

  @EmailField() email?: string;

  @OneToMany(() => Post, (post: Post) => post.user)
  posts?: Post[];
}
