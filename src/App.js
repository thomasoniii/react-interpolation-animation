import React, { useState } from "react"

import Animator from "./Animator"
import AnimationConsumer from "./AnimationConsumer"
import useInterpolate from "./useInterpolate"

/* eslint-disable react/no-danger */

import "./App.css"

// eslint-disable-next-line
const MyRect = ({ x, y, width = 25, height = 25, fill = "blue" }) => {
  const [interpolatedX, setInterpolatedX] = useState(x)
  useInterpolate(x, setInterpolatedX)

  const [interpolatedY, setInterpolatedY] = useState(x)
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
}

const example1 = `
<svg
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
  width="100"
  height="100"
>
  <rect x="10" y="10" width="25" height="25" fill="blue" />
</svg>
  `

const example2 = `
  const [width, setWidth] = useState(25)
  const [tempWidth, setTempWidth] = useState(width)
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
  >
    <rect x="10" y="10" width={width} height="25" fill="blue" />
  </svg>
  <div>
    <input type = "text" value = {tempWidth} onChange={e => setTempWidth(parseInt(e.target.value, 10))} />
    <button onClick ={() => setWidth(tempWidth)}>Update width</button>
  </div>
    `

const example3 = `
  const [width, setWidth] = useState(25)
  const [tempWidth, setTempWidth] = useState(width)
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
  >
    <Animator values = {["width"]}>
      <rect x="10" y="10" width={width} height="25" fill="blue" />
    </Animator>
  </svg>
  <div>
    <input type = "text" value = {tempWidth} onChange={e => setTempWidth(parseInt(e.target.value, 10))} />
    <button onClick ={() => setWidth(tempWidth)}>Update width</button>
  </div>
        `

const example4 = `
  const [width, setWidth] = useState(25)
  const [tempWidth, setTempWidth] = useState(width)
  const [height, setHeight] = useState(25)
  const [tempHeight, setTempHeight] = useState(height)
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
  >
    <!--
      simply pass the "height" key here to interpolate on it.
      If height is not specified, then the width would animate but the height would jump.
    -->
    <Animator values = {["width", "height"]}>
      <rect x="10" y="10" width={width} height={height} fill="blue" />
    </Animator>
  </svg>
  <div>
    <input type = "text" value = {tempWidth} onChange={e => setTempWidth(parseInt(e.target.value, 10))} />
    <input type = "text" value = {tempHeight} onChange={e => setTempHeight(parseInt(e.target.value, 10))} />
    <button onClick ={() => {setWidth(tempWidth); setHeight(tempHeight)}}>Update dimensions</button>
  </div>
        `

const example5 = `
  const [rotate, setRotate] = useState(0)
  const [tempRotate, setTempRotate] = useState(rotate)
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
  >
    <!--
      Set up an Animator on rotate, as usual.
      Then let the AnimationConsumer pass that rotate prop onto its children,
      who can use it to build a string, in this case.
    -->
    <Animator values = {["rotate"]}>
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
    <input type = "text" value = {tempRotate} onChange={e => setTempRotate(parseInt(e.target.value, 10))} />
    <button onClick ={() => {setRotate(tempRotate)}}>Update rotation</button>
  </div>
        `

const example6 = `
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
      text={Text}
      render={({ text }) => <span>{text}</span>}
    />
  </Animator>
</div>
      `

const example7 = `
  const MyRect = ({ x, y, width = 25, height = 25, fill = "blue" }) => {
    const [interpolatedX, setInterpolatedX] = useState(x)
    useInterpolate(x, setInterpolatedX)

    const [interpolatedY, setInterpolatedY] = useState(x)
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
  }

  const [x, setX] = useState(10)
  const [tempX, setTempX] = useState(x)
  const [Y, setY] = useState(10)
  const [tempY, setTempY] = useState(y)
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
  >
    <MyRect x={x} y={y} />
  </svg>
  <div>
    <input type = "text" value = {tempX} onChange={e => setTempX(parseInt(e.target.value, 10))} />
    <input type = "text" value = {tempY} onChange={e => setTempY(parseInt(e.target.value, 10))} />
    <button onClick ={() => {setX(tempX); setY(tempY)}}>Update coordinates</button>
  </div>
        `

