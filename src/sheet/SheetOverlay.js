// @flow
import find from 'lodash.find';
import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';

import {getCurrentNavigationKey} from '../navigation';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

type Props = {};

class SheetOverlay extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      contents: [],
    };
  }

  addOrUpdateSheet = (options: Object = {}) => {
    const {type, Component, props = {}, overlayId, navigationKey} = options;
    this.setState(currentState => ({
      contents: [
        ...currentState.contents.filter(content => content.overlayId !== overlayId),
        {overlayId, navigationKey, type, Component, props},
      ],
    }));
  };

  removeSheet = (overlayId: string) => {
    this.setState(currentState => ({
      contents: currentState.contents.filter(content => content.overlayId !== overlayId),
    }));
  };

  render() {
    const {contents} = this.state;

    const currentNavigationKey = getCurrentNavigationKey() || 'RCTSHT_UNKNOWN_NAVIGATION_KEY';

    const activeContent = find(contents, content => content.navigationKey === currentNavigationKey);
    const {Component, props} = activeContent || {};

    return (
      <View style={styles.container} pointerEvents="box-none">
        {Component ? <Component {...props} /> : null}
      </View>
    );
  }
}

export default SheetOverlay;