import BlockA from './block/a';
import BlockB from './block/b';
import BlogA from './blog/a';

export default function () {
  return {
    Block: {
      BlockA: <BlockA />,
      BlockB: <BlockB />,
    },
    Blog: {
      BlogA: <BlogA />,
    },
  };
}
