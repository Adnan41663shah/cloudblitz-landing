import { generateCourseMetadata } from '../../lib/seo';
import Home from '../page';

export async function generateMetadata() {
  return generateCourseMetadata('X-DSAAI');
}

export default function XDSAAIPage() {
  return <Home initialCourse="X-DSAAI" />;
}
