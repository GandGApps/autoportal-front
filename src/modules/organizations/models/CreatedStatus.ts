import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';
export class CreatedStatus extends AbstractModel {
  createdStatus: boolean = false;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
