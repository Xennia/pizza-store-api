const { v4: uuidv4 } = require('uuid');

let orders = [
    // Example order
    {
        id: uuidv4(),
        size: 'medium',
        toppings: ['cheese', 'pepperoni'],
        quantity: 2,
        status: 'pending'
    }
];

module.exports = { orders };
