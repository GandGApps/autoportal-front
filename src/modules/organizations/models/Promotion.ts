import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class Promotion extends AbstractModel {
  _id: string = '';
  description: string = '';
  startPromo: string = '';
  endPromo: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
