// Styles and imports were ommited
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
// import Avatar from '@mui/material/Avatar'
// import Avatar from '@mui/material/Avatar'
// import Avatar from '@mui/material/Avatar'

//Component used to display additional tracking information to the user including timestamps and other information
function SideMenu() {
    const classes = {}
  
    return (
      <Drawer
        open={true}
        variant='permanent'
      >
        {/* <Grid 
          container 
          justify='center' 
          alignItems='center'  
          wrap='wrap'
          container={true} 
          sx={{
            width:40,
            backgroundColor:'red'
          }}
          >
          <Avatar
            src='https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
            className={classes.bigAvatar}
          />
        </Grid> */}
        <List>
          {/* {['Profile', 'Sign Out'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <AccountCircle /> : <ExitToApp />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
      </Drawer>
    );
  }
  
  export default SideMenu;