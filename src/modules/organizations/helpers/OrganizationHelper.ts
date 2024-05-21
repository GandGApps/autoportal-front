import {EmployeersStateModel} from './../../employeers/types/EmployeersTypes';
import {DaysOfWeek} from './../../../helper/DateHelper';
import {PersonalOrganizations} from './../models/PersonalOrganizations';
import {
  CreateOrganizationDTO,
  EmployeerModel,
  ScheduleFilterDTO,
  UnitsFilter,
} from './../types/OrganizationTypes';
import {FilterFormKeys} from '../form/FilterForm';
import {CreatetFormModel} from '../form/CreateForm';
import {CurrentOrganization} from '../models/CurrentOrganization';
import {Nullable} from '../../../settings/types/BaseTypes';
import {MaskHelper} from '../../../helper/MaskHelper';
import {fileSevice} from '../../files/api/file-service';

interface FormattedPersonal {
  activeList: PersonalOrganizations[];
  disabledList: PersonalOrganizations[];
}

type EmployeerValidKey = 'first' | 'second' | 'third';

export class OrganizationHelper {
  static getModalTitle = (typeModal: FilterFormKeys, title?: string) => {
    if (!!title) {
      return title;
    }

    switch (typeModal) {
      case 'category':
        return 'Выберите категорию';
      case 'typeService':
        return 'Выберите услуги';
      case 'brandCar':
        return 'Выберите марки машин';
      case 'sort':
        return 'Выберите сортировку';
      case 'schedule':
        return 'Выберите график работы';
      default:
        return '';
    }
  };

  static getSubsCheckedList = (_list: string[], _subs: UnitsFilter[]) => {
    const tempPickList: string[] = _subs.map(subItem => subItem._id);

    if (_list.join().includes(tempPickList.join())) {
      return [..._list.filter(item => !tempPickList.includes(item))];
    }

    return [..._list, ...tempPickList];
  };

  static checkCategorySub = (
    _list: string[],
    _subs: UnitsFilter[],
  ): boolean => {
    const tempSubs = _subs.map(item => item._id);

    return (
      _list.filter(item => tempSubs.includes(item)).length === tempSubs.length
    );
  };

  static formattedMyOrganizations = (
    list: PersonalOrganizations[],
  ): FormattedPersonal => {
    return {
      activeList: list.filter(item => item.isActive),
      disabledList: list.filter(item => !item.isActive),
    };
  };

  static formattedScheduleDTO = (
    schedules: string[],
  ): Nullable<ScheduleFilterDTO> => {
    const days = schedules.filter(day => day !== 'allTime' && day !== 'now');

    let scheduleFilter: ScheduleFilterDTO = {};

    if (schedules.includes('allTime')) {
      scheduleFilter = {...scheduleFilter, isAllDay: true};
    }

    if (schedules.includes('now')) {
      scheduleFilter = {...scheduleFilter, isNowWork: true};
    }

    if (days.length) {
      scheduleFilter = {
        ...scheduleFilter,
        Days: days.map(day => DaysOfWeek[parseInt(day, 10) - 1]),
      };
    }

    if (Object.entries(scheduleFilter).length) {
      return scheduleFilter;
    }

    return null;
  };

  static getDefaultCreateForm = (
    organization: CurrentOrganization,
  ): CreatetFormModel => {
    const ids = new Set();

    organization.services.forEach(item => {
      ids.add(item?.service._id);
      item.ext_services.forEach(ext_service => {
        ids.add(ext_service._id);
      });
    });

    const uniqueIds: string[] = Array.from(ids);

    return {
      id: organization._id,
      name: organization.name,
      city: organization.city,
      _services: organization.services,
      category: organization.categoryId,
      typeService: uniqueIds,
      brandCar: organization.brandsCars.map(item => item._id) || [],
      schedule: organization.schedule,
      address: organization.address,
      mainPhone: organization.mainPhone || '',
      whatsApp: organization.whatsApp || '',
      employeers: organization.employeers || [],
      description: organization.description,
      logo: organization.logo,
      photos: organization.photos,
    };
  };

  static getEmployeers = (state: EmployeersStateModel) => {
    const employeers: EmployeerModel[] = [];

    if (this.isEmployeerCheck(state, 'first')) {
      employeers.push({
        name: state.firstName || 'Не указан',
        position: state.firstPostion || 'Не указан',
        phone: state.firstPhone || 'Не указан',
      });
    }

    if (this.isEmployeerCheck(state, 'second')) {
      employeers.push({
        name: state.secondName || 'Не указан',
        position: state.secondPostion || 'Не указан',
        phone: state.secondPhone || 'Не указан',
      });
    }

    if (this.isEmployeerCheck(state, 'third')) {
      employeers.push({
        name: state.thirdName || 'Не указан',
        position: state.thirdPosition || 'Не указан',
        phone: state.thirdPhone || 'Не указан',
      });
    }

    return employeers;
  };

  static isEmployeerCheck = (
    state: EmployeersStateModel,
    key: EmployeerValidKey,
  ) => {
    switch (key) {
      case 'first':
        return (
          state.firstName.length ||
          state.firstPostion.length ||
          state.firstPhone.length
        );
      case 'second':
        return (
          state.secondName.length ||
          state.secondPostion.length ||
          state.secondPhone.length
        );
      case 'third':
        return (
          state.thirdName.length ||
          state.thirdPosition.length ||
          state.thirdPhone.length
        );
    }
  };

  static createOrganizationDto = async (
    createForm: CreatetFormModel,
  ): Promise<CreateOrganizationDTO> => {
    let dto: CreateOrganizationDTO = {
      name: createForm.name,
      address: createForm.address,
      categoryId: createForm.category?._id!,
      city: createForm.city,
      description: createForm.description,
    };

    if (createForm.logo && Boolean(createForm.logo.length)) {
      dto = {...dto, logo: createForm.logo};
    }

    if (createForm.id) {
      dto = {...dto, id: createForm.id};
    }

    if (createForm.employeers.length) {
      dto = {
        ...dto,
        employeers: createForm.employeers,
      };
    }

    if (createForm.brandCar.length) {
      dto = {
        ...dto,
        brandsCars: createForm.brandCar,
      };
    }

    if (createForm.mainPhone.length) {
      dto = {
        ...dto,
        mainPhone: MaskHelper.clearFormat(createForm.mainPhone),
      };
    }

    if (createForm.whatsApp.length) {
      dto = {
        ...dto,
        whatsApp: MaskHelper.clearFormat(createForm.whatsApp),
      };
    }

    if (createForm.schedule.length) {
      dto = {
        ...dto,
        schedule: createForm.schedule,
      };
    }

    if (createForm.typeService.length) {
      dto = {
        ...dto,
        typeServices: createForm.typeService,
      };
    }
    if (!createForm.typeService.length) {
      dto = {
        ...dto,
        typeServices: [],
      };
    }
    if (createForm.id) {
      dto = {...dto, id: createForm.id};
    }

    if (createForm.photos.length) {
      dto = {
        ...dto,
        photos: createForm.photos,
      };
    }

    return dto;
  };

  static freeMonthSubText = (freePeriod: number) => {
    if (freePeriod === 1) {
      return 'Первый месяц бесплатно';
    }

    return `Первые ${freePeriod} месяца бесплатно`;
  };
}
