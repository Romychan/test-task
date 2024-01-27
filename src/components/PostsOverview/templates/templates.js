/**
 * Function for creating a post information template
 *
 * @param {object} post Post information to display
 * @returns {string} A string with a post information
 */
const generatePost = (post) => {
  return `
    <div class="overview__item">
      <p class="overview__label">${post.title}</p>
      <p class="overview__content">${post.body}</p>
    </div>
	`;
};

/**
 * Function for creating a template with a list of posts
 *
 * @param {object[]} posts List of posts
 * @returns {string} A string with information about user posts
 */
export const createPostsInformation = (posts) => {
  return `
    <div class="overview">
			<div class="overview__items">
    		${posts.length ? posts.map((post) => generatePost(post)).join('') : `<p class="overview__empty">Empty posts</p>`}
   		</div>
	 </thead>
	`;
};

/** Function for creating an initial template to display */
export const initialOverviewTemplate = () => {
  return `
    <div class="drawer right transparent hidden" data-type="drawer">
      <div class="drawer__header">
        <div class="drawer__information">
          <h3 class="drawer__title">User Posts</h3>
          <h3 class="drawer__description" data-type="drawer-description"></h3>
        </div>
        <button class="button tertiary xs visible-icon" data-type="drawer-close">
          <svg class="icon">
            <use xlink:href="/images/icons.svg#close" />
          </svg>
        </button>
      </div>
      <div class="drawer__body">
        <div class="drawer__content" data-type="drawer-content"></div>
      </div>
    </div>
  `;
};
