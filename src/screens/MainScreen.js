import React, {useState} from 'react'
import './screens.css'
import SideMenu from '../components/SideMenu'
import InfoContainer from '../components/InfoContainer'
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
const MainScreen = (props) => {
    const history = useHistory()
    const BUTTON_HEIGHT = 37.5;
    const [sidebar, setSidebar] = useState(true)
    const pressSideBar = () =>{
      setSidebar(!sidebar)
    }
    /**prop analysis will give the current analysis to be displayed on the page. follows same format as python analysis object */
    
    return (
        <>
         <div className='top-bar'>
            <text class="title-text" onClick={()=>history.push('/home')}>
              Summarizer
            </text>
            
            <Button
              sx={{
                background:'#1db954',
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
                  background:'#1db954',
                },
              }}
              onClick={() => history.push('/home')}
            >
              <text className={'button-text'}>
                Export
              </text>
            </Button>
          </div>
          <div className='container'>
                <div className='wrapper'>
                
                  <div className={
                    sidebar ?'left-section' : 'sidebar-not-visible'
                    }>
                    <SideMenu/>
                  </div>
                  <a onClick={pressSideBar}>
                    <MenuIcon
                      sx={{
                        color:'white',
                        width:30,
                        height:30,
                        marginLeft:2,
                        marginRight:2,
                      }}
                    />
                  </a>
                  <div className="middle-right-section">
                    <InfoContainer/>
                  </div>
              </div>
          </div>
        </>
    )
}

export default MainScreen