import { CourseType } from '@/app/types';

export function getSyllabusFileMeta(course: CourseType) {
  const fileName = course === 'cdec' ? 'CDEC-AI.pdf' : 'X-DSAAI.pdf';
  const label = course === 'cdec' ? 'Cloud DevOps (CDEC)' : 'Data Science & AI (X-DSAAI)';
  return { fileName, fileUrl: `/assets/${fileName}`, label };
}

/** Fetch and trigger browser download; returns true when the PDF is available */
export async function downloadSyllabusPdf(course: CourseType): Promise<boolean> {
  const { fileName, fileUrl } = getSyllabusFileMeta(course);

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) return false;

    const blob = await response.blob();
    if (!blob.size) return false;

    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = fileName;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
    return true;
  } catch {
    return false;
  }
}
