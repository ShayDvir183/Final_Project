import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./ui.css"
import HomePage from '../pages/homepage';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import Vacations from '../pages/vacations';
import MyChart from "../chart/index"
import { Fab, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken_RoleLS  } from '../../store/ls';
import { swalFire } from '../helpers';
import NotFound from '../pages/notFound';
import TravelExploreSharpIcon from '@mui/icons-material/TravelExploreSharp';
export interface IRoute {
  path: string;
  element: any;
  linkText: string;
  invisible?: boolean;
}
export const routes: Array<IRoute> = [
  {
    path: "/",
    element: <HomePage />,
    linkText: "HomePage",
    invisible: false,
  }, {
    path: "/login",
    element: <LoginPage />,
    linkText: "Login",
    invisible: false,
  }, {
    path: "/register",
    element: <RegisterPage />,
    linkText: "Register",
    invisible: false,
  }, {
    path: "/vacations",
    element: <Vacations />,
    linkText: "Vacations",
    invisible: false,
  }
  ,{
    path: "/chart",
    element: <MyChart />,
    linkText: "Chart",
    invisible: false,
  },
  {
    path:"*",
    element:<NotFound/>,
    invisible:true,
    linkText:"NOT-FOUND"
  }
]
export default function NavBar(){
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  function _logoutHandler(){
    clearToken_RoleLS()
    swalFire("Success","Logged out successfully","success").then((result:any) => {
      if(result.isDismissed){
        navigate("/login");
      }
    }) 
  }
  return (
    <AppBar position="static" sx={{mb:10}} style={{backgroundColor:"#34568B",width:"90%",margin:"auto auto"}} id="back-to-top-anchor">
      <Container maxWidth={false} >
        <Toolbar sx={{padding:"0 !important",width:"100% !important"}} >
          <Box sx={{display:"flex",flexDirection:"row",left:0,width:"15%",top:0}}> 
            <TravelExploreSharpIcon sx={{color:"#fff685", display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#fff685',
              textDecoration: 'none',
            }}
          >
           Pooking
          </Typography></Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } ,width:"100% !important"}}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {routes.map((route:IRoute) => {
                if(route.invisible) return
                return <Link key={route.path} className='menuLink' to={route.path} >{route.linkText}</Link>
              })}
              <MenuItem>     <Typography
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                alert(`You have been logged out`);
                navigate('/login');
              }}
              >
                LogOut
              </Typography></MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } ,flexDirection:"row",bottom:0,width:"100% !important"}}>
            {routes.map((route:IRoute) => {
                if(route.invisible) return false
            return  <Link   to={route.path} key={route.linkText}  className="nav-link">
                {route.linkText}
              </Link>
            })}
            <Fab onClick={_logoutHandler}
              className="log-out">
            <span style={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",flexDirection:"column",width:"fit-content",height:"fit-content"}}><LogoutSvg/>LOGOUT</span>
            </Fab>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


const LogoutSvg = ()=>{return <svg style={{width:"40%",height:"20px"}} viewBox="0 0 98.28 68.04"><path fill="none" d="M82.78 0h15.5v68.04h-15.5z"></path><path d="M0 0h.51v68.04H0zM56 47.11V60.1H8.39V7.94H56v12.99h7.88V0H.51v68.04h63.37V47.11H56z"></path><path fill="none" d="M0 0h22.97v68.04H0z"></path><path d="M41.87 38.04h40.85l-9.93 9.9 5.63 5.67 19.35-19.49-19.35-19.48-5.63 5.57L82.51 30H41.87v8.04z"></path></svg>} 