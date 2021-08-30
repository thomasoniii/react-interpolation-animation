import React, { useState } from "react"
import useInterpolate, { animatorDefaultEasing } from "./useInterpolate"

import { DEFAULT_DURATION } from "./constants"

/*
  I'm playing around with how I want to structure this code.
  For now, an Animation is identical to an AnimationGroup, except it only accepts
  one component via a render prop instead of a list of children.

  You probably don't want to use this directly and probably want to import Animator
  instead.

  In fact, go look at the more thorough documentation over in Animator.
*/

const ANIMATOR_INITIAL = "animator-initial"

const Animation = ({
  values = [],
  duration = DEFAULT_DURATION,
  child,
  easing = {},
  defaultEasing = animatorDefaultEasing,
  initial = {},
  loop = 0,
}) => {
  // given our values array, look to the child to figure out our current values.
  const current = values.reduce((bucket, v) => {
    return { ...bucket, [v]: child.props[v] }
  }, {})

  // we're going to build a new initial object
  const fullInitial = {}
  // pull out any initial values set on the child
  const childInit = child.props[ANIMATOR_INITIAL] || {}

  // now iterate over our values (which is a list of keys)
  // and set the initial value to the child's init value, our component init value, or the
  // child's current prop value.
  values.forEach((v) => {
    fullInitial[v] = childInit[v] ?? initial[v] ?? current[v]
  })

  // standard useInterpolate call - save localValues to hand through to the child.
  const [localValues, setLocalValues] = useState(fullInitial)
  useInterpolate(current, setLocalValues, {
    // here we have changes if any key in our current set of values has changed from
    // our last set of values.
    //
    // remember - this is not all props on the child, this is just the props in our
    // values array.
    getHasChanges: (c, previous) =>
      Boolean(
        Object.keys(c).find((key) => previous && c[key] !== previous[key])
      ),

    duration,

    initial: fullInitial,

    loop,

    // our getDelta function needs to construct a new object with each value interpolated
    // along the way.
    getDelta: ({ percent, from, to }) => {
      return Object.keys(to).reduce((bucket, v) => {
        const easingFunc = easing[v] || defaultEasing
        const newValue = easingFunc({
          from: from[v],
          to: to[v],
          percent,
          value: v,
        })
        return {
          ...bucket,
          [v]: newValue,
        }
      }, {})
    },
  })

  // finally, we're going to clone the child with the new props
  // but toss out the animator-initial value: we don't need it any more and don't
  // want it writing to the DOM.
  return React.cloneElement(child, {
    ...localValues,
    [ANIMATOR_INITIAL]: undefined,
  })
}

export default Animation
