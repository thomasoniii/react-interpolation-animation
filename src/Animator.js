import React from "react"
import Animation from "./Animation"
import AnimationGroup from "./AnimationGroup"

import { DEFAULT_DURATION } from "./constants"

/*
  I'm playing around with how I want to structure this code.
  For now, just use Animator and it'll work with as many children as you pass it,
  deferring the actual work to an Animation or AnimationGroup component.

  Say you have this element in an SVG graphic:
  <rect x = {0} y = {10} width = {width} height = {10} fill = "blue" />

  And you want to animate that width value, so when you change the value, the bar
  animates to the new size. All you need to do is wrapper it with an Animator.

  <Animator values = {["width"]}>
    <rect x = {x} y = {y} width = {width} height = {10} fill = "blue" />
  </Animator>

  If you want to animate all of those variables:
  <Animator values = {["width", "x", "y"]}>
    <rect x = {x} y = {y} width = {width} height = {10} fill = "blue" />
  </Animator>

  Now if any (or all!) of x, y, or width change, it'll animate to the new position.

  Animator (and the other verions it wrappers) accepts several props:

    values - an array of strings to watch for changes. These props MUST be named
      on the child components for them to be handed through.
    duration - length of the interpolation duration in ms. Defaults to 500
    easing - an object of { [value] : easingFunction }
      the easingFunction is the same as the getDelta function in useInterpolate.
      Accepts an arg of a single object of {from, to, percent}
    defaultEasing - change the default easing used if a specific easing for a given
      value is not provided.
    initial - an object containing { [value] : initialValue } This is optional.
      The initial object is used if you want to start from a different position.

      For example:
        <Animator values = {["x"]}>
          <rect x = {x} y = {0} width = {50} height = {50} />
        </Animator>

      Let's say the first time you mount the component, x = 50. It will draw immediately
      at x ={50} w/o animation.

      initial is used to provide that first transition into the DOM.
        <Animator values = {["x"]} initial = {{x : 0}}>
          <rect x = {x} y = {0} width = {50} height = {50} />
        </Animator>
      This will mount the component with an x value of 0 and then interpolate it until it
      reaches 50.

      This is to keep your data value (which is x = 50) separate from a sugared animation value
      (have it fly in from 0)

    It's possible that child components should animate starting at different positions.
    Animator looks for a prop on its children called `animator-initial`. If present, initial
    values in there will be used.

    The precedence for an intial value is:
      child.animator-initial[value]
      Animator.initial[value]
      child.props[value]

*/

const Animator = (props) => {
  const args = {
    duration: DEFAULT_DURATION,
    ...props,
  }

  if (React.Children.count(args.children) < 1) {
    return null
  }
  return React.Children.count(args.children) > 1 ? (
    <AnimationGroup {...args} />
  ) : (
    <Animation {...args} child={React.Children.toArray(args.children)[0]} />
  )
}

export default Animator
