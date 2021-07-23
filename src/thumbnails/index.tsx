import BlockA from './block/a';
import BlogA from './blog/a';

export default function () {
  return {
    Block: {
      BlockA: <BlockA />,
    },
    Blog: {
      BlogA: <BlogA />,
    },
  };
}
