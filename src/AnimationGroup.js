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

window.gizmos = new Set()

const AnimationGroup = (props) => {
  const gizmo = useRef(null)
  window.gizmos.add(gizmo)
  console.log("I HAVE GIZMOS : ", window.gizmos)
  const lastChildren = useRef(null)

  const args = { ...props }
  delete args.children

  // const exitValues = { opacity: 0.5 }

  const children = combineLists({
    oldList: React.Children.toArray(lastChildren.current),
    newList: React.Children.toArray(props.children),
    // eslint-disable-next-line
    pickFromOld: (_, i) => (
      // (oldList, index) => (
      // React.cloneElement(oldList[index], exitValues),

      <div key={`D-${i}`}>DELETED</div>
    ),
    includes: (list, value) => list.find((v) => v.key === value.key),
    findIndex: (list, value) => list.findIndex((v) => v.key === value.key),
  })

  lastChildren.current = props.children
  console.log(
    "CHILDREN ARE : ",
    children,
    children.length,
    props.children.length
  )
  const idxList = React.Children.map(children, (k, i) => {
    console.log("MAP HERE : ", k, i, k.key)
    return k.key
  }).join(",")
  console.log("IDX LIST : ", idxList, typeof idxList)
  if (children.length > props.children.length) {
    console.log("RETURNS OUT HERE!,", children.length, props.children.length)
    return idxList
  }
  console.log("STILL GOING!")
  return [
    React.Children.map(children, (k, i) => {
      console.log("MAP HERE : ", k, i, k.key)
      return k.key
    }).join(","),
    "(",
    idxList,
    ")",
    React.Children.map(children, (child) => {
      console.log("MAP OVER CHILDREN : ", child, idxList)

      return <Animation {...args} child={child} idxList={idxList} />
    }),
  ]

  // eslint-disable-next-line
  return React.Children.map(children, (child) => {
    console.log("MAP OVER CHILDREN : ", child)
    return <Animation {...args} child={child} />
  })
}

export default AnimationGroup
