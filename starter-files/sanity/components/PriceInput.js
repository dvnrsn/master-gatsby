import React, {useEffect, useState} from 'react'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event';

export default function PriceInput ({type, value, onChange, inputComponent}) {

  function createPatchFrom(value) {
    return PatchEvent.from(value === '' ? unset() : set(Number(value)))
  }

  const formatMoney = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format

  return (
    <div>
      <h2>{type.title} - {value ? formatMoney(value / 100) : ''}</h2>
      <p>{type.description}</p>
      <input type={type.name} value={value} onChange={e => onChange(createPatchFrom(e.target.value))} ref={inputComponent}/>
    </div>
  )

}

PriceInput.focus = function() {
  this._inputElement.focus();
}