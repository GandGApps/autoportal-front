import React, {useState} from 'react';
import {ScrollViewScreen} from '../../template/containers/ScrollViewScreen';
import {RowContainer} from '../../template/containers/RowContainer';
import {BackBtn} from '../../template/ui/BackBtn';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {Textarea} from '../../components/Textarea';
import {MainContainer} from '../../template/containers/MainContainer';
import {useAppSelector} from '../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import {ButtonUI} from '../../template/ui/ButtonUI';
import {TelegramPressIcon} from '../../template/icons/TelegramPressIcon';
import {ViewPress} from '../../template/containers/ViewPress';
import {ColumnContainerBetweenFlex} from '../../template/containers/ColumnContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Linking, StatusBar} from 'react-native';
import {CenterContainer} from '../../template/containers/CenterContainer';
import {appConfig} from '../../appConfig';

export const ReportScreen = () => {
  const {currentOrganization} = useAppSelector(selectOrganizationsValues);

  const [report, setReport] = useState('');

  const insets = useSafeAreaInsets();

  return (
    <ScrollViewScreen
      $ph={20}
      contentContainerStyle={{
        flex: 1,
        paddingBottom: Math.max(insets.bottom, 20),
        paddingTop: Math.max(insets.top, 20),
      }}>
      <ColumnContainerBetweenFlex>
        <StatusBar barStyle={'dark-content'} />
        <MainContainer>
          <RowContainer $mb={30}>
            <BackBtn />
            <TextUI ag={Ag['500_18']}>{'Жалоба'}</TextUI>
          </RowContainer>

          <TextUI $mb={10} ag={Ag['400_14']}>
            {'Причина жалобы'}
          </TextUI>
          <MainContainer $mb={20}>
            <Textarea
              placeholder="Напишите причину жалобы на данное обьявление"
              value={report}
              onChangeText={setReport}
            />
          </MainContainer>

          <TextUI
            $mb={20}
            ag={Ag['500_18']}>{`ID: ${currentOrganization?._id}`}</TextUI>

          <ButtonUI title={'Отправить'} />
        </MainContainer>

        <MainContainer>
          <CenterContainer>
            <ViewPress
              $mb={10}
              onPress={() => Linking.openURL(`https://t.me/grigor_zh`)}>
              <TelegramPressIcon />
            </ViewPress>
          </CenterContainer>
          <TextUI $align={'center'} ag={Ag['500_16']}>
            {'Связаться с администрацией\nчерез телеграм'}
          </TextUI>
        </MainContainer>
      </ColumnContainerBetweenFlex>
    </ScrollViewScreen>
  );
};
