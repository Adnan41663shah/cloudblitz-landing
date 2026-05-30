const YOUTUBE_ID_PATTERN = /[a-zA-Z0-9_-]{11}/;

const YOUTUBE_URL_PATTERNS = [
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
];

/** Extract an 11-character YouTube video ID from a watch, Shorts, or youtu.be URL. */
export function getYouTubeVideoId(url: string): string | null {
  for (const pattern of YOUTUBE_URL_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

/** Ordered thumbnail URLs — Shorts-friendly first, then standard fallbacks. */
export function getYouTubeThumbnailUrls(videoId: string): string[] {
  if (!YOUTUBE_ID_PATTERN.test(videoId)) return [];

  return [
    `https://i.ytimg.com/vi/${videoId}/oardefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
  ];
}

export function getYouTubeThumbnailFromUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return getYouTubeThumbnailUrls(videoId)[0] ?? null;
}

/** Normalize any supported YouTube URL to a standard watch link. */
export function toYouTubeWatchUrl(url: string): string {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
}
