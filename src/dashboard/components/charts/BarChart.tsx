'use client';

import React, { useMemo } from 'react';
import { GradientTealBlue } from '@visx/gradient';
import { Group } from '@visx/group';
import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { GRID_CARD_BORDER_RADIUS } from '~/dashboard/constants';
import type { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';

const data = letterFrequency.slice(5);
const verticalMargin = 120;

// accessors
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
  borderRadius?: number;
};

const BarChart = ({
  width,
  height,
  borderRadius = GRID_CARD_BORDER_RADIUS,
  events = false,
}: BarsProps) => {
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getLetter),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))],
      }),
    [yMax]
  );

  return width < 10 ? null : (
    <svg height={height} width={width}>
      <GradientTealBlue id="teal" />
      <rect fill="url(#teal)" height={height} rx={borderRadius} width={width} />
      <Group top={verticalMargin / 2}>
        {data.map((d) => {
          const letter = getLetter(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              fill="rgba(23, 233, 217, .5)"
              height={barHeight}
              width={barWidth}
              x={barX}
              y={barY}
              onClick={() => {
                if (events)
                  alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
};

export default BarChart;
