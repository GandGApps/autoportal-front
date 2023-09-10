import AbstractModel from '../../../settings/abstrcations/models/AbstractModel';

export class TokenData extends AbstractModel {
  token: string | null = null;
  isGuest: boolean = true;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
