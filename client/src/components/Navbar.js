import React, { useState } from 'react';
import { Box, AppBar, Container, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const menuItems = [
  {
    title: 'Percusión',
    items: []
  },
  {
    title: 'Cuerdas',
    items: []
  },
  {
    title: 'Vientos',
    items: []
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

  const handleMenuItemClick = (category) => {
    if (category === 'Percusión') {
      navigate('/menu/PercuForm');
    } else if (category === 'Vientos') {
      navigate('/menu/vientos'); // Cambiado a la ruta correcta
    }
    // Add more conditions here for other categories if needed
  };

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing local storage, etc.)
    // Reload the page
    window.location.reload();
  };

  const handleHomeClick = () => {
    navigate('/tienda');
  };

  const handleCartClick = () => {
    // Add navigation to cart page or open cart modal
    navigate('/carrito');
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
                <Button
                  key={menu.title}
                  color="inherit"
                  onClick={() => handleMenuItemClick(menu.title)}
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
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                onClick={handleCartClick}
                sx={{
                  mr: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <FaShoppingCart />
              </IconButton>
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
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}