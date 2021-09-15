import R from "react"
import A from "../Animator"
import PropTypes from "prop-types"
import * as babel from "babel-standalone"

// eslint-disable-next-line
const getExampleComponent = (code, { React, Animator }) => {
  const wrappedCode = `() => {
    ${code}
  }`

  const babelCode = babel.transform(wrappedCode, {
    presets: ["react", "es2015"],
  }).code

  const trimmedCode = babelCode.replace('"use strict";', "").trim()

  const F = eval(trimmedCode)

  return F
}

const ExampleFrame = ({ blurb, code }) => {
  const Component = getExampleComponent(code, { React: R, Animator: A })

  return (
    <R.Fragment>
      <div className="code">
        <div>{blurb}</div>
        <code>{code}</code>
      </div>
      <div className="example">
        <Component />
      </div>
    </R.Fragment>
  )
}

ExampleFrame.propTypes = {
  blurb: PropTypes.string,
  code: PropTypes.string,
}

export default ExampleFrame
