import React from "react"

import ExampleFrame from "./ExampleFrame"

const blurb = `You can set the loop flag to re-run your interpolation.`

const code = `
  const [width, setWidth] = React.useState(25);
  const [tempWidth, setTempWidth] = React.useState(width);
  const [loop, setLoop] = React.useState(0);
  const [tempLoop, setTempLoop] = React.useState(loop);

  return (
    <React.Fragment>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
      >
        /* Just set the loop parameter on Animator or pass in a loop value to useInterpolate's options arg.
           0 is the default - run it once and done.
           -1 will loop infinitely.
           >0 will re-run the interpolation that number of times (e.g., 5 will run 5x)

           NOTE - if you are running infinitely, you will need to change the interpolated value AND the loop
           value in order to break out of the loop.
        */
        <Animator values={["width"]} loop={loop}>
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
          onChange={(e) => setTempWidth(e.target.value)}
        />
        <button
          onClick={() => {
            setLoop(parseInt(tempLoop, 10));
            setWidth(parseInt(tempWidth, 10));
          }}
        >
          Update width
        </button>
      </div>
    </React.Fragment>
  );
`

const Example9 = () => {
  return <ExampleFrame blurb={blurb} code={code} />
}

export default Example9
