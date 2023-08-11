import React, {useState} from 'react';
import {
  MainContainer,
  defaultContainerCSS,
} from '../../template/containers/MainContainer';
import styled from 'styled-components/native';
import {ButtonWidthCSS} from '../../template/ui/ButtonUI';
import {ContainerProps} from '../../template/ui-types/UITypes';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {ColorsUI} from '../../template/styles/ColorUI';
import {RowContainer} from '../../template/containers/RowContainer';

export type TabItemModel = {
  [key: string]: string;
};

interface TabMenuProps extends ContainerProps {
  activeTab: string;
  tabs: TabItemModel;
  onChangeTab: (activeTab: string) => void;
}

export const TabMenu = (props: TabMenuProps) => {
  const tabList = Object.entries(props.tabs);

  return (
    <RowContainer {...props} $widthPRC={100}>
      {tabList.map(([key, value]) => (
        <TabStyled
          $widthPRC={100 / tabList.length}
          $pb={8}
          key={`tab-${key}`}
          $activeTab={props.activeTab === value}
          onPress={() => props.onChangeTab(value)}>
          <TextUI
            $align={'center'}
            ag={Ag['500_16']}
            color={
              props.activeTab === value ? ColorsUI.black : ColorsUI.gray.main
            }>
            {value}
          </TextUI>
        </TabStyled>
      ))}
    </RowContainer>
  );
};

interface TabStyledProps extends ContainerProps {
  $activeTab: boolean;
}

const TabStyled = styled.TouchableOpacity<TabStyledProps>`
  ${defaultContainerCSS}
  ${ButtonWidthCSS}

  border-bottom-width: 1px;
  border-bottom-color: ${({$activeTab}) =>
    $activeTab ? ColorsUI.black : ColorsUI.gray.light};
`;
