import React from 'react'
import useTypewriter from '@hooks/animations/writeText';

function LoginHeader({ head, description }) {
  const descWrite = useTypewriter(description) ;
  return (
    <>
      <h1 className="text-27 my-3 text-lg font-kal-3 dark:text-gray-100">
        {head}
      </h1>
      <p className="text-sm font-kal-2 text-gray-500  dark:text-gray-300">
        {descWrite}
      </p>
    </>
  )
}

export default LoginHeader