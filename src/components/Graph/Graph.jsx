import * as d3 from 'd3'
import {useEffect, useRef } from 'react';
const mockData = [
  {x: 10, y: 10}, {x:33, y:42}, {x:55, y:2}, {x:26, y:72}
].sort((a,b) => {
  if(a.x < b.x) return -1
  if(a.x > b.x) return 1
  return 0
})

const Graph = () => {
  const svgRef = useRef(null)
  const width = 928;
  const height = 500;
  const marginRight = 30;
  const marginTop = 20;
  const marginBottom = 30;
  const marginLeft = 40;
  const x = d3.scaleLinear([0, 100],[marginLeft, width - marginRight]);
  const y = d3.scaleLinear([0, 100],[height - marginBottom, marginTop]);
  const line = d3.line()
    .x(d => x(d.x))
    .y(d => y(d.y));
  useEffect(() => {
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;"); 
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 100).tickSizeOuter(0));
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(mockData));
    svgRef.current.replaceWith(svg.node())
    }, [])
  return <svg ref={svgRef} />  
}

export default Graph