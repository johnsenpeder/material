// @flow
import isFunction from 'lodash.isfunction';
import * as React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import {Icon} from '../icon';
import {type ThemeProps, withTheme} from '../theme';

const styles = StyleSheet.create({
  outerSquare: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#00000089',
    marginRight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerSquare: {
    width: 0,
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerSquareSelected: {
    width: 16,
    height: 16,
  },
});

type Props = {
  onPress?: Function,
  rctshtTheme: ThemeProps,
  selected?: boolean,
};

class Checkbox extends React.PureComponent<Props> {
  static defaultProps = {
    onPress: null,
    selected: false,
  };

  render() {
    const {rctshtTheme, selected, onPress} = this.props;

    const checkbox = (
      <View style={[styles.outerSquare, selected ? {borderColor: rctshtTheme.colors.secondary} : null]}>
        <View
          style={[
            styles.innerSquare,
            {backgroundColor: rctshtTheme.colors.secondary},
            selected ? styles.innerSquareSelected : null,
          ]}
        >
          <Icon name="check" color="#ffffff" size={16} />
        </View>
      </View>
    );

    if (isFunction(onPress)) {
      return <TouchableWithoutFeedback onPress={onPress}>{checkbox}</TouchableWithoutFeedback>;
    }

    return checkbox;
  }
}

export default withTheme(Checkbox);
