import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { css } from 'linaria'

import App from 'features/app/index'
import List from 'features/doc/components/list'
import LoadingIndicator from './loading-indicator'

const styles = css`
`
export default function UI () {
  const loading = useSelector(App.select.loading)
  const isLoading = _.isEmpty(loading)

  return (
    <StyledEngineProvider injectFirst>
      <div className={styles}>
        <CssBaseline/>
        <main
        >
          { isLoading && <LoadingIndicator/> }
          { !isLoading && <List/> }
        </main>
      </div>
    </StyledEngineProvider>
  )
}