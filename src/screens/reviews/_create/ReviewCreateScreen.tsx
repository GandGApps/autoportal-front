import React, {useState} from 'react';
import {ScrollViewScreen} from '../../../template/containers/ScrollViewScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RowContainer} from '../../../template/containers/RowContainer';
import {MainContainer} from '../../../template/containers/MainContainer';
import {BackBtn} from '../../../template/ui/BackBtn';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {ViewPress} from '../../../template/containers/ViewPress';
import {StarIcon} from '../../../template/icons/StarIcon';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {Textarea} from '../../../components/Textarea';
import {
  ColumnContainerBetween,
  ColumnContainerBetweenFlex,
} from '../../../template/containers/ColumnContainer';
import {ButtonUI} from '../../../template/ui/ButtonUI';

export const ReviewCreateScreen = () => {
  const insets = useSafeAreaInsets();

  const [rating, setRating] = useState(3);
  const [description, setDescription] = useState('');

  return (
    <ScrollViewScreen
      $ph={20}
      contentContainerStyle={{
        flex: 1,
        paddingTop: Math.max(insets.top, 20),
        paddingBottom: Math.max(insets.bottom, 20),
      }}>
      <RowContainer $mb={40}>
        <MainContainer $mr={10}>
          <BackBtn />
        </MainContainer>

        <TextUI ag={Ag['500_18']}>{'Добавить отзыв'}</TextUI>
      </RowContainer>

      <ColumnContainerBetweenFlex>
        <MainContainer>
          <TextUI $mb={10} ag={Ag['500_14']}>
            {'Выставьте рейтинг'}
          </TextUI>

          <RowContainer $mb={30}>
            {Array.from({length: 5}).map((_, idx) => (
              <ViewPress
                key={`rating-press-${idx}`}
                onPress={() => setRating(idx)}>
                <StarIcon size={30} isActive={rating >= idx} />
              </ViewPress>
            ))}
          </RowContainer>

          <BorderTopUI $pt={30}>
            <TextUI $mb={5} ag={Ag['500_14']}>
              {'Мой отзыв'}
            </TextUI>

            <Textarea
              value={description}
              onChangeText={setDescription}
              placeholder={'Оставьте отзыв'}
            />
          </BorderTopUI>
        </MainContainer>

        <ButtonUI title={'Сохранить'} />
      </ColumnContainerBetweenFlex>
    </ScrollViewScreen>
  );
};
