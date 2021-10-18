/*
  I'm playing around with how I want to structure this code.
  For now, an AnimationGroup is identical to an Animation, except it allows you
  to vend an animation out to multiple children. Animation only vends to one.

  You probably don't want to use this directly and probably want to import Animator
  instead.

  In fact, go look at the more thorough documentation over in Animator.
*/

import React, { useRef } from "react"
import Animation from "./Animation"

import { combineLists } from "./utils/merge-arrays"

const AnimationGroup = (props) => {
  const lastChildren = useRef(null)

  const args = { ...props }
  delete args.children

  const exitValues = {}
  console.log("A")
  // const lastChildrenArray =
  // okay, here we need to build a new nodelist, restoring the deleted kids.
  const lastChildrenMap = new Map(
    React.Children.toArray(lastChildren.current).map((child) => [
      child.key,
      child,
    ])
  )
  console.log("B", lastChildrenMap)
  console.log("C", props.children)
  const children = React.Children.map(props.children, (child) => {
    console.log("SEES : ", child)
    if (lastChildrenMap.has(child)) {
      return child
    } else {
      console.log("CLONES WITH EXIT VALUES : ", child.key)
      return React.cloneElement(child, exitValues)
    }
  })
  console.log("CHILDREN ARE : ", children)
  lastChildren.current = props.children

  return React.Children.map(children, (child) => (
    <Animation {...args} child={child} />
  ))
}

export default AnimationGroup
