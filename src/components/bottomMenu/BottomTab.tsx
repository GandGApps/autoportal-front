import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {BottomIcons} from './icons/BottomIcons';
import {BottomTabsKey} from './values/BottomTabs';
import Navigation from '../../routes/navigation/Navigation';
import {useFocusEffect} from '@react-navigation/native';

interface BottomTabProps {
  keyTab: string;
  value: string;
  onNavigate: () => void;
}

export const BottomTab = ({keyTab, value, onNavigate}: BottomTabProps) => {
  const [isActive, setActive] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setActive(Navigation.getCurrentScreen() === value);
    }, []),
  );

  return (
    <TouchableOpacity onPress={onNavigate}>
      <BottomIcons bottomKey={keyTab as BottomTabsKey} isActive={isActive} />
    </TouchableOpacity>
  );
};
