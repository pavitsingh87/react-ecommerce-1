const express = require('express');
const router = express.Router();

// Cart stored in session/localStorage on frontend
// These routes handle cart operations

router.post('/calculate', (req, res) => {
  try {
    const { items, couponCode } = req.body;
    let subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    
    // Apply coupon logic
    if (couponCode === 'SAVE10') discount = subtotal * 0.1;
    
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + tax + shipping - discount;

    res.json({ subtotal, tax, shipping, discount, total });
  } catch (error) {
    res.status(500).json({ message: 'Calculation error' });
  }
});

module.exports = router;