import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Cast} from '../models/Cast';
import {Crew} from '../models/Crew';
import InfoCard from './InfoCard';

interface InfoGroupProps {
  dataSource: Cast[] | Crew[];
  itemsToShow?: number;
}

const InfoGroup: FC<InfoGroupProps> = ({dataSource, itemsToShow}) => {
  const {accentVariantColorForegroundStyle, foregroundVariantStyle} =
    useColorTheme();

  const getRole = (credit: Cast | Crew): string => {
    if ('job' in credit) {
      return credit.job;
    }
    return credit.character;
  };

  const mapItems = () => {
    const items: JSX.Element[] = dataSource.slice(0, 8).map(credit => {
      return (
        <InfoCard
          key={credit.credit_id}
          name={credit.name}
          picture={credit.profile_path}
          role={getRole(credit)}
        />
      );
    });
    return items;
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={[{fontSize: 16}, foregroundVariantStyle]}>
          Cast ({dataSource.length})
        </Text>
        <Text style={[accentVariantColorForegroundStyle]}>View All</Text>
      </View>
      {mapItems()}
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
