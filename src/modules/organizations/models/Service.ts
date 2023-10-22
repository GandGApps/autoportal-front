import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class Service extends AbstractModel {
  '_id': string = '';
  'title': string = '';
  'service_id': string = '';
  'is_extended': boolean = false;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
