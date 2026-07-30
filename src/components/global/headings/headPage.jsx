import React from 'react'
import { twMerge } from 'tailwind-merge'

function HeadPage({content , className}) {
  return (
         <h1 className={twMerge("text-27  font-kal-3 text-lg" , className)}>
           {content}
        </h1>
  )
}

export default HeadPage