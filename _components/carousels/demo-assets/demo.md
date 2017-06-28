---
"name": "Carousels"
---

* TOC
{:toc}

# Looped Carousels

{% demo %}
{% output %}
<div class="demo-grid">
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
</div>  
{% endoutput %}
{% code %}
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
<script>
  var carousel = new loopedCarousel('sliderTarget');
</script>
{% endcode %}
{% enddemo %}
