import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class SuccessOrganization extends AbstractModel {
  organizationId: string = '';

  constructor(props: any) {
    super();
    this.load(props);
  }
}