const example9 = `
  const [width, setWidth] = useState(25)
  const [tempWidth, setTempWidth] = useState(width)
  const [height, setHeight] = useState(25)
  const [tempHeight, setTempHeight] = useState(height)
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
  >
    <!--
      Pass multiple children into the Animator to interpolate them all on the same props.
    -->
    <Animator values = {["width", "height"]}>
      <rect x="10" y="10" width={width} height={height} fill="blue" />
      <rect x="20" y="50" width={width} height={height} fill="red" />
    </Animator>
  </svg>
  <div>
    <input type = "text" value = {tempWidth} onChange={e => setTempWidth(parseInt(e.target.value, 10))} />
    <input type = "text" value = {tempHeight} onChange={e => setTempHeight(parseInt(e.target.value, 10))} />
    <button onClick ={() => {setWidth(tempWidth); setHeight(tempHeight)}}>Update dimensions</button>
  </div>`

function App() {
  const [ex2Width, setEx2Width] = useState(25)
  const [tempEx2Width, setTempEx2Width] = useState(ex2Width)

  const [ex3Width, setEx3Width] = useState(25)
  const [tempEx3Width, setTempEx3Width] = useState(ex3Width)

  const [ex4Width, setEx4Width] = useState(25)
  const [tempEx4Width, setTempEx4Width] = useState(ex4Width)
  const [ex4Height, setEx4Height] = useState(25)
  const [tempEx4Height, setTempEx4Height] = useState(ex4Height)

  const [ex5Rotate, setEx5Rotate] = useState(0)
  const [tempEx5Rotate, setTempEx5Rotate] = useState(ex5Rotate)

  const [ex6Text, setEx6Text] = useState("This is some sample text")
  const [tempEx6Text, setTempEx6Text] = useState(ex6Text)

  const [ex7X, setEx7X] = useState(10)
  const [tempEx7X, setTempEx7X] = useState(ex7X)
  const [ex7Y, setEx7Y] = useState(10)
  const [tempEx7Y, setTempEx7Y] = useState(ex7Y)

  const [ex9Width, setEx9Width] = useState(25)
  const [tempEx9Width, setTempEx9Width] = useState(ex9Width)
  const [ex9Height, setEx9Height] = useState(25)
  const [tempEx9Height, setTempEx9Height] = useState(ex9Height)

  return (
    <div className="App">
      <div style={{ gridColumnStart: "span 2" }} className="header">
        Here are some examples of what you can do with{" "}
        <a
          href="https://github.com/thomasoniii/react-interpolation-animation"
          target="_blank"
          rel="noreferrer"
        >
          react-interpolation-animation
        </a>
        .
      </div>
      <div className="code">
        <div>
          Let&apos;s start with a simple example, an SVG with a box in it.
        </div>
        <code>{example1}</code>
      </div>
      <div
        className="example"
        dangerouslySetInnerHTML={{ __html: example1 }}
      ></div>

      <div className="code">
        <div>
          Now we&apos;ll make it interactive, but not use
          react-interpolation-animation. Just give it a text field and a button
          for the user to change the value. This works, but there is no
          animation so it may be jarring.
        </div>
        <code>{example2}</code>
      </div>
      <div className="example">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
        >
          <rect x="10" y="10" width={ex2Width} height="25" fill="blue" />
        </svg>
        <div>
          <input
            type="text"
            value={tempEx2Width}
            onChange={(e) => setTempEx2Width(e.target.value)}
          />
          <button onClick={() => setEx2Width(parseInt(tempEx2Width, 10))}>
            Update width
          </button>
        </div>
      </div>

      <div className="code">
        <div>
          Fortunately, this is exactly what our &lt;Animator&gt; component does.
          Just wrap the rect in Animator and watch the width smoothly
          transition.
        </div>
        <code>{example3}</code>
      </div>
      <div className="example">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
        >
          <Animator values={["width"]}>
            <rect x="10" y="10" width={ex3Width} height="25" fill="blue" />
          </Animator>
        </svg>
        <div>
          <input
            type="text"
            value={tempEx3Width}
            onChange={(e) => setTempEx3Width(e.target.value)}
          />
          <button onClick={() => setEx3Width(parseInt(tempEx3Width, 10))}>
            Update width
          </button>
        </div>
      </div>

      <div className="code">
        <div>But you can also animate multiple values at once!</div>
        <code>{example4}</code>
      </div>
      <div className="example">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
        >
          <Animator values={["width", "height"]}>
            <rect
              x="10"
              y="10"
              width={ex4Width}
              height={ex4Height}
              fill="blue"
            />
          </Animator>
        </svg>
        <div>
          <input
            type="text"
            value={tempEx4Width}
            onChange={(e) => setTempEx4Width(e.target.value)}
          />
          x
          <input
            type="text"
            value={tempEx4Height}
            onChange={(e) => setTempEx4Height(e.target.value)}
          />
          <button
            onClick={() => {
              setEx4Width(parseInt(tempEx4Width, 10))
              setEx4Height(parseInt(tempEx4Height, 10))
            }}
          >
            Update dimensions
          </button>
        </div>
      </div>

      <div className="code">
        <div>You can also animate across multiple children</div>
        <code>{example9}</code>
      </div>
      <div className="example">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
        >
          <Animator values={["width", "height"]}>
            <rect
              x="10"
              y="10"
              width={ex9Width}
              height={ex9Height}
              fill="blue"
            />
            <rect
              x="20"
              y="50"
              width={ex9Width}
              height={ex9Height}
              fill="red"
            />
          </Animator>
        </svg>
        <div>
          <input
            type="text"
            value={tempEx9Width}
            onChange={(e) => setTempEx9Width(e.target.value)}
          />
          x
          <input
            type="text"
            value={tempEx9Height}
            onChange={(e) => setTempEx9Height(e.target.value)}
          />
          <button
            onClick={() => {
              setEx9Width(parseInt(tempEx9Width, 10))
              setEx9Height(parseInt(tempEx9Height, 10))
            }}
          >
            Update dimensions
          </button>
        </div>
      </div>

      <div className="code">
        <div>
          The AnimationConsumer can help you pass values to children, even if
          the child doesn&apos;t use the animated prop directly.
        </div>
        <code>{example5}</code>
      </div>
      <div className="example">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
        >
          <Animator values={["rotate"]}>
            <AnimationConsumer
              rotate={ex5Rotate}
              render={({ rotate }) => (
                <g transform={`rotate(${rotate},25,25)`}>
                  <rect x="10" y="10" width="30" height="30" fill="blue" />
                </g>
              )}
            />
          </Animator>
        </svg>
        <div>
          <input
            type="text"
            value={tempEx5Rotate}
            onChange={(e) => setTempEx5Rotate(parseInt(e.target.value, 10))}
          />
          <button
            onClick={() => {
              setEx5Rotate(tempEx5Rotate)
            }}
          >
            Update rotation
          </button>
        </div>
      </div>

      <div className="code">
        <div>
          Custom easing functions can let you interpolate any values. Let&apos;s
          animate some text typing!
        </div>
        <code>{example6}</code>
      </div>
      <div className="example">
        <div>
          <input
            type="text"
            value={tempEx6Text}
            onChange={(e) => setTempEx6Text(e.target.value)}
          />
          <button
            onClick={() => {
              setEx6Text(tempEx6Text)
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
              text={ex6Text}
              render={({ text }) => <span>{text}</span>}
            />
          </Animator>
        </div>
      </div>

      <div className="code">
        <div>
          The useInterpolate hook may make sense for your project, if you want
          to handle animation completely within a component.
        </div>
        <code>{example7}</code>
      </div>
      <div className="example">
        {" "}
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
        >
          <MyRect x={ex7X} y={ex7Y} />
        </svg>
        <div>
          <input
            type="text"
            value={tempEx7X}
            onChange={(e) => setTempEx7X(parseInt(e.target.value, 10))}
          />
          <input
            type="text"
            value={tempEx7Y}
            onChange={(e) => setTempEx7Y(parseInt(e.target.value, 10))}
          />
          <button
            onClick={() => {
              setEx7X(tempEx7X)
              setEx7Y(tempEx7Y)
            }}
          >
            Update coordinates
          </button>
        </div>
      </div>

      <div style={{ gridColumnStart: "span 2" }} className="header">
        <div>
          And that&apos;s it! Have fun, and read the source if you get stuck -
          there are lots of comments as well as additional options that you can
          use to govern easing functions, initial values, and duration.
        </div>
        <div>
          Use either the HOC wrapper or the hook - go with whatever works
          easiest for your project. Enjoy!
        </div>
      </div>
    </div>
  )
}

export default App
