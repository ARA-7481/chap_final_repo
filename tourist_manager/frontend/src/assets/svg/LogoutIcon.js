import React from 'react'

function LogoutIcon({ color }) {
  return (
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.3335 10.4163L12.2502 7.49967L9.3335 4.58301" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.25 7.5H5.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.25 12.75H2.91667C2.60725 12.75 2.3105 12.6271 2.09171 12.4083C1.87292 12.1895 1.75 11.8928 1.75 11.5833V3.41667C1.75 3.10725 1.87292 2.8105 2.09171 2.59171C2.3105 2.37292 2.60725 2.25 2.91667 2.25H5.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default LogoutIcon