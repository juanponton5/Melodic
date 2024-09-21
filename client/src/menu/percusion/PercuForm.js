import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Box,
  IconButton
} from "@mui/material";
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

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.15s ease-in-out',
  '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' },
  position: 'relative',
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9 aspect ratio
});

const PriceBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: '#2196f3',
  color: 'white',
  padding: theme.spacing(0.75, 1.5),
  borderRadius: '20px',
  fontWeight: 'bold',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const AddToCartButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/tasks');
      const data = await response.json();
      console.log('All products:', data);
      const bateriaProducts = data.filter(task =>
        task.categoria && task.categoria.toLowerCase().includes('bateria')
      );
      console.log('Filtered Bateria products:', bateriaProducts);
      setProducts(bateriaProducts);
      if (bateriaProducts.length === 0) {
        setError('No se encontraron productos en la categoría "Bateria".');
      } else {
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error al cargar los productos. Por favor, intente de nuevo más tarde.');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  if (selectedProduct) {
    return <CarroForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />;
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <ComicTitle variant="h3" component="h1">
          Instrumentos de Percusión
        </ComicTitle>
        {error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : (
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <StyledCard>
                  <StyledCardMedia
                    image={`https://source.unsplash.com/random/800x600?drums`}
                    title={product.title}
                  />
                  <PriceBox>
                    ${formatNumber(product.precio)}
                  </PriceBox>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {product.descripcion}
                    </Typography>
                  </CardContent>
                  <Box px={2} pb={2} mt="auto">
                    <Typography variant="subtitle1" color="textSecondary">
                      Disponibles: {product.cantidad}
                    </Typography>
                  </Box>
                  <AddToCartButton
                    color="primary"
                    aria-label="add to cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCartIcon />
                  </AddToCartButton>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}