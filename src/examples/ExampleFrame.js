import PropTypes from "prop-types"
import * as babel from "babel-standalone"

import R from "react"
import A from "../Animator"
import AC from "../AnimationConsumer"
import ui from "../useInterpolate"

const getExampleComponent = (
  code,
  // eslint-disable-next-line
  { React = R, Animator = A, AnimationConsumer = AC, useInterpolate = ui } = {}
) => {
  if (typeof code === "function") {
    return code
  }

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
  const Component = getExampleComponent(code)

  if (typeof code === "function") {
    code = "Code is function"
  }

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
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default ExampleFrame
