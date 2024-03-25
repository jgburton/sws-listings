import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
  data: Record<string, number>;
}

const DataBlobVisualization: React.FC<Props> = ({ data }) => {
  const addOneToArray = (arr: number[]): number[] => {
    return arr.map((item) => item + 1);
  };

  const newData: number[] = addOneToArray(Object.values(data));

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const titles = Object.keys(data);

    // Define circle properties
    const circleRadius: number = 60;
    const numSegments: number = titles.length; 
    const circleCenter: [number, number] = [200, 200];
    const maxData: number = 5;

    // Calculate radius based on data value
    const calculateRadius = (dataPoint: number): number => {
      return (dataPoint / maxData) * circleRadius; // Adjust radius based on data value
    };

    // Draw concentric circles
    const numRings: number = maxData + 2; // Set number of rings to the maximum value + 2
    for (let i = 0; i < numRings; i++) {
      const radius: number = circleRadius * (i / maxData); // Calculate radius for each ring
      svg
        .append('circle')
        .attr('cx', circleCenter[0])
        .attr('cy', circleCenter[1])
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', 'lightgray');
    }

    // Calculate points on the circle
    const points: [number, number][] = d3.range(numSegments).map((i) => {
      const angle: number = (i / numSegments) * Math.PI * 2;
      const x: number = circleCenter[0] + circleRadius * Math.cos(angle);
      const y: number = circleCenter[1] + circleRadius * Math.sin(angle);
      return [x, y];
    });

// Calculate the position of titles with padding
const titlePadding: number = 10;
const titleAngleOffset: number = -Math.PI / 2;
const titlePosition: [number, number][] = points.map((_, i) => {
  const angle: number = (i / numSegments) * Math.PI * 2 + titleAngleOffset;
  const radius: number = calculateRadius(maxData + 1);
  const newX: number =
    circleCenter[0] + (radius + titlePadding) * Math.cos(angle);
  const newY: number =
    circleCenter[1] + (radius + titlePadding) * Math.sin(angle);
  return [newX, newY];
});

// Draw titles
svg
  .selectAll('.title')
  .data(titles)
  .enter()
  .append('text')
  .attr('class', 'title')
  .attr('x', (_, i) => titlePosition[i][0]) // Use direct access to the array elements
  .attr('y', (_, i) => titlePosition[i][1]) // Use direct access to the array elements
  .attr('text-anchor', 'middle')
  .attr('alignment-baseline', 'middle')
  .text((d) => d)
  .attr('fill', 'white')
  .attr('font-size', '12px')
  .attr('transform', (_, i) => { // Remove unused 'd'
    const angle: number = (i / numSegments) * 360;
    return `rotate(${angle}, ${titlePosition[i][0]}, ${titlePosition[i][1]})`;
  });

// Draw data blob
const dataBlob = d3
  .line()
  .x((d) => d[0])
  .y((d) => d[1])
  .curve(d3.curveCardinalClosed.tension(0.5));

const dataBlobPoints: [number, number][] = points.map((_, i) => {
  const angleOffset: number = -Math.PI / 2;
  const angle: number = (i / numSegments) * Math.PI * 2 + angleOffset;
  const radius: number = calculateRadius(newData[i]);
  return [
    circleCenter[0] + radius * Math.cos(angle),
    circleCenter[1] + radius * Math.sin(angle),
  ];
});

    // TODO: Calculate average, , logic can be more specific based on criteria - perhaps total score?
    const average: number =
      Object.values(data).reduce((sum, value) => sum + value, 0) /
      Object.values(data).length;

    // TODO:  Determine color based on average, logic can be more specific based on criteria - perhaps total score?
    let color: string;
    if (average > 3) {
      color = 'green';
    } else if (average > 2) {
      color = 'orange';
    } else {
      color = 'red';
    }

    svg
      .append('path')
      .datum(dataBlobPoints)
      .attr('d', dataBlob)
      .attr('fill', color)
      .attr('opacity', 0.8)
      .attr('stroke', 'none');
  }, [data, newData]);

  return <svg ref={svgRef} width={400} height={400}></svg>;
};

export default DataBlobVisualization;
