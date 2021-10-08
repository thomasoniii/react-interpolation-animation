import React from "react"
import ExampleFrame from "./ExampleFrame"

const blurb = `You can also add a callback to let you know when your interpolation has finished.`

const Code = `
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
          onCompleteCallback={({ from, to }) => {
            setMessage(
              \`Done interpolating!\nfrom : \${JSON.stringify(
                from,
                undefined,
                2
              )}\nto : \${JSON.stringify(to, undefined, 2)}\`
            )
          }}
        >
          <rect x="10" y="10" width={width} height="25" fill="blue" />
        </Animator>
      </svg>
      <div>
        <input
          type="text"
          value={tempWidth}
          onChange={(e) => setTempWidth(parseInt(e.target.value, 10))}
        />
        <button
          onClick={() => {
            setMessage("")
            setWidth(tempWidth)
          }}
        >
          Update width
        </button>
      </div>
      <div style={{ whiteSpace: "pre" }}>{message}</div>
    </React.Fragment>
  )
`

const Example10 = () => {
  return <ExampleFrame blurb={blurb} code={Code} />
}

export default Example10
