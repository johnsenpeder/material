// @flow strict-local
import {debounce, partition} from 'lodash-es';
import * as React from 'react';
import {InteractionManager, Keyboard, StyleSheet, View} from 'react-native';

import {Button} from '../button';
import {Divider} from '../divider';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: 52,
    padding: 8,
  },
  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
});

type Action = {
  id: string,
  label: string,
  onPress: () => void,
  styleName?: string,
  align?: 'left' | 'right',
};

type Props = {
  actions: Array<Action>,
  divider?: boolean,
};

class CardActions extends React.Component<Props> {
  static defaultProps = {
    divider: false,
  };

  constructor(props: Props) {
    super(props);

    this.onPressActionDebounced = debounce(this.onPressAction, 500);
  }

  onPressActionDebounced: Action => void;

  onPressAction = (action: Action) => {
    Keyboard.dismiss();
    InteractionManager.runAfterInteractions(() => {
      action.onPress();
    });
  };

  render() {
    const {actions, divider} = this.props;

    const [leftActions, rightActions] = partition(actions, action => action.align === 'left');

    // $FlowFixMe
    const renderAction = action => <Button key={`content-${action.id}`} {...action} type={Button.types.TEXT} />;

    return (
      <View>
        {divider ? <Divider fullWidth /> : null}
        <View style={[styles.container]}>
          <View style={styles.leftContainer}>{leftActions.map(renderAction)}</View>
          <View style={styles.rightContainer}>{rightActions.map(renderAction)}</View>
        </View>
      </View>
    );
  }
}

export default CardActions;
