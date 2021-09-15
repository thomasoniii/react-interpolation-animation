import React from "react"
import ExampleFrame from "./ExampleFrame"

const blurb =
  "The AnimationConsumer can help you pass values to children, even if the child doesn't use the animated prop directly."
const code = `
  const [rotate, setRotate] = React.useState(0)
  const [tempRotate, setTempRotate] = React.useState(rotate)
  return (
    <React.Fragment>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
      >
        /* Set up an Animator on rotate, as usual. Then let the
        AnimationConsumer pass that rotate prop onto its children, who can use
        it to build a string, in this case. */
        <Animator values={["rotate"]}>
          <AnimationConsumer
            rotate={rotate}
            render={({ rotate }) => (
              <g transform={\`rotate(\${rotate},25,25)\`}>
                <rect x="10" y="10" width="30" height="30" fill="blue" />
              </g>
            )}
          />
        </Animator>
      </svg>
      <div>
        <input
          type="text"
          value={tempRotate}
          onChange={(e) => setTempRotate(parseInt(e.target.value, 10))}
        />
        <button
          onClick={() => {
            setRotate(tempRotate)
          }}
        >
          Update rotation
        </button>
      </div>
    </React.Fragment>
  )
`

const ExampleNUMBER = () => {
  return <ExampleFrame blurb={blurb} code={code} />
}

export default ExampleNUMBER
