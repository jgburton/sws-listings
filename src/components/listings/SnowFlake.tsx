import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DataBlobVisualization = ({ data, titles }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define circle properties
    const circleRadius = 100;
    const numSegments = titles.length; // Use the number of titles for segments
    const circleCenter = [200, 200];
    const maxData = 5; // Maximum value for the data

    // Calculate radius based on data value
    const calculateRadius = (dataPoint) => {
      return (dataPoint / maxData) * circleRadius; // Adjust radius based on data value
    };

    // Draw concentric circles
    const numRings = maxData + 1; // Set number of rings to the maximum value + 1
    for (let i = 0; i < numRings; i++) {
      const radius = circleRadius * (i / maxData); // Calculate radius for each ring
      svg.append('circle')
        .attr('cx', circleCenter[0])
        .attr('cy', circleCenter[1])
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', 'lightgray');
    }

    // Calculate points on the circle
    const points = d3.range(numSegments).map(i => {
      const angle = (i / numSegments) * Math.PI * 2;
      const x = circleCenter[0] + circleRadius * Math.cos(angle);
      const y = circleCenter[1] + circleRadius * Math.sin(angle);
      return [x, y];
    });

    // Calculate the position of titles with padding
    const titlePadding = 20; // Padding between the circle edge and title
    const titleAngleOffset = -Math.PI / 2; // Offset to start titles at the top
    const titlePosition = points.map(([x, y], i) => {
      const angle = (i / numSegments) * Math.PI * 2 + titleAngleOffset;
      const outerCircleRadius = circleRadius; // Outer circle radius is fixed
      const newX = circleCenter[0] + (outerCircleRadius + titlePadding) * Math.cos(angle); // Add padding to the radius
      const newY = circleCenter[1] + (outerCircleRadius + titlePadding) * Math.sin(angle); // Add padding to the radius
      return [newX, newY];
    });

    // Draw titles
    svg.selectAll('.title')
      .data(titles)
      .enter()
      .append('text')
      .attr('class', 'title')
      .attr('x', (d, i) => titlePosition[i][0])
      .attr('y', (d, i) => titlePosition[i][1])
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(d => d)
      .attr('fill', 'white')
      .attr('font-size', '12px');

    // Draw data blob
    const dataBlob = d3.line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3.curveCardinalClosed.tension(0.5)); // Adjust the curve interpolation method

    const dataBlobPoints = points.map(([x, y], i) => {
      const angle = (i / numSegments) * Math.PI * 2;
      const radius = calculateRadius(data[i]); // Use calculated radius based on data value
      return [
        circleCenter[0] + radius * Math.cos(angle),
        circleCenter[1] + radius * Math.sin(angle)
      ];
    });

    // Calculate average
    const average = data.reduce((sum, value) => sum + value, 0) / data.length;

    // Determine color based on average
    let color;
    if (average > 3) {
      color = 'green';
    } else if (average > 2) {
      color = 'orange';
    } else {
      color = 'red';
    }

    svg.append('path')
      .datum(dataBlobPoints)
      .attr('d', dataBlob)
      .attr('fill', color) // Set fill color based on average
      .attr('opacity', 0.8) // Set opacity to 0.8 for slight transparency
      .attr('stroke', 'none'); // Remove stroke

    // Draw data values
    svg.selectAll('.data-value')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'data-value')
      .attr('x', (d, i) => dataBlobPoints[i][0])
      .attr('y', (d, i) => dataBlobPoints[i][1])
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(d => d)
      .attr('fill', 'black')
      .attr('font-size', '12px');

  }, [data, titles]);

  return (
    <svg ref={svgRef} width={400} height={400}></svg>
  );
};

export default DataBlobVisualization;
