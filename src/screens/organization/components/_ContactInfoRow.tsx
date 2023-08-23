import React, {ReactNode} from 'react';
import {RowContainer} from '../../../template/containers/RowContainer';
import {MainContainer} from '../../../template/containers/MainContainer';
import {Ag, TextUI} from '../../../template/ui/TextUI';

interface _ContactInfoProps {
  icon: ReactNode;
  text: string;
}

export const OrgContactInfoRow = (props: _ContactInfoProps) => {
  return (
    <RowContainer $mb={15}>
      <MainContainer $mr={5}>{props.icon}</MainContainer>
      <TextUI ag={Ag['400_16']}>{props.text}</TextUI>
    </RowContainer>
  );
};
