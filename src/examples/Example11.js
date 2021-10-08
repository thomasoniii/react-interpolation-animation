import React from "react"
import ExampleFrame from "./ExampleFrame"

const blurb = `You can use callbacks to manage loops, too! This will animate from -> to, and then to -> from`

const Code = `
  const [width, setWidth] = React.useState(25)
  const [tempWidth, setTempWidth] = React.useState(width)
  const [loop, setLoop] = React.useState(2)
  const [tempLoop, setTempLoop] = React.useState(loop)

  // eslint-disable-next-line
  const onCompleteCallback = ({ from, to }) => {
    // note that for this demo, we stop BEFORE we reach 1.
    // that's because we first enter this function -after- we have interpolated once.
    // so we ignore the last loop.
    if (loop > 1) {
      setLoop(loop - 1)
      setWidth(from.width)
    }
  }

  return (
    <React.Fragment>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
      >
        <Animator values={["width"]} onCompleteCallback={onCompleteCallback}>
          <rect x="10" y="10" width={width} height="25" fill="blue" />
        </Animator>
      </svg>
      <div>
        Loop:
        <input
          type="text"
          value={tempLoop}
          onChange={(e) => setTempLoop(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={tempWidth}
          onChange={(e) => {
            setTempWidth(parseInt(e.target.value, 10))
          }}
        />
        <button
          onClick={() => {
            setLoop(parseInt(tempLoop, 10))
            setWidth(tempWidth)
          }}
        >
          Update width
        </button>
      </div>
    </React.Fragment>
  )
`

const Example11 = () => {
  return <ExampleFrame blurb={blurb} code={Code} />
}

export default Example11
