import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Container, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '@fontsource/comic-neue/700.css';
import CarroForm from "../../carrito/carroForm";

const formatNumber = (number) => {
  return number.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const ComicTitle = styled(Typography)`
  font-family: 'Comic Neue', cursive;
  text-align: center;
  margin-bottom: 2rem;
`;

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledCardMedia = styled(CardMedia)`
  padding-top: 56.25%; // 16:9 aspect ratio
`;

const PriceBox = styled(Box)`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #2196f3; // Material-UI blue color
  color: white;
  padding: 6px 12px;
  border-radius: 20px; // Rounded corners
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2); // Subtle shadow
`;

const AddToCartButton = styled(IconButton)`
  // You can add custom styles here if needed
`;

export default function Vientos() {
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
      
      // Improved filtering logic
      const vientosProducts = data.filter(product => {
        const categoria = product.categoria ? product.categoria.toLowerCase().trim() : '';
        return categoria === "vientos" || categoria === "viento";
      });
      
      console.log("Productos de viento:", vientosProducts);
      setProducts(vientosProducts);
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
        Instrumentos de Viento
      </ComicTitle>
      {products.length === 0 ? (
        <Typography>No se encontraron productos de la categoría Vientos.</Typography>
      ) : (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <StyledCard>
                <StyledCardMedia
                  image={product.image || 'https://via.placeholder.com/300x200'}
                  title={product.title}
                />
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
      )}
    </Container>
  );
}