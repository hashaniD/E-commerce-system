import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const ProCard = ({ product }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/cart');
    };

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://media.istockphoto.com/id/1954422116/photo/a-laptop-with-a-blank-screen-sits-on-a-stylish-wooden-desk-within-a-loft-style-interior-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=zQq1aZ8dH3dWQToaINKq3k6NfZaj6UpsMkmadiT8nZ8="
                    alt={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        ${product.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Stock: {product.quantityInStock}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    sx={{
                        backgroundColor: '#ba4e2b', // Blue background
                        color: 'white', // White text
                        '&:hover': {
                            backgroundColor: '#913517', // Darker blue on hover
                        },
                    }}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
                
            </CardActions>
        </Card>
    );
};

export default ProCard;
