import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={997}
      height={585}
      viewBox="0 0 997 585"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#fff" d="M0 0h997v585H0z" />
      <circle cx={134} cy={149} r={51} fill="#C4C4C4" />
      <path d="M83 220h108v26H83v-26z" fill="#08AEF4" />
    </svg>
  );
}

export default SvgComponent;
