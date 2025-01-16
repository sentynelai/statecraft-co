import React, { useEffect, useRef } from 'react';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { STORE_DATA } from '../data/stores';

export const USAMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const drawMap = async () => {
      const response = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
      const us = await response.json();
      const states = feature(us, us.objects.states);

      const svg = svgRef.current;
      if (!svg) return;

      const width = svg.clientWidth;
      const height = svg.clientHeight;

      const projection = geoAlbersUsa()
        .fitSize([width, height], states);

      const path = geoPath().projection(projection);

      // Clear existing content
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }

      // Draw states
      const statesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      states.features.forEach(state => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', geoPath().projection(projection)(state) || '');
        path.setAttribute('fill', '#1F2937');
        path.setAttribute('stroke', '#374151');
        statesGroup.appendChild(path);
      });
      svg.appendChild(statesGroup);

      // Add store markers with connections
      const markersGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      
      // Draw connections between stores
      STORE_DATA.forEach((store, i) => {
        if (i < STORE_DATA.length - 1) {
          const [x1, y1] = projection([store.lng, store.lat]) || [0, 0];
          const [x2, y2] = projection([STORE_DATA[i + 1].lng, STORE_DATA[i + 1].lat]) || [0, 0];
          
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', x1.toString());
          line.setAttribute('y1', y1.toString());
          line.setAttribute('x2', x2.toString());
          line.setAttribute('y2', y2.toString());
          line.setAttribute('stroke', '#4FD1C5');
          line.setAttribute('stroke-width', '1');
          line.setAttribute('stroke-opacity', '0.2');
          markersGroup.appendChild(line);
        }
      });

      // Add store markers
      STORE_DATA.forEach(store => {
        const [x, y] = projection([store.lng, store.lat]) || [0, 0];
        
        // Outer glow
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', x.toString());
        glow.setAttribute('cy', y.toString());
        glow.setAttribute('r', '12');
        glow.setAttribute('fill', '#4FD1C5');
        glow.setAttribute('opacity', '0.15');
        
        // Inner glow
        const innerGlow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        innerGlow.setAttribute('cx', x.toString());
        innerGlow.setAttribute('cy', y.toString());
        innerGlow.setAttribute('r', '8');
        innerGlow.setAttribute('fill', '#4FD1C5');
        innerGlow.setAttribute('opacity', '0.3');
        
        // Marker
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        marker.setAttribute('cx', x.toString());
        marker.setAttribute('cy', y.toString());
        marker.setAttribute('r', '4');
        marker.setAttribute('fill', '#4FD1C5');
        marker.setAttribute('stroke', '#fff');
        marker.setAttribute('stroke-width', '1');
        
        markersGroup.appendChild(glow);
        markersGroup.appendChild(innerGlow);
        markersGroup.appendChild(marker);
      });
      
      svg.appendChild(markersGroup);
    };

    drawMap();

    // Handle resize
    const handleResize = () => {
      drawMap();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ minHeight: '100vh' }}
      />
    </div>
  );
};