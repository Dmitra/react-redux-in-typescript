import React from 'react'
import { LinearProgress } from '@mui/material'
import { css } from 'linaria'

const styles = css`
  position: absolute;
  width: 100%;
  z-index: 10;
`
export default function LoadingIndicator () {
  return (
    <LinearProgress className={styles}/>
  )
}