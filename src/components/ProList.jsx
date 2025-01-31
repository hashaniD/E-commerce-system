import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProCard from './ProCard';
import Footer from './Footer';  // Import the Footer component
import './style/ProList.css'; // Import the CSS file

const ProList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query')?.toLowerCase() || '';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5132/api/products");
                console.log("Fetched products:", res.data);
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error while getting data", err);
                setError("There was an error fetching the product data. Please try again later.");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (query) {
            setFilteredProducts(
                products.filter(product => 
                    product.name.toLowerCase().includes(query)
                )
            );
        } else {
            setFilteredProducts(products);
        }
    }, [query, products]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {/* Animated image near the navbar */}
            <div className="banner-container">
                <img
                    src="https://www.gallelaptop.lk/images/home/products.jpg" 
                    alt="Animated Image"
                    className="animated-image"
                    style={{
                        width: '100%',
                        height: 'auto',
                        animation: 'fadeInOut 5s infinite ease-in-out', // Image fade animation
                    }}
                />
            </div>

            <div className="product-list-wrapper"> {/* Apply the class here */}
                <div className="container">
                    <div
                        className="list"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "16px",
                            justifyContent: "center",
                        }}
                    >
                        {filteredProducts.length === 0 ? (
                            <p>No products found</p>
                        ) : (
                            filteredProducts.map((product) => (
                                <ProCard key={product.id} product={product} />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Add the Footer component here */}
           
        </div>
    );
};

export default ProList;
