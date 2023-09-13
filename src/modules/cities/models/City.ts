import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class City extends AbstractModel {
  id: string = '';
  city: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
