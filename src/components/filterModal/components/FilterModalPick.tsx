import React, {Fragment, useEffect, useState} from 'react';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {TouchableOpacity} from 'react-native';
import {RowContainer} from '../../../template/containers/RowContainer';
import {CheckboxUI} from '../../../template/ui/CheckboxUI';
import {MainContainer} from '../../../template/containers/MainContainer';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {TypeService} from '../../../modules/organizations/models/TypeService';
import {UnitsFilter} from '../../../modules/organizations/types/OrganizationTypes';
import {OrganizationHelper} from '../../../modules/organizations/helpers/OrganizationHelper';
import {RadioUI} from '../../../template/ui/RadioUI';
import {DownIcon} from '../../../template/icons/DownIcon';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';

interface FilterModalPickProps {
  item?: TypeService | UnitsFilter;

  pickList?: string[];

  isCatSub?: boolean;

  sortTitle?: string;
  sortActive?: boolean;

  onPickItem: () => void;

  hideSub?: () => void;
}

export const FilterModalPick = (props: FilterModalPickProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!props.pickList) {
      setIsActive(props.sortActive!);
      return;
    }

    if (props.isCatSub) {
      setIsActive(
        OrganizationHelper.checkCategorySub(
          props.pickList,
          (props.item as TypeService).subServices!,
        ),
      );
    } else {
      setIsActive(props.pickList.includes(props.item!._id));
    }
  }, [props.pickList]);

  return (
    <BorderTopUI>
      <RowContainer>
        <TouchableOpacity onPress={props.onPickItem}>
          <RowContainer>
            {props.sortTitle ? (
              <RadioUI isActive={props.sortActive!} />
            ) : (
              <CheckboxUI isActive={isActive} />
            )}

            <MainContainer $ml={10} $pv={8}>
              <TextUI ag={Ag['400_16']}>
                {props.sortTitle || props.item!.title}
              </TextUI>
            </MainContainer>
          </RowContainer>
        </TouchableOpacity>

        {props.isCatSub && (
          <Fragment>
            <ColumnContainerFlex />
            <TouchableOpacity style={{padding: 5}} onPress={props.hideSub}>
              <DownIcon />
            </TouchableOpacity>
          </Fragment>
        )}
      </RowContainer>
    </BorderTopUI>
  );
};
