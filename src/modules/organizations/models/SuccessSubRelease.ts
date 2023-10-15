import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class SuccessSubRelease extends AbstractModel {
  isSubscribe: boolean = false;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
