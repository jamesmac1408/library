function doScrolling(scrollTarget, element, duration) {
	var startingY = scrollTarget.scrollTop
  var elementY = element.getBoundingClientRect().top
  // If element is close to page's bottom then window will scroll only to some position above the element.
  var targetY = scrollTarget.scrollHeight - elementY < scrollTarget.offsetHeight ? scrollTarget.scrollHeight - scrollTarget.offsetHeight : elementY + scrollTarget.scrollTop
	var diff = targetY - startingY
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  var easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
  var start

  if (!diff) return
  
	// Bootstrap our animation - it will get called right before next frame shall be rendered.
	window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    var time = timestamp - start
		// Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1)
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent)

    scrollTarget.scrollTop = startingY + diff * percent;

		// Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

export default doScrolling;