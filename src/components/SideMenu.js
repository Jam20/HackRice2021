// Styles and imports were ommited
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import React, {useState} from 'react';
import { SideBarData, SideBarNav } from "./SideBarData"
// import Avatar from '@mui/material/Avatar'
// import Avatar from '@mui/material/Avatar'
// import Avatar from '@mui/material/Avatar'
import { useHistory } from 'react-router-dom'
import './components.css'

const SideMenu = () => {
    const history = useHistory()
    const classes = {}
    const [sidebar, setSidebar] = useState(true)
    const pressSideBar = () =>{
      setSidebar(!sidebar)
    }
    return (
      <div className="Sidebar" >
        <div style={{backgroundColor:'#249F77', margin:0, paddingTop:15, paddingBottom:15}}>
          {SideBarNav.map((v, k)=>{
            return (
              <li key={k} onClick={() => history.push(v.path)}>
                <div 
                 id='icon'
                 >
                  {v.icon}
                </div>
                { " " }
                <text
                  style={{
                    color:'white'
                  }}
                  id='title'
                  >
                  {v.title}
                </text>
              </li>
            )
          })}
          </div>
        <ul>
          {SideBarData.map((v, k)=>{
            return (
              <li key={k} onClick={() => history.push(v.path)}>
                <div id='icon'>
                  {v.icon}
                </div>
                { " " }
                <text
                  style={{
                    color:'white'
                  }}
                  id='title'
                  >
                  {v.title}
                </text>
              </li>
            )
          })}
        </ul>
      </div>
      // <Drawer
      //   open={true}
      //   variant='permanent'
      // >
      //   {/* <Grid 
      //     container 
      //     justify='center' 
      //     alignItems='center'  
      //     wrap='wrap'
      //     container={true} 
      //     sx={{
      //       width:40,
      //       backgroundColor:'red'
      //     }}
      //     >
      //     <Avatar
      //       src='https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
      //       className={classes.bigAvatar}
      //     />
      //   </Grid> */}
      //   <List>
      //     {/* {['Profile', 'Sign Out'].map((text, index) => (
      //       <ListItem button key={text}>
      //         <ListItemIcon>
      //           {index % 2 === 0 ? <AccountCircle /> : <ExitToApp />}
      //         </ListItemIcon>
      //         <ListItemText primary={text} />
      //       </ListItem>
      //     ))} */}
      //   </List>
      // </Drawer>
    );
  }
  
  export default SideMenu;