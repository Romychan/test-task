import { customFetch } from '~/shared/lib/utils';

import { getUsersAPIEndpoint, mapUser } from '../lib/lib';

/**
 * A function for fetching data with a list of users
 *
 * @param {URLSearchParams} queryParams Parameters for the query
 * @returns {Promise<{total: number, skip: number, limit: number, users: object[]}>} Object with data from the server
 */
export const getUsersQuery = (queryParams) => {
  return customFetch(getUsersAPIEndpoint(queryParams), {
    transformResponse: (data) => {
      const mappedUsers = data.users.map(mapUser);

      return {
        ...data,
        users: mappedUsers,
      };
    },
  });
};
