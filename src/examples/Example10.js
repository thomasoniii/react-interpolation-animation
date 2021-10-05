import React from "react"
import ExampleFrame from "./ExampleFrame"

const blurb = `You can also add a callback to let you know when your interpolation has finished.`

const code = `
  const [width, setWidth] = React.useState(25)
  const [tempWidth, setTempWidth] = React.useState(width)
  const [message, setMessage] = React.useState("")

  return (
    <React.Fragment>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
      >
        <Animator
          values={["width"]}
          onCompleteCallback={() => setMessage("Done interpolating!")}
        >
          <rect x="10" y="10" width={width} height="25" fill="blue" />
        </Animator>
      </svg>
      <div>
        <input
          type="text"
          value={tempWidth}
          onChange={(e) => {
            setMessage("")
            setTempWidth(parseInt(e.target.value, 10))
          }}
        />
        <button onClick={() => setWidth(tempWidth)}>Update width</button>
      </div>
      <div>{message}</div>
    </React.Fragment>
  )
`

const Example10 = () => {
  return <ExampleFrame blurb={blurb} code={code} />
}

export default Example10
