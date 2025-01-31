import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './style/OrderConfirmation.css'; 

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedTotalPrice = localStorage.getItem('totalPrice') || "0.00";
    setTotalPrice(storedTotalPrice);
  }, []);

  const handleBackToHome = () => {
    localStorage.removeItem('totalPrice'); // Clear stored total price
    navigate('/');
  };

  return (
    <div className="order-confirmation-container">
      <Card className="order-confirmation-card">
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom>
            Order Placed Successfully!
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Thank you for your purchase! Your order has been confirmed and is being processed.
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            We will notify you once your items are on their way. In the meantime, feel free to browse more products.
          </Typography>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold', marginTop: 2 }}>
            Total Order Price: ${totalPrice}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToHome}
            sx={{ marginTop: 3 }}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
