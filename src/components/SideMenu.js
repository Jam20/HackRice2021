// Styles and imports were ommited
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import React, { useState, useEffect } from 'react';
import { SideBarData, SideBarNav, message } from "./SideBarData"
// import Avatar from '@mui/material/Avatar'
// import Avatar from '@mui/material/Avatar'
// import Avatar from '@mui/material/Avatar'
import { useHistory } from 'react-router-dom'
import './components.css'
import MessageIcon from '@mui/icons-material/Message';
const SideMenu = () => {
    const history = useHistory()
    const classes = {}
    const [sidebar, setSidebar] = useState(true)
    const [filteredMessages, setFilteredMessage] = useState(
      [
        {
          message:'',
          startTime:"",
          endTime:'',
        }
      ]
    )
   
    const filter = () => {
      let output = []
      for (let sentence of message.sentences) {
        if (sentence.text !== '\n' && sentence.text[0] !=='[' && sentence.text[sentence.text.length-2] !==']') {
          console.log(sentence.text[sentence.text.length])
          output.push(sentence)
        }
      }
      return output
    }

    useEffect (()=>{
      setFilteredMessage(filter())
    }, [])

    return (
      <div className="sidebar" >
        {/* <div style={{backgroundColor:'#249F77', margin:0, paddingTop:15, paddingBottom:15}}>
          {SideBarNav.map((v, k)=>{
            return (
              <li key={k} onClick={() => history.push(v.path)} className="nav-li">
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
        </div> */}

        <div style={{backgroundColor:'#3563C9', margin:0, paddingTop:15, paddingBottom:15}}> 
            <li className="nav-li">
              <div 
                id='icon'
                >
                <MessageIcon
                  sx={{
                    color:'white'
                  }}
                />
              </div>
              { " " }
              <text
                style={{
                  color:'white'
                }}
                id='title'
                >
                Message
              </text>

              <text
                style={{
                  color:'white'
                }}
                id='title'
                >
                Timestamp
              </text>
            </li>       
        </div>

        <ul>
          {filteredMessages.map((v, k)=>{
            console.log(v)
            return (
              <li key={k}>
                { " " }
                <text
                  style={{
                    color:'white',
                    textAlign:'center'
                  }}
                  id='title'
                  >
                  {v.text}
                </text>
                <text
                  style={{
                    color:'#3563C9',
                    marginBottom:50,
                    underlineColor:'#3563C9'
                  }}
                  id='title'
                  className="timestamp"
                  >
                  {v.startTime + "-" + v.endTime}
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