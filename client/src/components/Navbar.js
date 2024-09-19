import React, { useState } from 'react';
import { Box, AppBar, Container, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const menuItems = [
  {
    title: 'Percusión',
    items: ['Baterías', 'Vientos', 'Platillos']
  },
  {
    title: 'Cuerdas',
    items: ['Guitarras', 'Bajos', 'Violines']
  },
  {
    title: 'Vientos',
    items: ['Saxofones', 'Trompetas', 'Flautas']
  }
];

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEls, setAnchorEls] = useState(Array(menuItems.length).fill(null));

  const handleMenuOpen = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuItemClick = (item, index) => {
    handleMenuClose(index);
    if (item === 'Baterías') {
      navigate('/menu/PercuForm');
    } else if (item === 'Flautas') {
      navigate('/menu/vientos/VientosForm');
    }
    // Add more conditions here for other menu items if needed
  };

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing local storage, etc.)
    // Reload the page
    window.location.reload();
  };

  const handleHomeClick = () => {
    navigate('/tienda');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" color="transparent">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#eee', fontWeight: 'bold' }}>
                Melodic Shop
              </Link>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              <Button
                color="inherit"
                onClick={handleHomeClick}
                sx={{
                  mx: 2,
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Home
              </Button>
              {menuItems.map((menu, index) => (
                <React.Fragment key={menu.title}>
                  <Button
                    color="inherit"
                    onClick={(e) => handleMenuOpen(e, index)}
                    sx={{
                      mx: 2,
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    {menu.title}
                  </Button>
                  <Menu
                    anchorEl={anchorEls[index]}
                    open={Boolean(anchorEls[index])}
                    onClose={() => handleMenuClose(index)}
                  >
                    {menu.items.map((item) => (
                      <MenuItem key={item} onClick={() => handleMenuItemClick(item, index)}>
                        {item}
                      </MenuItem>
                    ))}
                  </Menu>
                </React.Fragment>
              ))}
            </Box>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Cerrar sesión
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}