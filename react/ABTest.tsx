import React, { FC } from 'react'
import Main from './components/Main'
import './styles.global.css'
import { ABTestProvider } from './context/index'

const ABTest: FC = () => {
  return (
    <ABTestProvider>
      <Main />
    </ABTestProvider>
  )
}

export default ABTest
