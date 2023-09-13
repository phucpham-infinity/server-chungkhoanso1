import React from 'react'
import { Outlet } from "react-router-dom";

const ChartLayout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default ChartLayout