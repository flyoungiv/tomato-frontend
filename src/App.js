import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import InfoIcon from '@mui/icons-material/Info';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Stack from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import Chart from './Chart';

const columns = [
  { field: 'country_code', headerName: 'ISO3', width: 70 },
  { field: 'country', headerName: 'Country', width: 180 },
  { field: 'medals', headerName: 'Total Medals', width: 70 },
];

const drawerWidth = 360;

export default function App(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    console.log('start call')
    fetch('http://localhost:8000/sqlalchemy')
      .then(res => res.json())
      .then(body => setData(body))
      .catch(e => console.log(e))
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <Stack direction="column" spacing={2}>
              <Button href="https://tomato-a5c7p2ktpa-uc.a.run.app/docs">API Docs [Fast API]</Button>
              <Button href="https://tomato-frontend-react.vercel.app/">Frontend 1 [React]</Button>
              <Button href="https://tomato-frontend-angular.vercel.app/">Fronted 2 [Angular]</Button>
            </Stack>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <Stack direction="column" spacing={2}>
              <Button href="https://github.com/flyoungiv/tomato">Python Backend</Button>
              <Button href="https://github.com/flyoungiv/tomato-frontend-react">React Frontend</Button>
              <Button href="https://github.com/flyoungiv/tomato-frontend-angular">Angular Frontend</Button>
            </Stack>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />      {/* <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={"Stack Info"} />
          </ListItemButton>
        </ListItem>
      </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Fleetwood - Demo App [Tomato]
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div className="page-container">
          <Typography variant="h2" component="h2">
            🏅 Olympic Medals & Population
          </Typography>
          <Typography variant="h6" component="h6">Does a larger population mean more medals won?</Typography>

          <div className="chart-container">
            <Chart />
          </div>
          <div className="table-container">
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                getRowId={(row) => row.country_code}
                rows={data}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}