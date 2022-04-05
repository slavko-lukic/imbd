import React, {FC} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import WebView from 'react-native-webview';

interface YoutubeEmbedVideoViewProps extends ViewProps {
  videoKey: string;
}

const YoutubeEmbedVideoView: FC<YoutubeEmbedVideoViewProps> = ({
  videoKey,
  ...otherProps
}) => {
  return (
    <View {...otherProps}>
      <WebView
        style={styles.video}
        containerStyle={styles.video}
        automaticallyAdjustContentInsets={false}
        bounces={false}
        allowsInlineMediaPlayback
        javaScriptEnabled
        source={{
          uri: `https://www.youtube.com/embed/${videoKey}`,
        }}
      />
    </View>
  );
};

export default YoutubeEmbedVideoView;

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },
});
