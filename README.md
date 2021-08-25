# react-interpolation-animation

Check out the live demo/walkthrough at <a href = "https://thomasoniii.github.io/react-interpolation-animation/">https://thomasoniii.github.io/react-interpolation-animation/</a>

This is a set of simple higher order react components + a hook that do nothing more than help you interpolate from one value to another.

It's easy to spit out a bunch of bars in a bar chart in an SVG element. It's relatively difficult to animate a transition from one width
to another. These files make it easy.

Instead of this:

    <rect x = {x} y = {y} width = {width} height = {height} fill = "blue" />`

Do this:

    import { Animator } from "react-interpolation-animation"

    <Animator values={["x", "y", "width", "height"]}>
      <rect x = {x} y = {y} width = {width} height = {height} fill = "blue" />
    </Animator>`

That's it. Now if you change the values of x,y,width or height, your rectangle will animate to the new value instad of jarringly jumping.

If it makes more sense, you can also use a hook and do it inline. So instead of this:

    const MyRect = ({x,y,width,height,fill}) => {
      return <rect x = {x} y = {y} width = {width} height = {height} fill = {fill} />
    }

Do this:

    import { useInterpolate } from "react-interpolation-animation"

    const MyRect = ({x,y,width,height,fill}) => {

      const [interpolatedX, setInterpolatedX] = useState(x)
      useInterpolate(x, setInterpolatedX)

      const [interpolatedY, setInterpolatedY] = useState(y)
      useInterpolate(y, setInterpolatedY)

      const [interpolatedWidth, setInterpolatedWidth] = useState(width)
      useInterpolate(width, setInterpolatedWidth)

      const [interpolatedHeight, setInterpolatedHeight] = useState(height)
      useInterpolate(height, setInterpolatedHeight)

      return <rect x = {interpolatedX} y = {interpolatedY} width = {interpolatedWidth} height = {interpolatedHeight} fill = {fill} />
    }

Ta da! Read the walkthrough up above and the source for more options about all the configuration that can go into it.

# FAQ

* Why in the world would I use this? I love (insert name of animation library)

  That's awesome! Keep using it, then! This library is to help add quick transitional animations into existing code. So if you have a
  component that spits out a chart but doesn't animate transitions, you can use this to wrapper your pieces to easily add those transitions.

  If it's not powerful enough for you, then take the time to learn one of the more thorough libraries.

* My animation is jumping all over the place. What's going on?

  You probably are passing a value as a string instead of a numeric value. Make sure your numbers are numbers!
