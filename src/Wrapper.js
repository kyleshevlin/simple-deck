import React from 'react'
import { splitChildrenAtHRs, wrapChildrenInSlides } from './wrapperUtils'

export function Wrapper({ children, ...rest }) {
  const slides = wrapChildrenInSlides(splitChildrenAtHRs(children))
  const index = useSlideIndex(slides)

  return (
    <div {...rest}>
      <div>{slides[index]}</div>
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <a href="https://kyleshevlin.com">kyleshevlin.com</a>
            <a href="https://twitter.com/kyleshevlin">@kyleshevlin</a>
          </div>
        </div>
        <div>
          <div
            style={{
              backgroundColor: 'black',
              height: 5,
              width: `${((index + 1) / slides.length) * 100}%`,
              transition: 'width .3s ease',
            }}
          />
        </div>
      </footer>
    </div>
  )
}

/**
 * This custom hook maintains the state of the slide index
 * It also sets up the keyboard navigation, which updates
 * that slide index.
 */
function useSlideIndex(slides) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    function handleKey(e) {
      switch (e.keyCode) {
        case 37:
          return setIndex(s => Math.max(0, s - 1))
        case 39:
          return setIndex(s => Math.min(slides.length - 1, s + 1))
      }
    }

    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
    }
  }, [slides])

  return index
}
