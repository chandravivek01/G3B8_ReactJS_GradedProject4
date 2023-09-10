import React from 'react'
import { Alert } from 'react-bootstrap'

import displayStyle from './DisplayAlert'

type Props = {
  status: string
}

const ShowAlert = ({ status }: Props) => {
  return (
    <>
      <div style={displayStyle}>
        {
          status === 'success' && (
            <Alert key='success' variant='success'>
              Movie successfully removed from the favourites.
            </Alert>
          )
        }
      </div>
    </>
  )
}

export default ShowAlert