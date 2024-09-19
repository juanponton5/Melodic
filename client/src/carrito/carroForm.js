import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: 'auto',
  marginTop: theme.spacing(4),
}));

const StyledCardMedia = styled(CardMedia)({
  height: 140,
});

export default function CarroForm({ product, onClose }) {
  const navigate = useNavigate();

  if (!product) {
    return (
      <Typography color="error">
        Error: No se ha seleccionado ningún producto.
      </Typography>
    );
  }

  const handleAddToCart = () => {
    // Obtener el carrito actual del localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Agregar el producto al carrito
    const updatedCart = [...currentCart, product];
    
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Navegar a la página del carrito
    navigate('/carrito');
  };

  return (
    <StyledCard>
      <StyledCardMedia
        image={product.image || 'https://via.placeholder.com/300x200'}
        title={product.title || 'Producto sin título'}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.title || 'Producto sin título'}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.descripcion || 'Sin descripción'}
        </Typography>
        <Typography variant="h6" color="primary" mt={2}>
          Precio: ${product.precio ? product.precio.toFixed(2) : '0.00'}
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={1}>
          Disponibles: {product.cantidad || 0}
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Agregar al carrito
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Volver a la lista
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
}