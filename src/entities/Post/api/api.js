import { customFetch } from '~/shared/lib/utils';

/**
 * A function for fetching data with a list of user posts
 *
 * @param {number} id User ID for getting posts
 * @returns {Promise<{posts: object[]}>} An object with a list of user posts
 */
export const getUserPostsQuery = (id) => {
  return customFetch(
    `${import.meta.env.VITE_USERS_API_URL}/users/${id}/posts?select=title,body`,
  );
};
