import { Link, useStaticQuery, graphql } from 'gatsby'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    align-items: center;
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }

`

function countPizzasInToppings(pizzas) {
  const counts = pizzas.map(pizza => pizza.toppings).flat().reduce(
    (acc, topping) => {
      if (acc[topping.id]) {
        acc[topping.id].count += 1
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        }
      }
      return acc
    }, {}
  )
  return Object.values(counts).sort((a, b) => b.count - a.count)
}

export default function ToppingsFilter ({activeTopping}) {
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
        toppings: allSanityTopping {
          nodes {
            name
            id
            vegetarian
          }
        }
        pizzas: allSanityPizza {
          nodes {
            toppings {
              name
              id
            }
          }
        }
      }
  `)

  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes)
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className='name'>
          All
        </span>
        <span className='count'>
          {pizzas.nodes.length}
        </span>
      </Link>
      {toppingsWithCounts.map(topping => (
        <Link to={`/topping/${topping.name}`} key={topping.id} className={activeTopping === topping.name ? 'active' : ''}>
          <span className='name'>{topping.name}</span>
          <span className='count'>{topping.count}</span>
        </Link>
      ))}

    </ToppingsStyles>
  )

}