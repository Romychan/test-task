/**
 * A function to download an image from a specified URL and save it to a local computer
 *
 * @param {string} url The URL of the image
 * @param {string} filename File names to save
 */
export const downloadImage = async (url, filename = 'filename') => {
  if (!url) return;

  const response = await fetch(url);
  const blobImage = await response.blob();
  const href = URL.createObjectURL(blobImage);
  const downloadLink = document.createElement('a');

  downloadLink.href = href;
  downloadLink.download = filename;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  window.URL.revokeObjectURL(href);
};
