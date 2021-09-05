import React from 'react'
import { Slide } from './Slide'

export const splitChildrenAtHRs = children => {
  const splits = []
  let index = 0

  /**
   * React does not provide a Children.filter method, so we will handle
   * this imperatively. I want to split the children at <hr>s to make slides.
   *
   * This should result in a 2d array, an array of slides, where each slide can
   * have many children.
   */
  React.Children.forEach(children, child => {
    // Skip hrs, advance index
    if (child.props.originalType === 'hr') {
      index++
      return
    }

    if (splits[index] === undefined) {
      splits[index] = []
    }

    splits[index].push(child)
  })

  return splits.map(split => {
    return React.createElement(React.Fragment, null, split)
  })
}

export const wrapChildrenInSlides = children => {
  return React.Children.map(children, child => {
    return React.createElement(Slide, null, child)
  })
}
