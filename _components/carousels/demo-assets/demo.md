---
"name": "Carousels"
---

* TOC
{:toc}

# Looped Carousels

{% panel Readme %}

To create a new looped carousel, invoke the `loopedCarousel(wrapper)` method. 
This method takes 1 argument:

| Parameter | Description  |
|---|---|
| `wrapper`  | id or element of the wrapper which contains the main slider element, as well as the pips-carousel element  |  

`loopedCarousel` looks for `.carousel` & `.pips-carousel` children of the given wrapper. If the wrapper or either one of these children cannot be found, an error will be thrown and the carousel will not be initialised.

1. The `.carousel` element will take 100% of the wrapper width.
2. The `.looped-carousel` element must be an empty div placed directly after the main carousel

Full example code & demos can be seen below.

{% endpanel %}

## Creative Content

{% demo %}
{% output %}
<div class="demo-grid"  id="sliderTarget">
  <div class="carousel">
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
  <div class="pips-carousel"></div>
</div>  
{% endoutput %}

{% tabs %}
{% tab %}html{% endtab %}
{% tab %}css{% endtab %}
{% tab %}js{% endtab %}
{% endtabs %}
{% code html %}
<div class="wrapper" id="sliderTarget">
  <div class="carousel">
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
      ...
  </div>
  <div class="pips-carousel"></div>
</div>
{% endcode %}
{% code css %}
.wrapper {
  width: 100%;
}
{% endcode %}
{% code js %}
var carousel = new loopedCarousel('sliderTarget');
{% endcode %}
{% enddemo %}

## Product Cards

**Coming soon**
