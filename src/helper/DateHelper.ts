import {ScheduleModel} from '../modules/organizations/types/OrganizationTypes';

const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

const defaultSchedule = {
  title: 'Закрыто',
};

interface FormattedSchedule {
  day: string;
  time: string;
}

export class DateHelper {
  static buildScheduleText = (scheduleArray: ScheduleModel[]) => {
    const result: FormattedSchedule[] = daysOfWeek.map((day, index) => {
      const item = scheduleArray[index] || defaultSchedule;
      let time = 'закрыто';

      if (item.isAllDay) {
        time = 'круглосуточно';
      } else if (item.to && item.do) {
        time = `${item.to} - ${item.do}`;
      }

      return {day, time};
    });

    return result;
  };
}
