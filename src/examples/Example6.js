import React from "react"
import ExampleFrame from "./ExampleFrame"

const blurb =
  "Custom easing functions can let you interpolate any values. Let's animate some text typing!"
const code = `
  const [text, setText] = React.useState("This is some sample text")
  const [tempText, setTempText] = React.useState(text)

  return (
    <React.Fragment>
      <div>
        <input
          type="text"
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
        />
        <button
          onClick={() => {
            setText(tempText)
          }}
        >
          Update text
        </button>
      </div>
      <div>
        <Animator
          values={["text"]}
          duration={5000}
          defaultEasing={({ from, to, percent }) => {
            let i = 0
            while (from.charAt(i) === to.charAt(i)) {
              i++
            }
            if (percent < 0.5) {
              return from.substr(
                0,
                i + Math.floor((1 - percent * 2) * (from.length - i))
              )
            } else {
              return to.substr(
                0,
                i + Math.floor((percent - 0.5) * 2 * (to.length - i))
              )
            }
          }}
        >
          <AnimationConsumer
            text={text}
            render={({ text }) => <span>{text}</span>}
          />
        </Animator>
      </div>
    </React.Fragment>
  )
`

const Example6 = () => {
  return <ExampleFrame blurb={blurb} code={code} />
}

export default Example6
