import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import InfoCard from './InfoCard';

interface InfoGroupProps {
  dataSource: [];
  itemsToShow?: number;
}

const InfoGroup: FC<InfoGroupProps> = ({dataSource, itemsToShow}) => {
  const {accentVariantColorForegroundStyle, foregroundVariantStyle} =
    useColorTheme();

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={[{fontSize: 16}, foregroundVariantStyle]}>
          Cast ({dataSource.length})
        </Text>
        <Text style={[accentVariantColorForegroundStyle]}>View All</Text>
      </View>
      {dataSource.slice(0, 8).map((e: any) => {
        return (
          <InfoCard
            key={e.cast_id}
            name={e.name}
            picture={e.profile_path}
            role={e.character}
          />
        );
      })}
    </>
  );
};

export default InfoGroup;

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
});
