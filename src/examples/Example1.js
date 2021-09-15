import React from "react"
import ExampleFrame from "./ExampleFrame"

const blurb = "Let's start with a simple example, an SVG with a box in it."
const code = `
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
    >
      <rect x="10" y="10" width="25" height="25" fill="blue" />
    </svg>
  )
`

const Example1 = () => {
  return <ExampleFrame blurb={blurb} code={code} />
}

export default Example1
