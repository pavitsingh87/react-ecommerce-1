const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const router = express.Router();

// Create payment intent
router.post('/create-intent', auth, async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: { orderId }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Payment error' });
  }
});

// Confirm payment
router.post('/confirm', auth, async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;
    
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'paid',
      stripePaymentId: paymentIntentId,
      orderStatus: 'processing'
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Payment confirmation error' });
  }
});

module.exports = router;