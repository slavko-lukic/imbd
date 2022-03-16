import Svg, {Circle, Path} from 'react-native-svg';
import React, {FC, useEffect, useState} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  WithSpringConfig,
  withTiming,
} from 'react-native-reanimated';

const radius = 7;

const ACTIVE_FILL = '#ff708f';
const ACTIVE_OUTLINE = '#ff4e74';
const INACTIVE_FILL = '#ffb3c3';
const INACTIVE_OUTLINE = '#ff809b';

const AniamtedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface BouncyHeartSwitchProps {
  size?: number;
}

const BouncyHeartSwitch: FC<BouncyHeartSwitchProps> = ({size = 50}) => {
  const [switchState, setSwitchState] = useState(false);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const scaleX = useSharedValue(1);
  const scaleY = useSharedValue(1);

  const color = useSharedValue(switchState ? 1 : 0);

  const springConfiguration: WithSpringConfig = {
    mass: 1,
    damping: 2,
  };

  const animatedStretch = withSequence(
    withSpring(1.1, springConfiguration),
    withSpring(1, springConfiguration),
  );
  const shiftRight = withTiming(15, {duration: 500});
  const shiftLeft = withTiming(0, {duration: 500});
  const bounceDown = withSequence(
    withTiming(4, {duration: 250}),
    withTiming(0, {duration: 250}),
  );
  const switchToActiveColors = withTiming(1, {duration: 500});
  const switchToInactiveColors = withTiming(0, {duration: 500});

  useEffect(() => {
    if (switchState) {
      color.value = switchToActiveColors;

      scaleX.value = animatedStretch;
      scaleY.value = withDelay(250, animatedStretch);

      positionX.value = shiftRight;
      positionY.value = bounceDown;
    } else {
      color.value = switchToInactiveColors;

      scaleY.value = animatedStretch;
      scaleX.value = withDelay(250, animatedStretch);

      positionX.value = shiftLeft;
      positionY.value = bounceDown;
    }
  }, [switchState]);

  const onPressHandler = () => {
    setSwitchState(previousState => !previousState);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value},
        {rotateZ: '45deg'},
        {scaleX: scaleX.value},
        {scaleY: scaleY.value},
      ],
    };
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      fill: interpolateColor(color.value, [0, 1], [INACTIVE_FILL, ACTIVE_FILL]),
      stroke: interpolateColor(
        color.value,
        [0, 1],
        [INACTIVE_OUTLINE, ACTIVE_OUTLINE],
      ),
    };
  }, []);

  return (
    <Svg
      onPress={onPressHandler}
      viewBox="-2 0 37 23"
      width={size}
      height={size * 0.7}>
      <AnimatedPath
        strokeWidth={2}
        d="M23.5,0.5 C28.4705627,0.5 32.5,4.52943725 32.5,9.5 C32.5,16.9484448 21.46672,22.5 16.5,22.5 C11.53328,22.5 0.5,16.9484448 0.5,9.5 C0.5,4.52952206 4.52943725,0.5 9.5,0.5 C12.3277083,0.5 14.8508336,1.80407476 16.5007741,3.84362242 C18.1491664,1.80407476 20.6722917,0.5 23.5,0.5 Z"
        animatedProps={animatedProps}
      />
      <AniamtedCircle
        cx={13}
        translateX={0}
        r={radius}
        style={[animatedStyle]}
        fill="white"
      />
    </Svg>
  );
};

export default BouncyHeartSwitch;
