import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Wrapper } from './Wrapper'
import Slides from './slides.mdx'

export function Deck() {
  return (
    <MDXProvider components={{ wrapper: Wrapper }}>
      <Slides />
    </MDXProvider>
  )
}
