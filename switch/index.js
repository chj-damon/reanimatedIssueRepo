import React, { forwardRef } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix, mixColor } from 'react-native-redash';


import useSwitch from './useSwitch';

const Switch = forwardRef(
  (
    {
      checked = false,
      disabled = false,
      onChange,
      activeBackground,
      showText = false,
      onText = '开',
      offText = '关',
      width = 50,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref
  ) => {
    const { checked: triggered, progress, toggle } = useSwitch({ onChange, checked });

    const HEIGHT = width / 2;
    const PADDING = HEIGHT / 10;
    const HANDLER_SIZE = HEIGHT * 0.9;

    const handlerStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: mix(progress.value, 0, width / 2 - PADDING),
        },
      ],
    }));

    const containerStyle = useAnimatedStyle(() => ({
      backgroundColor: mixColor(
        progress.value,
        disabled ? '#CCCCCC' : '#333333',
        disabled ? '#666666' : activeBackground ?? '#005DFF'
      ),
    }));


    const styles = StyleSheet.create({
      content: {
        width,
        height: HEIGHT,
        paddingHorizontal: PADDING,
        borderRadius: HEIGHT,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#999'
      },
      handler: {
        width: HANDLER_SIZE,
        height: HANDLER_SIZE,
        borderRadius: HANDLER_SIZE,
        backgroundColor: disabled ? '#000' : '#999',
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: { fontSize: HANDLER_SIZE / 2, color: '#0189fb' },
    });

    const renderText = () => {
      if (!showText) return <View />;
      // if (!showText) return null; // this will report bug
      return triggered ? <Text style={styles.text}>{offText}</Text> : <Text style={styles.text}>{onText}</Text>;
    };

    const renderContent = () => {
      return (
        <Animated.View style={[styles.content, containerStyle]}>
          <Animated.View style={[styles.handler, handlerStyle]}>
            {renderText()}
          </Animated.View>
        </Animated.View>
      );
    };

    if (disabled) {
      return renderContent();
    }
    return <TouchableWithoutFeedback onPress={toggle}>{renderContent()}</TouchableWithoutFeedback>;
  }
);
Switch.displayName = 'Switch';

export default Switch;
