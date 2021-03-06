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
      // repeat the above pattern with the other props you want to interpolate.

      return <rect x = {interpolatedX} y = {y} width = {width} height = {height} fill = {fill} />
    }

Ta da! Read the walkthrough up above and the source for more options about all the configuration that can go into it.

# FAQ

- Why in the world would I use this? I love (insert name of animation library)

  That's awesome! Keep using it, then! This library is to help add quick transitional animations into existing code. So if you have a
  component that spits out a chart but doesn't animate transitions, you can use this to wrapper your pieces to easily add those transitions.

  If it's not powerful enough for you, then take the time to learn one of the more thorough libraries.

- My animation is jumping all over the place. What's going on?

  You probably are passing a value as a string instead of a numeric value. Make sure your numbers are numbers!

- The animation timing is too fast/too slow. Can I change it?

  You bet! For the `<Animator>` component, just pass a `duration` prop with the number of ms you'd like it to take. Here's 10 seconds.

      <Animator values={["width"]} duration = {10000} >...</Animator>

  For the `useInterpolate` hook, the third argument is an options object. Pass duration there.

      ...
      useInterpolate(width, setInterpolatedWidth, { duration : 10000})
      ...

- I need to loop my animation!

  No problemo. Just pass in a loop={NUMBER} parameter to the <Animator> component, or set { loop : NUMBER } in the options of useInterpolate.

  - loop === 0 -> does not loop
  - loop > 0 -> loops the number of times specified.
  - loop === -1 -> loops infinitely. To stop this loop, you'll need to change loop to something non-negative AND at least one of the interpolated props.
