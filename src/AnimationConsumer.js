/*
  very simple component, just around as a reflector. Takes a render prop, then hands
  all props it was given through to that render prop.

  This is useful for cases where you want to provide an interpolated value to a child
  component, but NOT as a prop of that component.

  Or just roll your own flavor of this, I'm not your dad.
*/
const AnimationConsumer = ({ render, ...props }) => {
  return render(props)
}

export default AnimationConsumer
