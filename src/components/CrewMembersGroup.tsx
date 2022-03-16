import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {CrewMember} from '../models/CrewMember';
import MovieMemberCard from './MovieMemberCard';

interface CrewMembersGroupProps {
  crewMembers: CrewMember[];
}

const CrewMembersGroup: FC<CrewMembersGroupProps> = ({crewMembers}) => {
  const {accentVariantColorForegroundStyle, foregroundVariantStyle} =
    useColorTheme();

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={[{fontSize: 16}, foregroundVariantStyle]}>
          Crew ({crewMembers.length})
        </Text>
        <Text style={[accentVariantColorForegroundStyle]}>View All</Text>
      </View>
      {crewMembers
        .sort((a, b) => Number(b.popularity) - Number(a.popularity))
        .slice(0, 6)
        .map((crewMember: CrewMember) => {
          return (
            <MovieMemberCard
              key={crewMember.credit_id}
              name={crewMember.name}
              picture={crewMember.profile_path}
              role={crewMember.job}
            />
          );
        })}
    </>
  );
};

export default CrewMembersGroup;

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
});
