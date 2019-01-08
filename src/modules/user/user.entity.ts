import { BaseObject, EmailField, EntityObject, StringField } from 'warthog';

@EntityObject()
export class User extends BaseObject {
  @StringField({ maxLength: 30 })
  firstName?: string;

  @StringField({ maxLength: 50, minLength: 2, nullable: true })
  lastName?: string;

  @EmailField() email?: string;
}
