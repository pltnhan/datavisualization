function createHistogram(svgElement, inputString) {
    const bins = [
      { label: 'A-D', range: ['A', 'B', 'C', 'D'] },
      { label: 'E-H', range: ['E', 'F', 'G', 'H'] },
      { label: 'I-L', range: ['I', 'J', 'K', 'L'] },
      { label: 'M-P', range: ['M', 'N', 'O', 'P'] },
      { label: 'Q-U', range: ['Q', 'R', 'S', 'T', 'U'] },
      { label: 'V-Z', range: ['V', 'W', 'X', 'Y', 'Z'] },
    ];

    const binCounts = bins.map(bin => ({
      label: bin.label,
      count: inputString
        .toUpperCase()
        .split('')
        .filter(char => bin.range.includes(char))
        .length,
    }));
  
    const maxCount = Math.max(...binCounts.map(bin => bin.count));
    const barWidth = 50;
    const chartHeight = Math.max(maxCount * barWidth, 1); // Ensure a minimum height of 1 pixel
    const chartWidth = bins.length * barWidth;
  
    svgElement.setAttribute('width', chartWidth);
    svgElement.setAttribute('height', chartHeight);
  
    binCounts.forEach((bin, index) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', index * barWidth);
      rect.setAttribute('y', chartHeight - (bin.count * barWidth));
      rect.setAttribute('width', barWidth);
      rect.setAttribute('height', bin.count * barWidth);
      rect.setAttribute('fill', 'orange');
      rect.setAttribute('stroke', 'black');
  
      svgElement.appendChild(rect);
  
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (index * barWidth) + (barWidth / 2));
      text.setAttribute('y', chartHeight - (bin.count * barWidth) - 5); // Adjust the y position for the text label
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', 'black');
      text.textContent = bin.label;
  
      svgElement.appendChild(text);
    });
  }
  
  const svg = document.getElementById('histogram');
  createHistogram(svg, 'Pham Le Thanh Nhan');