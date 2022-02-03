import React, { useState, useRef } from "react"
import ExampleFrame from "./ExampleFrame"

import AnimationGroup from "../AnimationGroup"
import AnimationConsumer from "../AnimationConsumer"

const blurb = "SOME BLURB"
let id = 1
window.exes = new Set()
console.log(
  "I HAVE EXES INIT : ",
  window.exes,
  window.exes.size,
  Array.from(window.exes)
)
const Code = () => {
  console.log("I HAVE CODE RENDER")
  const [entries, setEntries] = useState([])
  const [tempEntry, setTempEntry] = useState("")
  const ex = useRef(id++)
  window.exes.add(ex.current)
  console.log(
    "I HAVE EXES : ",
    ex,
    window.exes.size,
    window.exes,
    Array.from(window.exes)
  )
  return <div>EX</div>
  // eslint-disable-next-line
  const addEntry = (entry) =>
    setEntries([...entries.filter((e) => e !== entry), entry])
  const removeEntry = (entry) => setEntries(entries.filter((e) => e !== entry))
  return (
    <React.Fragment>
      <ul>
        <AnimationGroup values={["opacity"]} initial={{ opacity: 0 }}>
          {entries.map((entry) => {
            return (
              <li key={entry}>
                {entry} <button onClick={() => removeEntry(entry)}>X</button>
              </li>
            )
            // eslint-disable-next-line
            return (
              <AnimationConsumer
                opacity={1}
                key={entry}
                render={({ opacity }) => (
                  <li style={{ opacity }}>
                    {entry}{" "}
                    <button onClick={() => removeEntry(entry)}>X</button>
                  </li>
                )}
              />
            )
          })}
        </AnimationGroup>
      </ul>

      <div>
        <input
          type="text"
          value={tempEntry}
          onChange={(e) => {
            setTempEntry(e.target.value)
          }}
        />
        <button
          onClick={() => {
            addEntry(tempEntry)
            setTempEntry("")
          }}
        >
          Add entry
        </button>
      </div>
    </React.Fragment>
  )
}

export const Example12 = () => {
  return <ExampleFrame blurb={blurb} code={Code} />
}

export default Code
