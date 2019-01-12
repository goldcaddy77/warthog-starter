import { BaseModel, EmailField, EnumField, Model, StringField } from 'warthog';

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
}
