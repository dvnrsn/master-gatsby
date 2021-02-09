import React, {useEffect, useState} from 'react'
import MenuItemStyles from '../styles/MenuItemStyles'
import Img from 'gatsby-image';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder ({order, pizzas, removeFromOrder}) {

  return (
    <>
    {order.map((o, i) => {
      const pizza = pizzas.find(p => p.id === o.id)
      return <MenuItemStyles key={`${o.id}-${i}`}>
        <Img fluid={pizza.image.asset.fluid} />
        <h2>{pizza.name}</h2>
        <p>
          {formatMoney(calculatePizzaPrice(pizza.price, o.size))}
          <button onClick={() => removeFromOrder(i)} type="button" className="remove" title={`Remove ${o.size} ${pizza.name} from order`}>
            &times;
          </button>
        </p>
      </MenuItemStyles>
      }
    )}
    </>
  )
}