import React from 'react';

export const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    className="filter-icon"
  >
    <path d="M6.1 17.25a3 3 0 0 1 5.8 0h8.85a.75.75 0 1 1 0 1.5h-8.84a3 3 0 0 1-5.82 0H3.25a.75.75 0 1 1 0-1.5h2.84zm6-6a3 3 0 0 1 5.8 0h2.85a.75.75 0 1 1 0 1.5h-2.84a3 3 0 0 1-5.82 0H3.25a.75.75 0 1 1 0-1.5h8.84zm-6-6a3 3 0 0 1 5.8 0h8.85a.75.75 0 1 1 0 1.5h-8.84a3 3 0 0 1-5.82 0H3.25a.75.75 0 0 1 0-1.5h2.84zM9 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-6 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
  </svg>
);

export const IgnitionIcon = ({ ignition }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill={ignition ? '#92d050' : '#d60c0c'}
    fillOpacity={1}
    width={15}
  >
    <path
      d="M 256,8 C 119,8 8,119 8,256 8,393 119,504 256,504 393,504 504,393 504,256 504,119 393,8 256,8 Z m 0,424 C 158.94,432 80,353 80,256 80,159 158.94,80 256,80 c 97.06,0 176,79 176,176 0,97 -78.94,176 -176,176 z"
      style={{ opacity: 0.4 }}
    />
    <path d="M256 432c-97.06 0-176-79-176-176S158.94 80 256 80s176 79 176 176-78.94 176-176 176z" />
  </svg>
);
