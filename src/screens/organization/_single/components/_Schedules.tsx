import {DateHelper} from '../../../../helper/DateHelper';
import {ScheduleModel} from '../../../../modules/organizations/types/OrganizationTypes';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {RowContainer} from '../../../../template/containers/RowContainer';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {Ag, TextUI} from '../../../../template/ui/TextUI';

interface OrgSchedulesProps {
  schedule: ScheduleModel[];
}

export const OrgSchedules = (props: OrgSchedulesProps) => {
  const schedule = DateHelper.buildScheduleText(props.schedule);

  return (
    <BorderTopUI $ph={20} $pv={20}>
      <MainContainer>
        <TextUI $mb={20} ag={Ag['600_16']}>
          {'График работы'}
        </TextUI>
      </MainContainer>

      {schedule.map(dateTime => (
        <RowContainer $mb={5} key={`org-${dateTime.day}`}>
          <TextUI $mr={10} ag={Ag['600_16']}>
            {dateTime.day}
          </TextUI>
          <TextUI ag={Ag['400_16']}>{dateTime.time}</TextUI>
        </RowContainer>
      ))}
    </BorderTopUI>
  );
};
