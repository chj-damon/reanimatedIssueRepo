import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

const springConfig = {
  mass: 1,
  damping: 15,
  stiffness: 120,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

export default function useSwitch(props) {
  const [checked, setChecked] = useState(props.checked);
  const opened = useSharedValue(checked);
  const progress = useDerivedValue(() => (opened.value ? withSpring(1, springConfig) : withSpring(0, springConfig)));

  useEffect(() => { 
    setChecked(props.checked);
    opened.value = props.checked;
  }, [props.checked]);

  const toggle = () => {
    Keyboard.dismiss();
    setChecked(checked => !checked);
    opened.value = !opened.value;
    props.onChange?.(!checked);
  };

  return { checked, progress, toggle };
}
