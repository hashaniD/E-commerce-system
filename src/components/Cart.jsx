import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Card, CardContent, CardMedia, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './style/Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load cart from localStorage when component mounts
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = [...cart];
        updatedCart[index].quantity = newQuantity;
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemoveItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handlePlaceOrder = () => {
        const totalPrice = getTotalPrice(); // Get total price
        localStorage.setItem('totalPrice', totalPrice); // Store total price in localStorage
        localStorage.removeItem('cart'); // Clear cart from localStorage
        setCart([]); // Clear cart state
        navigate('/order-confirmation'); // Navigate to order confirmation page
    };

    const getTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <Typography className="cart-title" variant="h5" gutterBottom>
                <b>My Cart</b>
            </Typography>
            {cart.length === 0 ? (
                <Typography className="cart-empty">No items in your cart.</Typography>
            ) : (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        {cart.map((product, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card className="cart-item-card">
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={product.image || "https://m.media-amazon.com/images/I/61Qe0euJJZL.jpg"}
                                        alt={product.name}
                                        className="cart-item-image"
                                    />
                                    <CardContent className="cart-item-content">
                                        <Typography className="cart-item-name" variant="h6">
                                            {product.name}
                                        </Typography>
                                        <Typography className="cart-item-price" variant="body1" color="primary">
                                            ${product.price}
                                        </Typography>
                                        <div className="cart-item-actions">
                                            <TextField
                                                label="Qty"
                                                type="number"
                                                value={product.quantity}
                                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                                InputProps={{ inputProps: { min: 1 } }}
                                                className="cart-item-quantity"
                                            />
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                onClick={() => handleRemoveItem(index)} 
                                                className="remove-button"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                        <Typography className="cart-item-total-price" variant="body2">
                                            Total Price: ${(product.price * product.quantity).toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
                        <Typography className="cart-total" variant="h6">
                            Total Cart Price: ${getTotalPrice()}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handlePlaceOrder} 
                        >
                            Place Order
                        </Button>
                    </Box>
                </>
            )}
        </div>
    );
};

export default Cart;
