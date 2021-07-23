import BlockA from './block/a';
import BlogA from './blog/a';

export default function getMaterials() {
  return {
    Block: {
      BlockA: <BlockA />,
    },
    Blog: {
      BlogA: <BlogA />,
    },
  };
}
