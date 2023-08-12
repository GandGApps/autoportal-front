import {Screens} from './../models/Screens';

import {CommonActions, NavigationContainerRef} from '@react-navigation/core';
import * as React from 'react';

export interface IRoute {
  name: string;
  params?: NavigationParams;
}

export interface NavigationParams {
  [key: string]: any;
}

class NavigationModel {
  navigationRef = React.createRef<NavigationContainerRef<any>>();

  initialRoute: string = Screens.INIT;

  getCurrentScreen = () => {
    return this.navigationRef.current?.getCurrentRoute()?.name;
  };

  navigate = (routeName: string, params?: NavigationParams) => {
    setTimeout(
      () => this.navigationRef.current?.navigate(routeName, params),
      0,
    );
  };

  replace = (routeName: string, params?: NavigationParams) => {
    setTimeout(
      () =>
        this.navigationRef.current?.reset({
          index: 0,
          routes: [{name: routeName, params: params}],
        }),
      0,
    );
  };

  resetScreens = () => {
    const filterScreens: string[] = [];

    this.navigationRef.current?.dispatch(state => {
      const routes = state.routes.filter(route =>
        filterScreens.includes(route.name),
      );

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  };

  pop = () => {
    this.navigationRef.current?.goBack();
  };

  pop2 = () => {
    this.pop();
    this.pop();
  };
}

const Navigation = new NavigationModel();

export default Navigation;
