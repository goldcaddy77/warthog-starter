import { BaseModel, EmailField, Model, StringField } from 'warthog';

@Model()
export class User extends BaseModel {
  @StringField({ maxLength: 30 })
  firstName?: string;

  @StringField({ maxLength: 50, minLength: 2, nullable: true })
  lastName?: string;

  @EmailField() email?: string;
}
