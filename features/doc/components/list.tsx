import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem } from '@mui/material'
import { css } from 'linaria'

import App from 'features/app'
import Doc from 'features/doc'

const styles = css`
  // TODO
  border: 1px solid ${App.model.palette.main};
`
export default function DocumentList () {
  const dispatch = useDispatch()
  const list = useSelector(Doc.select.list)

  return (
    <div className={styles}>
      { !!list.length && <List>
        {_.map(list, (doc, i) => {
          return (
            <ListItem key={doc.id}/>
          )
        })}
      </List>}
    </div>
  )
}