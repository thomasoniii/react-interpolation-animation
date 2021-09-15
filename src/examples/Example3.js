import React from "react"

import ExampleFrame from "./ExampleFrame"

const blurb = `Fortunately, this is exactly what our <Animator> component does.
    Just wrap the rect in Animator and watch the width smoothly
    transition.`

const code = `
  const [width, setWidth] = React.useState(25)
  const [tempWidth, setTempWidth] = React.useState(width)

  return (
    <React.Fragment>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
      >
        <Animator values={["width"]}>
          <rect x="10" y="10" width={width} height="25" fill="blue" />
        </Animator>
      </svg>
      <div>
        <input
          type="text"
          value={tempWidth}
          onChange={(e) => setTempWidth(parseInt(e.target.value, 10))}
        />
        <button onClick={() => setWidth(tempWidth)}>Update width</button>
      </div>
    </React.Fragment>
  )
`

const Example3 = () => {
  return <ExampleFrame blurb={blurb} code={code} />
}

export default Example3
