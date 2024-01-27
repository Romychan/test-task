import { customFetch } from '~/shared/lib/utils';

/**
 * A function for fetching data with an image
 *
 * @returns {Promise<{message: string, success: string}>} An object with a link image and status
 */
export const getImageQuery = () => {
  return customFetch(`${import.meta.env.VITE_IMAGES_API_URL}`, {
    cacheDisable: true,
  });
};
