"use client";

import * as d3 from "d3";
import { useRef, useEffect } from "react";
import ReactFC from "react";
interface LinePlotProps {
  datax: number[];
  datay: number[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export default function LinePlot({
  datax, // X-axis data
  datay, // Y-axis data
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 40
}) {
  const gx = useRef();
  const gy = useRef();

  // Set x and y scales based on provided data
  const x = d3.scaleLinear()
    .domain(d3.extent(datax)) // x-axis range based on datax
    .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
    .domain(d3.extent(datay)) // y-axis range based on datay
    .range([height - marginBottom, marginTop]);

  // Create the line using both datax and datay
  const line = d3.line()
    .x((d, i) => x(datax[i])) // Map datax to x values
    .y((d, i) => y(datay[i])); // Map datay to y values

  // Use D3's axis functions
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);

  return (
    <svg width={width} height={height}>
      {/* x-axis */}
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      {/* y-axis */}
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      {/* Plot the line */}
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(datay)} />
      {/* Add circles to mark data points */}
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {datax.map((d, i) => (
          <circle key={i} cx={x(datax[i])} cy={y(datay[i])} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
