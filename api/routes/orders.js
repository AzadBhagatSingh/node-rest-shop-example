const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    });
});


router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(200).json({
        message: 'Handling POST requests to /orders',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if(id === '1'){
        res.status(200).json({
            message: 'Valid orderId',
            orderId:id
        });
    }else{
        res.status(200).json({
            message: 'Invalid orderId',
            orderId:id
        });
    }
    
});

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Updated!'
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted!'
    });
});

module.exports = router;