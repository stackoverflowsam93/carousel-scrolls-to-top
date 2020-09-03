//todo: this scrolling carousel resets to the top of the page, except on the case that the 4th, 1st & 2nd article are showing on the carousel, it doesn't happen in reverse order

import React, {useState, useEffect} from 'react'
import './style.css'

import PreviewSqr from '../ArticlePreviewSquare'

/**
 * A slide show of images, with arrows at the side, and dots to select the image underneath
 */
export default ({squares, triple, ...props}) => {

  const styles = {
    carousel: {
      height: triple ? 700 : 466
    },
    container: {
      width: 'auto',
      position: 'relative',
      borderRadius: 5,
      overflow: 'hidden',
    },
    grid: {
      height: '80%',
      width: '80%',
      margin: 'auto'
    },
    tripleGrid: {
      height: '80%',
      width: '80%',
      margin: 'auto',
      display: 'grid',
      gridGap: 20,
      gridTemplate: 'repeat(3, 1fr) / repeat(2, 1fr)',
      gridTemplateAreas:
          `"u u"
          "u u"
          "d t"`,
    }
  }

  const [index, setIndex] = useState(0);
  const interval = 2000
  let timer

  const increment = (slideN) => {
    const idx = index + slideN
    if (idx >= squares.length){
      setIndex(0)
    }else if(idx < 0){
      setIndex(squares.length - 1)
    }else{
      setIndex(idx)
    }
  }

  useEffect(() => {
    timer = setInterval(() => increment(1), interval)
    return () => {
      clearInterval(timer)
    }
  })

  useEffect(() => {

    const slides = Array.from(document.getElementsByClassName('slide'))
    const dots = Array.from(document.getElementsByClassName('dot'))

    slides.forEach((slide, slideIdx) => {
      if(slideIdx === index){
        slide.className = "slide slide-un fade-in"
        dots[slideIdx].className = "dot activeDot"
        return
      } else if (slideIdx === index + 1 || slideIdx === 0 && index === squares.length - 1){
        slide.className = triple ? "slide slide-du fade-in" : "slide invisible"
      }else if (
        slideIdx === index + 2 || 
        (slideIdx === 0 && index === squares.length - 2) || 
        (slideIdx === 1 && index === squares.length - 1)
      ){
        slide.className = triple ? "slide slide-twa fade-in" : "slide invisible"
      }else{
        slide.className = "slide invisible"
      }
      dots[slideIdx].className = "dot"
    })

  }, [index])

  const slideClass = function(number){
    switch(number){
      case(0):
        return "slide-un fade-in"
        break
      case(1):
        return triple ? "slide-du fade-in" : 'invisible'
        break
      case(2):
        return triple ? "slide-twa fade-in" : 'invisible'
        break
      default:
        return "invisible"
    }
  }

  return (
    <div 
      style={styles.container}
      {...props}
    >
      <div style={styles.carousel} >
        <div style={triple ? styles.tripleGrid : styles.grid}>
          {squares.map((sqr, cnt) => <PreviewSqr key={cnt} className={`slide ${slideClass(cnt)}`} square={sqr} />)}
        </div>
        <div className="prevCont" onClick={() => increment(-1)}>
          <div className='prev'>&#10094;</div>
        </div>            {/*The Arrows on the left/right of the slideshow*/}
        <div className="nextCont" onClick={() => increment(1)}>
          <div className='next'>&#10095;</div>
        </div>
        <br/>
        <div className='flex-center-row w-100'>
          {squares.map((entry, dotIndex) => {
            return (
              <div 
                key={dotIndex}
                className='dot'
                onClick={() => setIndex(dotIndex)}
              ></div>
            )
            })}
        </div>
      </div>
    </div>
  )
}