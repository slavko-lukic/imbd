import {Person} from '../models';
import {axiosGet} from './api';

const params = {
  api_key: 'e0966f5c25707b5d4f4f5a1670429967',
};

export const composePerson = async (personId: number) => {
  try {
    const personResponse = await axiosGet(`/person/${personId}`, params);
    const personCreditsResponse = await axiosGet(
      `/person/${personId}/movie_credits`,
      params,
    );

    const person: Person = {
      id: personResponse.data.id,
      biography: personResponse.data.biography,
      place_of_birth: personResponse.data.place_of_birth,
      popularity: personResponse.data.popularity,
      birthday: personResponse.data.birthday,
      name: personResponse.data.name,
      known_for_department: personResponse.data.known_for_department,
      profile_path: personResponse.data.profile_path,
      cast: personCreditsResponse.data.cast,
      crew: personCreditsResponse.data.crew,
    };
    return person;
  } catch (e: any) {
    console.log('Failed to fetch person details.', e.message);
  }
};
