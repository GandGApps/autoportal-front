import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class UserInfo extends AbstractModel {
  _id: string = '';
  city: string = '';
  full_name: string = '';
  phone_number: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
