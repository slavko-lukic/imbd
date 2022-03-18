import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Cast} from '../models/Cast';
import {Crew} from '../models/Crew';
import InfoCard from './InfoCard';

interface InfoGroupProps {
  groupName: string;
  dataSource: Cast[] | Crew[];
  numberOfItemsToShow?: number;
  onViewAllPressHandler?: () => void;
}

const InfoGroup: FC<InfoGroupProps> = ({
  groupName,
  dataSource,
  numberOfItemsToShow,
  onViewAllPressHandler,
}) => {
  const {accentVariantColorForegroundStyle, foregroundVariantStyle} =
    useColorTheme();

  const getRole = (credit: Cast | Crew): string => {
    if ('job' in credit) {
      return credit.job;
    }
    return credit.character;
  };

  const mapItems = () => {
    const itemsForRender: JSX.Element[] = dataSource
      .slice(0, numberOfItemsToShow)
      .map(credit => {
        return (
          <InfoCard
            key={credit.credit_id}
            name={credit.name}
            picture={credit.profile_path}
            role={getRole(credit)}
          />
        );
      });
    return itemsForRender;
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={[{fontSize: 16}, foregroundVariantStyle]}>
          {groupName} ({dataSource.length})
        </Text>
        {numberOfItemsToShow ? (
          <Text
            onPress={onViewAllPressHandler}
            style={[accentVariantColorForegroundStyle]}>
            View All
          </Text>
        ) : null}
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
