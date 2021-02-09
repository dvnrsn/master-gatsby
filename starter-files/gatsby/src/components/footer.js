import React, {useEffect, useState} from 'react'

export default function Footer (props) {

  return (
    <footer>
      <p>&copy; Slick's Slices {new Date().getFullYear()}</p>
    </footer>
  )

}