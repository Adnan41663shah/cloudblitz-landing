import { generateCourseMetadata } from '../../lib/seo';
import Home from '../page';

export async function generateMetadata() {
  return generateCourseMetadata('cdec');
}

export default function CDECPage() {
  return <Home initialCourse="cdec" />;
}
