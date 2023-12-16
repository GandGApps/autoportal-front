import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class Banner extends AbstractModel {
  _id: string = '';
  title: string = '';
  image: string = '';
  organizationId: string = '';
  from: string = '';
  to: string = '';
  constructor(props: any) {
    super();
    this.load(props);
  }
}
