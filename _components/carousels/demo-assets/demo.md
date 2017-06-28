---
"name": "Carousels"
---

* TOC
{:toc}

# Looped Carousels

To create a new looped carousel, invoke the `loopedCarousel(carousel, pipsCarousel)` method. 
This method takes 2 arguments:

| Parameter | Description  |
|---|---|
| `carousel`  | id or element of the main carousel  |  
| `pipsCarousel`  | id or element of the empty `.pips-carousel` div  |  

You must create the pips carousel element, place it directly after the slider and give it the class of `pips-carousel`

`loopedCarousel` appends pips to the `.pips-carousel` element, which positions itself based off its parent's width, therefore it would make sense to wrap the slider in a parent container and make the slider width 100%. 

Full example code of this can be seen below.

{% demo %}
{% output %}
<div class="demo-grid">
  <div id="sliderTarget" class="slides">
    <div class="banner banner-1">
      <div class="content">
        <h1>1</h1>
      </div>
    </div>
    <div class="banner banner-2">
      <div class="content">
        <h1>2</h1>
      </div>
    </div>
    <div class="banner banner-3">
      <div class="content">
        <h1>3</h1>
      </div>
    </div>
    <div class="banner banner-4">
      <div class="content">
        <h1>4</h1>
      </div>
    </div>
    <div class="banner banner-5">
      <div class="content">
        <h1>5</h1>
      </div>
    </div>
    <div class="banner banner-6">
      <div class="content">
        <h1>6</h1>
      </div>
    </div>
    <div class="banner banner-7">
      <div class="content">
        <h1>7</h1>
      </div>
    </div>
  </div>
  <div class="pips-carousel" id="sliderTarget-pips"></div>
</div>  
{% endoutput %}
{% code %}
<style>
  .wrapper {
    width: 100%;
  }
  .slides {
    width: 100%;
  }
</style>
<div class="wrapper">
  <div id="sliderTarget" class="slides slider-300">
      <div class="banner banner-1">
        <div class="content">
          <h1>1</h1>
        </div>
      </div>
      <div class="banner banner-2">
        <div class="content">
          <h1>2</h1>
        </div>
      </div>
      <div class="banner banner-3">
        <div class="content">
          <h1>3</h1>
        </div>
      </div>
      ...
  </div>
  <div class="pips-carousel" id="sliderTarget-pips"></div>
</div>
<script>
  var carousel = new loopedCarousel('sliderTarget', 'sliderTarget-pips');
</script>
{% endcode %}
{% enddemo %}
