import React from 'react'
import { Alert } from 'react-bootstrap'

import displayStyle from './DisplayAlert'

type Props = {
  statuses: string
}

const AlertDisplay = ({ statuses }: Props) => {

  return (
    <>
      <div style={displayStyle}>
        {
          statuses === 'success' && (
            <Alert key='success' variant='success'>
              The movie has been successfully added to the favourites.
            </Alert>
          )
        }
        {
          statuses === 'error' && (
            <Alert key='danger' variant='danger'>
              This movie is already in the favourite list.
            </Alert>
          )
        }
      </div>
    </>
  )
}

export default AlertDisplay