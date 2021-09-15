import React from "react"

import Example1 from "./examples/Example1"
import Example2 from "./examples/Example2"
import Example3 from "./examples/Example3"
import Example4 from "./examples/Example4"
import Example5 from "./examples/Example5"
import Example6 from "./examples/Example6"
import Example7 from "./examples/Example7"
import Example9 from "./examples/Example9"

import "./App.css"

function App() {
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
      <Example1 />
      <Example2 />
      <Example3 />
      <Example4 />
      <Example9 />

      <Example5 />
      <Example6 />
      <Example7 />

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
