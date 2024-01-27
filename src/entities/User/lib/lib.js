import { ip2int } from '~/shared/lib/utils';

/**
 * A function for transforming a user object
 *
 * @param {object} user An object with user data from the server
 * @returns {object} The transformed object with user data
 */
export const mapUser = (user) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    birthDate: user.birthDate,
    height: user.height,
    ip: user.ip,
  };
};

/**
 * A function for getting an API endpoint with a list of users
 *
 * @param {URLSearchParams} queryParams Query parameters for the endpoint
 * @returns {string} API endpoint with a list of users
 */
export const getUsersAPIEndpoint = (queryParams) =>
  `${import.meta.env.VITE_USERS_API_URL}/users?${new URLSearchParams(queryParams).toString()}&select=username,email,firstName,lastName,birthDate,height,ip`;

/**
 * A function for sorting users
 *
 * @param {object[]} users The list of users to sort
 * @param {{column: string, order: string}} sorting The column to which the sorting is applied and the order of sorting
 * @returns {object[]} Sorted list of users
 */
export const sortUsersData = (users, sorting) => {
  const { order, column } = sorting;

  if (order === 'descending') {
    return users.sort((a, b) => {
      if (column === 'ip') {
        return ip2int(b[column]) - ip2int(a[column]);
      }

      if (typeof b[column] === 'number') {
        return b[column] - a[column];
      }

      return b[column].toString().localeCompare(a[column].toString());
    });
  }

  return users.sort((a, b) => {
    if (column === 'ip') {
      return ip2int(a[column]) - ip2int(b[column]);
    }

    if (typeof a[column] === 'number') {
      return a[column] - b[column];
    }

    return a[column].toString().localeCompare(b[column].toString());
  });
};
