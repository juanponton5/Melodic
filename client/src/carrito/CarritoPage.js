import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
}));

const StyledCardMedia = styled(CardMedia)({
  width: 151,
});

const TotalCard = styled(Card)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
  padding: theme.spacing(2),
  marginLeft: theme.spacing(2),
}));

// Función para formatear números con separador de miles
const formatNumber = (number) => {
  return number.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.precio || 0), 0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tu Carrito
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Tu carrito está vacío.</Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item, index) => (
              <StyledCard key={index}>
                <StyledCardMedia
                  image={item.image || 'https://via.placeholder.com/151x151'}
                  title={item.title || 'Producto sin título'}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="h5" variant="h5">
                    {item.title || 'Producto sin título'}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Precio: ${formatNumber(item.precio || 0)}
                  </Typography>
                  <Button onClick={() => handleRemoveItem(index)} color="secondary">
                    Eliminar
                  </Button>
                </CardContent>
              </StyledCard>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <TotalCard>
              <Typography variant="h6" gutterBottom>
                Total a Pagar
              </Typography>
              <Typography variant="h4">
                ${formatNumber(calculateTotal())}
              </Typography>
            </TotalCard>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}