import React, {useEffect, useState} from 'react';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {RowContainerBeetwen} from '../../../../template/containers/RowContainer';
import {DownIcon} from '../../../../template/icons/DownIcon';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {EmployeersInfo} from './_EmployeersInfo';
import {CenterContainer} from '../../../../template/containers/CenterContainer';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {useAppDispatch, useAppSelector} from '../../../../settings/redux/hooks';
import {
  selectEmployeersValues,
  setFirstName,
  setFirstPhone,
  setFirstPostion,
  setSecondName,
  setSecondPhone,
  setSecondPostion,
  setThirdName,
  setThirdPhone,
  setThirdPosition,
  resetFirstName,
  resetFirstPosition,
  resetFirstPhone,
  resetSecondName,
  resetSecondPosition,
  resetSecondPhone,
  resetThirdName,
  resetThirdPosition,
  resetThirdPhone,
} from '../../../../modules/employeers/EmployeersSlice';
import {MaskHelper} from '../../../../helper/MaskHelper';
import {selectOrganizationsValues} from '../../../../modules/organizations/OrganizationsSlice';

export const CreateEmployeers = () => {
  const select = useAppSelector(selectEmployeersValues);


  const dispatch = useAppDispatch();
 

  const [isShow, setShow] = useState(false);

  return (
    <BorderTopUI $ph={20} $pv={20}>
      <ViewPress onPress={() => setShow(!isShow)}>
        <RowContainerBeetwen>
          <TextUI ag={Ag['600_16']}>{'Дополнительные телефоны'}</TextUI>
          <DownIcon />
        </RowContainerBeetwen>
      </ViewPress>

      {isShow ? (
        <MainContainer $mb={30} $mt={25}>
          <EmployeersInfo
            firstValue={select.firstPostion}
            secondValue={select.firstName}
            thirdValue={MaskHelper.formatPhoneNumber(select.firstPhone) || ''}
            onChangeFirst={value => dispatch(setFirstPostion(value))}
            onChangeSecond={value => dispatch(setFirstName(value))}
            onChangeThird={value => dispatch(setFirstPhone(value))}
          />
          <CenterContainer $pv={25}>
            <MainContainer
              $heightPX={1}
              $widthPRC={50}
              $bg={ColorsUI.gray.light}
            />
          </CenterContainer>
          <EmployeersInfo
            firstValue={select.secondPostion}
            secondValue={select.secondName}
            thirdValue={MaskHelper.formatPhoneNumber(select.secondPhone) || ''}
            onChangeFirst={value => dispatch(setSecondPostion(value))}
            onChangeSecond={value => dispatch(setSecondName(value))}
            onChangeThird={value => dispatch(setSecondPhone(value))}
          />
          <CenterContainer $pv={25}>
            <MainContainer
              $heightPX={1}
              $widthPRC={50}
              $bg={ColorsUI.gray.light}
            />
          </CenterContainer>
          <EmployeersInfo
            firstValue={select.thirdPosition}
            secondValue={select.thirdName}
            thirdValue={MaskHelper.formatPhoneNumber(select.thirdPhone) || ''}
            onChangeFirst={value => dispatch(setThirdPosition(value))}
            onChangeSecond={value => dispatch(setThirdName(value))}
            onChangeThird={value => dispatch(setThirdPhone(value))}
          />
        </MainContainer>
      ) : null}
    </BorderTopUI>
  );
};
