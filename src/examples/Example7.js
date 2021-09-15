import React from "react"
import ExampleFrame from "./ExampleFrame"

const blurb =
  "The useInterpolate hook may make sense for your project, if you want to handle animation completely within a component."
const code = `
  const MyRef = React.useRef(({ x, y, width = 25, height = 25, fill = "blue" }) => {
    const [interpolatedX, setInterpolatedX] = React.useState(x)
    useInterpolate(x, setInterpolatedX)

    const [interpolatedY, setInterpolatedY] = React.useState(y)
    useInterpolate(y, setInterpolatedY)

    return (
      <rect
        x={interpolatedX}
        y={interpolatedY}
        width={width}
        height={height}
        fill={fill}
      />
    )
  })
  const MyRect = MyRef.current

  const [x, setX] = React.useState(10)
  const [tempX, setTempX] = React.useState(x)
  const [y, setY] = React.useState(10)
  const [tempY, setTempY] = React.useState(y)
  return (
    <React.Fragment>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
      >
        <MyRect x={x} y={y} />
      </svg>
      <div>
        <input
          type="text"
          value={tempX}
          onChange={(e) => setTempX(parseInt(e.target.value, 10))}
        />
        <input
          type="text"
          value={tempY}
          onChange={(e) => setTempY(parseInt(e.target.value, 10))}
        />
        <button
          onClick={() => {
            setX(tempX)
            setY(tempY)
          }}
        >
          Update coordinates
        </button>
      </div>
    </React.Fragment>
  )
`

const Example7 = () => {
  return <ExampleFrame blurb={blurb} code={code} />
}

export default Example7
