import React, {RefObject, useState} from 'react';
import {SwipeableModal} from '../../../../components/SwipbleModal';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {IHandles} from 'react-native-modalize/lib/options';
import {InputUI} from '../../../../template/ui/InputUI';
import {ButtonUI} from '../../../../template/ui/ButtonUI';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {AbsoluteContainer} from '../../../../template/containers/AbsoluteContainer';
import {View} from 'react-native';
import {organizationService} from '../../../../modules/organizations/services/OrganizationsService';
import {useAppDispatch} from '../../../../settings/redux/hooks';
import {getServices} from '../../../../modules/organizations/thunks/services.thunk';

interface CompProps {
  categoryId: string;
  modalizeRef: RefObject<IHandles>;
}

export const AddService = ({modalizeRef, categoryId}: CompProps) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [isValidError, setIsValidError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateService = () => {
    if (!title.length) {
      setIsValidError(true);
      return;
    }

    setIsLoading(true);

    organizationService
      .createService({
        category_id: categoryId,
        title: title,
      })
      .then(() => {
        dispatch(getServices(categoryId));
        modalizeRef.current?.close();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SwipeableModal
      modalizeRef={modalizeRef}
      onClosed={() => {
        setTitle('');
        setIsValidError(false);
      }}>
      <TextUI $align={'center'} $mb={20} ag={Ag['600_16']}>
        {'Добавить услугу'}
      </TextUI>

      <InputUI
        containerStyles={{
          $mb: 40,
        }}
        placeholder={'Введите название'}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={isValidError ? ColorsUI.red : undefined}
      />

      <View>
        {isValidError && (
          <AbsoluteContainer $top={-30}>
            <TextUI ag={Ag['600_12']} color={ColorsUI.red}>
              {'Заполните поле'}
            </TextUI>
          </AbsoluteContainer>
        )}
      </View>

      <ButtonUI
        $btnDisabled={isLoading}
        title={'Сохранить'}
        onPress={handleCreateService}
      />
    </SwipeableModal>
  );
};
