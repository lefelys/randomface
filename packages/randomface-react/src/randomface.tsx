import * as React from 'react';
import { RandomfaceSVG as randomface } from 'randomface';

export type Props = React.SVGProps<SVGSVGElement> & {
  title?: string;
  titleId?: string;
  sha256hash: string;
} & React.RefAttributes<SVGSVGElement>;

export const RandomfaceSVG = React.forwardRef(
  (
    { title, titleId, sha256hash, ...props }: Props,
    ref: React.ForwardedRef<SVGSVGElement>
  ) => {
    const svgData = randomface(sha256hash);
    return (
      <svg
        aria-labelledby={titleId}
        clipRule='evenodd'
        fill='currentColor'
        fillRule='evenodd'
        preserveAspectRatio='xMinYMin meet'
        ref={ref}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        {title !== undefined && <title id={titleId}>{title}</title>}
        <path d={svgData.paths.leftEye} />
        <path d={svgData.paths.rightEye} />
        <path d={svgData.paths.nose} />
        <path d={svgData.paths.mouth} />
      </svg>
    );
  }
);

RandomfaceSVG.displayName = 'RandomfaceSVG';
