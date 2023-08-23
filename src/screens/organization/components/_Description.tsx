import React, {useEffect, useRef, useState} from 'react';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {ViewPress} from '../../../template/containers/ViewPress';
import {ColorsUI} from '../../../template/styles/ColorUI';

interface _DescriptionProps {
  description?: string;
}

export const OrganizationDescription = (props: _DescriptionProps) => {
  const [numberOfLines, setNumberOfLines] = useState(0);

  const [isHide, setIsHide] = useState(true);

  const handlePressMore = () => {
    setIsHide(!isHide);
  };

  return (
    <BorderTopUI $ph={20} $pv={20}>
      <TextUI $mb={5} ag={Ag['600_16']}>
        {'Описание'}
      </TextUI>
      <TextUI
        ag={Ag['400_16']}
        lineBreakMode={'clip'}
        numberOfLines={isHide ? 3 : undefined}
        onTextLayout={e => {
          setNumberOfLines(e.nativeEvent.lines.length);
        }}>
        {props.description ? props.description : 'Нет описания'}
      </TextUI>
      {numberOfLines > 2 ? (
        <ViewPress $mt={20} onPress={() => handlePressMore()}>
          <TextUI ag={Ag['600_16']} color={ColorsUI.green}>
            {isHide ? 'Подробнее' : 'Свернуть'}
          </TextUI>
        </ViewPress>
      ) : null}
    </BorderTopUI>
  );
};
