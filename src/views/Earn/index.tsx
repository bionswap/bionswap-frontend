import Page from 'components/Page'
import React from 'react'
import {
  Box,
  Container,
  Stack
} from '@mui/material'
import FarmTable from './components/FarmTable/FarmTable'
import Header from './components/Header/Header'

const Earn = () => {
  return (
    <Page sx={{backgroundColor: theme => (theme.palette as any).extra.background.alt}}>
      <Container sx={{paddingTop: '3rem', paddingBottom: '3rem'}}>
        <Stack width='100%' alignItems='start' spacing={4}>
          <Header/>
          <FarmTable/>
        </Stack>
      </Container>
    </Page>
  )
}

export default Earn