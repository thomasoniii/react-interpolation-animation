/*
  I'm playing around with how I want to structure this code.
  For now, an AnimationGroup is identical to an Animation, except it allows you
  to vend an animation out to multiple children. Animation only vends to one.

  You probably don't want to use this directly and probably want to import Animator
  instead.

  In fact, go look at the more thorough documentation over in Animator.
*/

import React from "react"
import Animation from "./Animation"

const AnimationGroup = (props) => {
  const args = { ...props }
  delete args.children
  return React.Children.map(props.children, (child) => (
    <Animation {...args} child={child} />
  ))
}

export default AnimationGroup
