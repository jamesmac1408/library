---
"name": "Carousels"
---

* TOC
{:toc}

# Looped Carousels

{% panel Readme %}

To create a new looped carousel, invoke the `loopedCarousel(el, opts)` method. 
This method takes 2 arguments:

| Parameter | Description  |
|---|---|
| `el`  | id or element of the slider element (must have the class 'carousel')  |  
| `opts`  | The 'slick' slider options to pass to the carousel ([see here](http://kenwheeler.github.io/slick/))  |  

*In the 'opts' object, you must not override the `dots` option, this value of this must remain `false`*

Full example code & demos can be seen below.

{% endpanel %}

## Creative Content

{% demo %}
{% output %}
<div class="demo-grid">
  <div class="carousel" id="sliderTarget">
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

{% tabs %}
{% tab %}html{% endtab %}
{% tab %}css{% endtab %}
{% tab %}js{% endtab %}
{% endtabs %}
{% code html %}
<div class="carousel" id="sliderTarget">
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
