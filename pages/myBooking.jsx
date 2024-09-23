import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'; // Only import what you need
import { CartContext } from './cartContext';

const MyBooking = () => {
  const { cartItems } = useContext(CartContext); // Access cartItems from context

  return (
    <div style={styles.container}> {/* Outer div for layout */}
      <div style={styles.cartContainer}> {/* Use div for scrolling */}
        <h2 style={styles.cartHeader}>My Booking</h2>
        {cartItems.length > 0 ? (
          cartItems.map((room, index) => (
            <div key={index} style={styles.cartItem}>
              <img
                src={room.image}
                alt={room.Title}
                style={styles.roomImage}
              />
              <div style={styles.roomDetails}>
                <h3 style={styles.roomTitle}>{room.Title}</h3>
                <p style={styles.roomPrice}>
                  {room.Price}$ <span style={styles.perNight}>/Pernight</span>
                </p>
                <div style={styles.roomDetailsContainer}>
                  <span style={styles.roomDetailLabel}>Size:</span>
                  <span style={styles.roomDetail}>{room.Size}</span>
                </div>
                <div style={styles.roomDetailsContainer}>
                  <span style={styles.roomDetailLabel}>Capacity:</span>
                  <span style={styles.roomDetail}>{room.Capacity}</span>
                </div>
                <div style={styles.roomDetailsContainer}>
                  <span style={styles.roomDetailLabel}>Bed:</span>
                  <span style={styles.roomDetail}>{room.Bed}</span>
                </div>
                <div style={styles.roomDetailsContainer}>
                  <span style={styles.roomDetailLabel}>Services:</span>
                  <span style={styles.roomDetail}>{room.Services}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noItemsText}>No rooms added to the cart yet.</p>
        )}
      </div>
    </div>
  );
};

// Define styles using plain CSS properties for web
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Full height of the viewport
  },
  cartContainer: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    overflowY: 'auto', // Enable vertical scrolling
    flex: '1', // Allow this div to grow and fill the space
  },
  cartHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  cartItem: {
    marginBottom: '30px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '1px solid #ebebeb',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  roomImage: {
    width: '100%',
    height: '200px',
  },
  roomDetails: {
    padding: '24px',
    borderBottom: '1px solid #ebebeb',
  },
  roomTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#19191a',
    marginBottom: '17px',
  },
  roomPrice: {
    fontSize: '20px',
    color: '#dfa974',
    fontWeight: '900',
    marginBottom: '10px',
  },
  perNight: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#19191a',
  },
  roomDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '10px',
  },
  roomDetailLabel: {
    width: '125px',
    fontSize: '18px',
    color: '#707079',
    lineHeight: '36px',
  },
  roomDetail: {
    fontSize: '16px',
    color: '#707079',
    lineHeight: '30px',
  },
  noItemsText: {
    fontSize: '16px',
    color: '#707079',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default MyBooking;
