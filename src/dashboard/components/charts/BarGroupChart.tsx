'use client';
import React from 'react';
import { AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarGroup } from '@visx/shape';
import { timeParse, timeFormat } from '@visx/vendor/d3-time-format';
import { GRID_CARD_BORDER_RADIUS } from '~/dashboard/constants';
import type { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';

export type BarGroupProps = {
  width: number;
  height: number;
  borderRadius?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};

type CityName = 'New York' | 'San Francisco' | 'Austin';

const blue = '#aeeef8';
export const green = '#e5fd3d';
const purple = '#9caff6';
export const background = '#612efb';

const data = cityTemperature.slice(0, 8);
const keys = Object.keys(data[0]).filter((d) => d !== 'date') as CityName[];
const defaultMargin = { top: 40, right: 0, bottom: 40, left: 0 };

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);

// accessors
const getDate = (d: CityTemperature) => d.date;

// scales
const dateScale = scaleBand<string>({
  domain: data.map(getDate),
  padding: 0.2,
});
const cityScale = scaleBand<string>({
  domain: keys,
  padding: 0.1,
});
const tempScale = scaleLinear<number>({
  domain: [
    0,
    Math.max(
      ...data.map((d) => Math.max(...keys.map((key) => Number(d[key]))))
    ),
  ],
});
const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: [blue, green, purple],
});

const BarGroupChart = ({
  width,
  height,
  borderRadius = GRID_CARD_BORDER_RADIUS,
  events = false,
  margin = defaultMargin,
}: BarGroupProps) => {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // update scale output dimensions
  dateScale.rangeRound([0, xMax]);
  cityScale.rangeRound([0, dateScale.bandwidth()]);
  tempScale.range([yMax, 0]);

  return width < 10 ? null : (
    <svg height={height} width={width}>
      <rect
        fill={background}
        height={height}
        rx={borderRadius}
        width={width}
        x={0}
        y={0}
      />
      <Group left={margin.left} top={margin.top}>
        <BarGroup
          color={colorScale}
          data={data}
          height={yMax}
          keys={keys}
          x0={getDate}
          x0Scale={dateScale}
          x1Scale={cityScale}
          yScale={tempScale}
        >
          {(barGroups) =>
            barGroups.map((barGroup) => (
              <Group
                key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                left={barGroup.x0}
              >
                {barGroup.bars.map((bar) => (
                  <rect
                    key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                    fill={bar.color}
                    height={bar.height}
                    rx={4}
                    width={bar.width}
                    x={bar.x}
                    y={bar.y}
                    onClick={() => {
                      if (!events) return;
                      const { key, value } = bar;
                      alert(JSON.stringify({ key, value }));
                    }}
                  />
                ))}
              </Group>
            ))
          }
        </BarGroup>
      </Group>
      <AxisBottom
        hideAxisLine
        scale={dateScale}
        stroke={green}
        tickFormat={formatDate}
        tickStroke={green}
        top={yMax + margin.top}
        tickLabelProps={{
          fill: green,
          fontSize: 11,
          textAnchor: 'middle',
        }}
      />
    </svg>
  );
};

export default BarGroupChart;
