const cacheStorage = new Map();

/**
 * @typedef {Object} FetchOptions
 * @property {Function} transformResponse A callback to transform the data returned from the fetch response
 * @property {boolean} cacheDisable A parameter for caching fetch data. If `true`, the request will not be cached
 * @property {RequestInit} params Additional parameters for `fetch`
 */

/**
 * A function for fetching data from the server. In addition, the function implements a caching mechanism
 *
 * @param {string} url The URL for fetching the data
 * @param {FetchOptions} options Additional parameters for the request
 * @returns {Promise<object>} Fetched data
 */
export const customFetch = async (url, options) => {
  if (!url) return;

  if (cacheStorage.has(url)) {
    const data = cacheStorage.get(url);
    const finalData = options?.transformResponse
      ? options.transformResponse(data)
      : data;

    return finalData;
  }

  try {
    const response = await fetch(url, options?.params);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const finalData = options?.transformResponse
      ? options.transformResponse(data)
      : data;

    if (!options?.cacheDisable) {
      cacheStorage.set(url, data);
    }

    return finalData;
  } catch (error) {
    console.error(error);
  }
};
