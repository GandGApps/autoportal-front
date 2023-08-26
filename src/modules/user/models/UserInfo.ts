import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class UserInfo extends AbstractModel {
  _id: string = '';
  city: string = '';
  fullName: string = '';
  phone: string = '';
  email: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
