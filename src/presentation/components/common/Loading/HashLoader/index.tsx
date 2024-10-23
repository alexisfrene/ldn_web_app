import React, { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';
import {
  calculateRgba,
  createAnimation,
  cssValue,
  parseLengthAndUnit,
} from '@utils';

interface CommonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: string;
  loading?: boolean;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
}

export interface LoaderSizeProps extends CommonProps {
  size?: number;
}

export const HashLoader: React.FC = ({
  loading = true,
  color = '#000000',
  speedMultiplier = 1,
  size = 50,
  ...additionalprops
}: LoaderSizeProps): JSX.Element | null => {
  const { value, unit } = parseLengthAndUnit(size);

  const wrapperClasses = 'relative transform rotate-[165deg]';

  const thickness = value / 5;
  const lat = (value - thickness) / 2;
  const offset = lat - thickness;

  const colorValue = calculateRgba(color, 0.75);

  const before = createAnimation(
    'HashLoader',
    `0% {width: ${thickness}px; box-shadow: ${lat}px ${-offset}px ${colorValue}, ${-lat}px ${offset}px ${colorValue}}
    35% {width: ${cssValue(size)}; box-shadow: 0 ${-offset}px ${colorValue}, 0 ${offset}px ${colorValue}}
    70% {width: ${thickness}px; box-shadow: ${-lat}px ${-offset}px ${colorValue}, ${lat}px ${offset}px ${colorValue}}
    100% {box-shadow: ${lat}px ${-offset}px ${colorValue}, ${-lat}px ${offset}px ${colorValue}}`,
    'before',
  );

  const after = createAnimation(
    'HashLoader',
    `0% {height: ${thickness}px; box-shadow: ${offset}px ${lat}px ${color}, ${-offset}px ${-lat}px ${color}}
    35% {height: ${cssValue(size)}; box-shadow: ${offset}px 0 ${color}, ${-offset}px 0 ${color}}
    70% {height: ${thickness}px; box-shadow: ${offset}px ${-lat}px ${color}, ${-offset}px ${lat}px ${color}}
    100% {box-shadow: ${offset}px ${lat}px ${color}, ${-offset}px ${-lat}px ${color}}`,
    'after',
  );

  const style = (i: number): React.CSSProperties => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `${value / 5}${unit}`,
    height: `${value / 5}${unit}`,
    borderRadius: `${value / 10}${unit}`,
    transform: 'translate(-50%, -50%)',
    animation: `${i === 1 ? before : after} ${2 / speedMultiplier}s infinite`,
  });

  if (!loading) return null;

  return (
    <span
      className={wrapperClasses}
      style={{ width: cssValue(size), height: cssValue(size) }}
      {...additionalprops}
    >
      <span className="absolute" style={style(1)} />
      <span className="absolute" style={style(2)} />
    </span>
  );
};
