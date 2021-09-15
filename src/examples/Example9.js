import React from "react"
import ExampleFrame from "./ExampleFrame"

const blurb = "You can also animate across multiple children"
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
        /* Pass multiple children into the Animator to interpolate them all on
        the same props. */
        <Animator values={["width", "height"]}>
          <rect x="10" y="10" width={width} height={height} fill="blue" />
          <rect x="20" y="50" width={width} height={height} fill="red" />
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

const Example9 = () => {
  return <ExampleFrame blurb={blurb} code={code} />
}

export default Example9
