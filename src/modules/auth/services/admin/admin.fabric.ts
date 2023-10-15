import AbstractServiceRepository from '../../../../settings/abstrcations/repositories/AbstractServiceRepository';
import {Nullable} from '../../../../settings/types/BaseTypes';
import AdminLocal from './admin.local';

class AdminLocalService extends AbstractServiceRepository {
  private adminLocal: AdminLocal;
  constructor() {
    super();
    this.adminLocal = new AdminLocal();
  }

  getAdminStatus = async (): Promise<Nullable<boolean>> => {
    const adminStatus = await this.adminLocal.get();

    if (!adminStatus) {
      return null;
    }

    return adminStatus as Nullable<boolean>;
  };

  setAdminStatus = (isAdmin: boolean) => {
    this.adminLocal.set(isAdmin);
  };

  deleteAdminStatus = () => {
    this.adminLocal.removeAll();
  };
}

export const adminLocalService = new AdminLocalService();
