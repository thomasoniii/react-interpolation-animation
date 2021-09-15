import React from "react"

import ExampleFrame from "./ExampleFrame"

const blurb = `But you can also animate multiple values at once!`

const code = `
  const [width, setWidth] = React.useState(25)
  const [tempWidth, setTempWidth] = React.useState(width)
  const [height, setHeight] = React.useState(25)
  const [tempHeight, setTempHeight] = React.useState(height)
  return (
    <React.Fragment>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
      >
        &lt;!-- simply pass the "height" key here to interpolate on it. If
        height is not specified, then the width would animate but the height
        would jump. --&gt;
        <Animator values={["width", "height"]}>
          <rect x="10" y="10" width={width} height={height} fill="blue" />
        </Animator>
      </svg>
      <div>
        <input
          type="text"
          value={tempWidth}
          onChange={(e) => setTempWidth(parseInt(e.target.value, 10))}
        />
        <input
          type="text"
          value={tempHeight}
          onChange={(e) => setTempHeight(parseInt(e.target.value, 10))}
        />
        <button
          onClick={() => {
            setWidth(tempWidth)
            setHeight(tempHeight)
          }}
        >
          Update dimensions
        </button>
      </div>
    </React.Fragment>
  )
`

const Example4 = () => {
  return <ExampleFrame blurb={blurb} code={code} />
}

export default Example4
