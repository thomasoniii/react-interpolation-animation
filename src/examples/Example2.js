import React from "react"

import ExampleFrame from "./ExampleFrame"

const blurb = `Now we'll make it interactive, but not use
    react-interpolation-animation. Just give it a text field and a button
    for the user to change the value. This works, but there is no
    animation so it may be jarring.`

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
        <rect x="10" y="10" width={width} height="25" fill="blue" />
      </svg>
      <div>
        <input
          type="text"
          value={tempWidth}
          onChange={(e) => setTempWidth(e.target.value)}
        />
        <button onClick={() => setWidth(parseInt(tempWidth, 10))}>
          Update width
        </button>
      </div>
    </React.Fragment>
  )
`

const Example2 = () => {
  return <ExampleFrame blurb={blurb} code={code} />
}

export default Example2
