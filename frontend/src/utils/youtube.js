/**
 * Validate a YouTube URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidYouTubeUrl = (url) => {
  if (!url) return false;
  
  // Regular expression to match YouTube URLs
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
};

/**
 * Extract video ID from YouTube URL
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null if invalid
 */
export const extractVideoId = (url) => {
  if (!url) return null;
  
  // Match patterns for youtube.com and youtu.be URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Generate thumbnail URL from video ID
 * @param {string} videoId - YouTube video ID
 * @returns {string} - Thumbnail URL
 */
export const getThumbnailUrl = (videoId) => {
  if (!videoId) return null;
  
  // Return high quality thumbnail URL
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

/**
 * Generate YouTube video URL from video ID
 * @param {string} videoId - YouTube video ID
 * @returns {string} - YouTube video URL
 */
export const getVideoUrl = (videoId) => {
  if (!videoId) return null;
  
  return `https://www.youtube.com/watch?v=${videoId}`;
};
