import React, {useState} from 'react';
import {ScrollViewScreen} from '../../../template/containers/ScrollViewScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RowContainer} from '../../../template/containers/RowContainer';
import {MainContainer} from '../../../template/containers/MainContainer';
import {BackBtn} from '../../../template/ui/BackBtn';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {ViewPress} from '../../../template/containers/ViewPress';
import {StarIcon} from '../../../template/icons/StarIcon';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {Textarea} from '../../../components/Textarea';
import {ColumnContainerBetweenFlex} from '../../../template/containers/ColumnContainer';
import {ButtonUI} from '../../../template/ui/ButtonUI';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../../modules/organizations/OrganizationsSlice';
import {
  createReview,
  getReviews,
} from '../../../modules/organizations/thunks/reviews.thunk';
import Navigation from '../../../routes/navigation/Navigation';

export const ReviewCreateScreen = () => {
  const insets = useSafeAreaInsets();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const {currentOrganization} = useAppSelector(selectOrganizationsValues);
  const dispatch = useAppDispatch();

  const handleSaveReview = () => {
    setIsLoading(true);

    dispatch(
      createReview({
        id: currentOrganization?._id!,
        rating,
        comment,
      }),
    )
      .then(() => {
        setTimeout(() => {
          dispatch(getReviews());
        }, 0);
        Navigation.pop();
      })
      .catch(e => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

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
                onPress={() => setRating(idx + 1)}>
                <StarIcon size={30} isActive={rating >= idx + 1} />
              </ViewPress>
            ))}
          </RowContainer>

          <BorderTopUI $pt={30}>
            <TextUI $mb={5} ag={Ag['500_14']}>
              {'Мой отзыв'}
            </TextUI>

            <Textarea
              value={comment}
              onChangeText={setComment}
              placeholder={'Оставьте отзыв'}
            />
          </BorderTopUI>
        </MainContainer>

        <ButtonUI
          $btnDisabled={isLoading}
          title={'Сохранить'}
          onPress={handleSaveReview}
        />
      </ColumnContainerBetweenFlex>
    </ScrollViewScreen>
  );
};
