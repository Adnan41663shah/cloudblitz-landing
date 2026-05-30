'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { getYouTubeThumbnailUrls, getYouTubeVideoId } from '@/lib/youtube';

type VideoTestimonialThumbnailProps = {
  youtubeUrl: string;
  alt: string;
};

export default function VideoTestimonialThumbnail({
  youtubeUrl,
  alt,
}: VideoTestimonialThumbnailProps) {
  const candidates = useMemo(() => {
    const videoId = getYouTubeVideoId(youtubeUrl);
    return videoId ? getYouTubeThumbnailUrls(videoId) : [];
  }, [youtubeUrl]);

  const [candidateIndex, setCandidateIndex] = useState(0);

  const src = candidates[candidateIndex];

  if (!src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
        <span className="text-xs font-semibold text-slate-500">Video preview</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
      className="object-cover transition-transform duration-500 group-hover/card:scale-105"
      onError={() => {
        setCandidateIndex((index) => {
          if (index + 1 < candidates.length) return index + 1;
          return index;
        });
      }}
    />
  );
}
