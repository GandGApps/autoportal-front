import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class ServiceExt extends AbstractModel {
  '_id': string = '';
  'title': string = '';
  'is_extended': boolean = false;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
