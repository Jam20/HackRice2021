import React from 'react'
import './screens.css'
import SideMenu from '../components/SideMenu'
import InfoContainer from '../components/InfoContainer'
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom'

const MainScreen = (props) => {
    const history = useHistory()
    const BUTTON_HEIGHT = 37.5
    return (
        <>
         <div className='top-bar'>
            <text class="title-text">
              Lorem pm
            </text>
            <Button
              sx={{
                background:'#72EFA3',
                padding:1,
                paddingRight:6,
                paddingLeft:6,
                height:BUTTON_HEIGHT,
                marginLeft:'auto',
                marginRight:'15%',
                marginTop:'auto',
                marginBottom:'auto',
                '&:hover': {
                  opacity:.7,
                  background:'#72EFA3',
                },
              }}
              onClick={() => history.push('/home')}
            >
              <text className={'button-text'}>
                Lorem Ipsum
              </text>
            </Button>
          </div>
          <div className='container'>
                <div className='wrapper'>
                  <div className='left-section'>
                    <SideMenu/>
                  </div>

                  <div className="middle-right-section">
                    <InfoContainer/>
                  </div>
              </div>
          </div>
        </>
    )
}

export default MainScreen