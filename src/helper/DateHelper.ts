import {format, parse, setHours, setMinutes} from 'date-fns';
import {ScheduleModel} from '../modules/organizations/types/OrganizationTypes';
import {ru} from 'date-fns/locale';

const ShortDaysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
export const DaysOfWeek = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const defaultSchedule = {
  title: 'Закрыто',
};

interface FormattedSchedule {
  day: string;
  time: string;
}

interface ScheduleDayForm {
  indexDay: number;
  isAllDay: boolean;
  from: string;
  to: string;
}

export class DateHelper {
  static buildScheduleText = (scheduleArray: ScheduleModel[]) => {
    const result: FormattedSchedule[] = ShortDaysOfWeek.map((day, index) => {
      const item = scheduleArray[index] || defaultSchedule;
      let time = 'закрыто';

      if (item.isAllDay) {
        time = 'круглосуточно';
      } else if (item.from && item.to) {
        time = `${item.from} - ${item.to}`;
      }

      return {day, time};
    });

    return result;
  };

  static getScheduleForm = (scheduleDayForm: ScheduleDayForm) => {
    const title = DaysOfWeek[scheduleDayForm.indexDay];

    const dayParams = scheduleDayForm.isAllDay
      ? {
          isAllDay: true,
        }
      : {
          from: scheduleDayForm.from,
          to: scheduleDayForm.to,
        };

    return {title, ...dayParams};
  };

  static getToday = () => {
    return format(new Date(), 'dd.MM.yyyy');
  };

  static getFormatDate = (date: Date) => {
    return format(date, 'dd.MM.yyyy');
  };

  static getFormatTime = (date: Date) => {
    return format(date, 'HH:mm', {locale: ru});
  };

  static getParseDate = (date: string) => {
    return parse(date, 'dd.MM.yyyy', new Date());
  };

  static getParseTime = (date: string) => {
    const [hours, minutes] = date.split(':').map(Number);

    const currentDate = new Date();

    return setHours(setMinutes(currentDate, minutes), hours);
  };

  static isStartMoreEnd = (dateStart: Date, dateEnd: string) => {
    return dateStart > parse(dateEnd, 'dd.MM.yyyy', new Date());
  };
}
