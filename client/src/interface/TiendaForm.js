import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Box,
  Chip
} from "@mui/material";
import { styled } from "@mui/system";
import './ProductList.css';

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

const StyledChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1,
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 1,
}));

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await fetch('http://localhost:4000/tasks');
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Instrumentos
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <StyledCard>
                <StyledCardMedia
                  image={`https://source.unsplash.com/random/800x600?${product.title}`}
                  title={product.title}
                />
                <StyledChip label={`$${product.precio}`} color="primary" />
                <CategoryChip label={product.categoria} color="secondary" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {product.descripcion}
                  </Typography><Typography variant="body2" color="textSecondary" component="p">
                    {product.categoria}
                  </Typography>
                </CardContent>
                <Box px={2} pb={2} mt="auto">
                  <Typography variant="subtitle1" color="textSecondary">
                    Disponibles: {product.cantidad}
                  </Typography>
                </Box>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}