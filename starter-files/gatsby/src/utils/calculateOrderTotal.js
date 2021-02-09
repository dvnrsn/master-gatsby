import calculatePizzaPrice from "./calculatePizzaPrice"

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((runningtTotal, singleOrder) => {
    const pizza = pizzas.find(pizza => pizza.id === singleOrder.id)
    return runningtTotal + calculatePizzaPrice(pizza.price, singleOrder.size)
  }, 0)
}