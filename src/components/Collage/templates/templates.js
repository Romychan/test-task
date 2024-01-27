/** Function for creating an initial template to display */
export const initialCollageTemplate = () => {
  return `
		<div class="collage__inner" data-type="collage-container">
			<div class="collage__items" data-type="collage-items"></div>
			<div class="backdrop hidden" data-type="backdrop"></div>
			<div class="drawer center hidden collage-drawer" data-type="drawer">
				<div class="collage-drawer__actions">
					<button class="button secondary md collage-drawer__button" data-type="drawer-close">
						Закрыть
					</button>
					<button class="button primary md collage-drawer__button" data-type="collage-download">
						Скачать
					</button>
				</div>
				<img class="collage-drawer__image" data-type="collage-drawer-image" />
			</div>
		</div>
	`;
};
