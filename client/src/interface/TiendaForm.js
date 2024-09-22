import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Container, Box, Chip, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '@fontsource/comic-neue/700.css';
import CarroForm from "../carrito/carroForm"


const formatNumber = (number) => {
  return number.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export default function ProductList() {
  const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale3d(1.05, 1.05, 1)'
    },
    position: 'relative',
  }));

  const StyledCardMedia = styled(CardMedia)({
    paddingTop: '56.25%', // 16:9 aspect ratio
  });

  const CategoryChip = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1,
  }));

  // Updated PriceBox with the new style
  const PriceBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: '#2196f3', // Material-UI blue color
    color: 'white',
    padding: theme.spacing(0.75, 1.5),
    borderRadius: '20px', // Rounded corners
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Subtle shadow
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const AddToCartButton = styled(IconButton)(({ theme }) => ({
    marginLeft: theme.spacing(1),
  }));

  const ComicTitle = styled(Typography)(({ theme }) => ({
    fontFamily: '"Comic Neue", cursive',
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    fontWeight: 700,
  }));

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/tasks');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      console.error("Error fetching products:", e);
      setError("Failed to load products. Please try again later.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (selectedProduct) {
    return <CarroForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />;
  }

  return (
    <Container>
      <ComicTitle variant="h2" component="h1">
        Instrumentos
      </ComicTitle>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <StyledCard>
              <StyledCardMedia
                image={product.image || 'https://via.placeholder.com/300x200'}
                title={product.title}
              />
              <CategoryChip label={product.categoria || 'Sin categoría'} color="primary" size="small" />
              <PriceBox>
                ${formatNumber(product.precio || 0)}
              </PriceBox>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.title || 'Sin título'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.descripcion || 'Sin descripción'}
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="textSecondary">
                    Disponibles: {product.cantidad || 0}
                  </Typography>
                </Box>
                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="textSecondary">
                    Agregar al carrito
                  </Typography>
                  <AddToCartButton
                    color="primary"
                    aria-label="add to cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCartIcon />
                  </AddToCartButton>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}