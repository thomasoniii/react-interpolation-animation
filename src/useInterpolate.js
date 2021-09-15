import { useRef, useEffect } from "react"

/*
  This is the meat of the library.
  Set it up in your component like this:

  const SomeReactComponent( { someValue } ) => {

    // make a local copy of the variable that you're going to interpolate.
    const [interpolatedSomeValue, setInterpolatedSomeValue] = useState(someValue);

    // and then actually interpolate it.
    useInterpolate(someValue, setInterpolatedSomeValue)

    // later, when you would have done this:
    // <div width = {someValue}>Some DIV element</div>
    // instead do this:
    <div width={interpolatedSomeValue}>Some DIV element</div>

    // And you are done.
  }

  There is a third argument - an options object which you can pass along:

    getDelta - should be a function which accepts a single object, which contains
      three values - { to, from, percent }
      to is the value at the start of the interpolation
      from is the value at the end of the interpolation
      percent is a float from 0->1 showing how far along the animation we are.
      Pass this arg to change easing speed or animation effects, such as to use
      a quadratic ease function or animate text typing.

    duration - length of the animation in ms

    getHasChanges - a function to determine if there are changes to the values.
      should accept an object with two keys - current and previous
      current is an object with key/value mapping at the end of the interpolation.
      previous is an object with key/value mapping when the interpolation started.

    initial - sometimes you want an interpolation to start from a different value
      than the one initially set on the component when it is first mounted.
      You can pass in a set of initial values to use here.

    loop - repeat the animation from the beginning the specified number of times.
      e.g., 5 repeats 5x, 10 repeats 10x.
      0 is the default where it will not repeat.
      -1 repeats infinite times.

      Again, rememeber, it loops from the beginning.

*/

/*
  The default delta easing. Given percent, from, and to.
  Returns a value between from and to, at a given percentage, with linear easing.

  e.g.,
  animatorDefaultEasing({from : 50, to : 100, percent : .5})
  // returns 75, since it's halfway between 50 and 100.

  You can use this function if it is useful to you, and otherwise provide your own.
*/
export const animatorDefaultEasing = ({ percent, from, to }) => {
  return from + Math.min(1, percent) * (to - from)
}

/*
  By default, if we have no previous values, we have no changes.
  otherwise, if the two objects are not identical, we have changes.
*/
const defaultHasChanges = (current, previous) =>
  previous !== undefined && current !== previous

const useInterpolate = (
  current,
  setter,
  {
    getDelta = animatorDefaultEasing,
    duration = 500,
    getHasChanges = defaultHasChanges,
    initial,
    loop = 0,
  } = {}
) => {
  // requestAnimationFrame starts ticking as soon as the page is loaded. We'll need
  // to do conversions between absolute page load time vs relative interpolation time.
  const startTime = useRef(performance.now())

  // keep track of the last set of values at the start of the interpolation, defaulting
  // to the initial values.
  const previous = useRef(initial)

  // keep track of the last frame of animation, in case we want to cancel it.
  const lastFrame = useRef({})

  // and further key each animation so we won't accidentally re-run something.
  // const renderKey = useRef(1)

  const hasChanges = getHasChanges(current, previous.current)

  // if we have changes and are re-interpolating AND an animation frame is pending,
  // then cancel it out and set our "last" values to wherever the interpolation had
  // moved us to at that point. Then wipe out our lastFrame.
  if (hasChanges && lastFrame.current.frame) {
    cancelAnimationFrame(lastFrame.current.frame)
    previous.current = lastFrame.current.delta
    lastFrame.current = {}
  }

  // we enter the effect when hasChanges has changed.
  useEffect(() => {
    // blank out our last startTime, since we'll rewrite it in the animation frame.
    startTime.current = undefined

    // keep a ref to our previous values.
    const prevVals = previous.current

    // and increment our renderKey.
    // const myKey = renderKey.current++

    // the effect fires if hasChanges has changed. But we don't actually want to
    // fire the animation unless hasChanges is actually true.
    if (hasChanges) {
      // request an animation frame and save it.
      lastFrame.current.frame = requestAnimationFrame(function animate(time) {
        // this is disabled for now for more testing.
        /*
        if (myKey !== renderKey.current) {
          return;
        }
        //*/

        // save the startTime on the first frame if we need to.
        startTime.current = startTime.current || time

        // and convert from absolute page time to relative interpolation time.
        time -= startTime.current

        // if our current time < duration, we're still interpolating.
        // get newDelta values, call the setter with them, and save them along
        // with requesting a new frame.
        if (time < duration || loop--) {
          // if (time < duration) {
          const newDelta = getDelta({
            from: prevVals,
            to: current,
            percent: time / duration,
          })

          setter(() => newDelta)
          lastFrame.current.delta = newDelta

          lastFrame.current.frame = requestAnimationFrame(animate)

          if (loop && time >= duration) {
            previous.current = prevVals
            startTime.current = undefined
          }
        } else {
          // otherwise, we've the duration. So we just call the setter with our final
          // values, update our previous value, and wipe out the last frame.
          setter(() => current)
          previous.current = current
          lastFrame.current = {}
        }
      })
    }

    // always save the new current values as the previous ones whenever we enter.
    previous.current = current
    // eslint-disable-next-line
  }, [hasChanges]);
}

export default useInterpolate
