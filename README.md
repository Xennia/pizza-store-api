### Complete an Order

**Endpoint**: `POST /api/orders/:orderId/complete`

**Description**: Completes an order and calculates the total price.

**Parameters**:
- `orderId` (string): The ID of the order to complete.

**Response**:
- `id` (string): The ID of the order.
- `size` (string): The size of the pizza.
- `toppings` (array): The toppings on the pizza.
- `quantity` (number): The number of pizzas.
- `totalPrice` (number): The total price of the order.
- `status` (string): The status of the order (`completed`).

**Example Request**:
```sh
curl -X POST http://localhost:3002/api/orders/ef6f0cbb-b828-4279-b69e-e2b27814fae3/complete

