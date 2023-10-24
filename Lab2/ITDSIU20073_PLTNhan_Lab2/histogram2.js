function createHistogram2(svgElement, data, numBins) {
    const minValue = d3.min(data);
    const maxValue = d3.max(data);
    const binWidth = (maxValue - minValue) / numBins;
  
    const histogramData = d3.histogram()
      .domain([minValue, maxValue])
      .thresholds(d3.range(minValue, maxValue, binWidth))
      (data);
  
    const maxCount = d3.max(histogramData, d => d.length);
    const barWidth = 50;
    const chartHeight = Math.max(maxCount * barWidth, 1); // Ensure a minimum height of 1 pixel
    const chartWidth = histogramData.length * barWidth;
  
    svgElement.setAttribute('width', chartWidth);
    svgElement.setAttribute('height', chartHeight);
  
    histogramData.forEach((bin, index) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', index * barWidth);
      rect.setAttribute('y', chartHeight - (bin.length * barWidth));
      rect.setAttribute('width', barWidth);
      rect.setAttribute('height', bin.length * barWidth);
      rect.setAttribute('fill', 'purple');
      rect.setAttribute('stroke', 'black');
  
      svgElement.appendChild(rect);
  
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (index * barWidth) + (barWidth / 2));
      text.setAttribute('y', chartHeight - (bin.length * barWidth) - 5); // Adjust the y position for the text label
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', 'black');
      text.textContent = `${bin.x0.toFixed(2)} - ${bin.x1.toFixed(2)}`;
  
      svgElement.appendChild(text);
    });
  }
  
  const svg = document.getElementById('histogram2');
  const data = [1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 19, 22, 24, 25, 28, 30];
  createHistogram2(svg, data, 10);