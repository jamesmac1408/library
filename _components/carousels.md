---
"name": "Carousels"
---

* TOC
{:toc}

# Carousels

{% panel Readme %}

To create a new carousel, invoke either the `loopedCarousel(el, opts)` or `finiteCarousel(el, opts)` method. 
These methods take 2 arguments:

| Parameter | Description  |
|---|---|
| `el`  | id or element of the slider element (must have the classes 'carousel & carousel--looped')  |  
| `opts`  | The 'slick' slider options to pass to the carousel ([see here](http://kenwheeler.github.io/slick/))  |  

*In the 'opts' object, you must not override the `dots` option, this value of this must remain `false`*

Full example code & demos can be seen below.

{% endpanel %}

## Looped Carousels

### Creative Content

{% demo %}
{% output %}
<div class="demo-grid">
  <div class="carousel" id="sliderTarget">
    <div class="banner banner-1">
    </div>
    <div class="banner banner-2">
    </div>
    <div class="banner banner-3">
    </div>
    <div class="banner banner-4">
    </div>
    <div class="banner banner-5">
    </div>
    <div class="banner banner-6">
    </div>
    <div class="banner banner-7">
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
{% code scss %}
.banner {
  background-size: 100% 100%;

  height: 485px;
  @media (max-width: $screen-mob-max) {
      height: 185px;
  }
}
.banner-1 {
  background-image: url('http://content.very.co.uk/assets/static/2017/06/sale/26th-june-fashion/desktop/homepage/sale-fashion-homepage-primary.jpg');
}
.banner-2 {
  background-image: url('http://content.very.co.uk/assets/static/2017/07/homepage/10-homepage/the-edit.jpg');
}
...
{% endcode %}
{% code js %}
var carousel = new LoopedCarousel('sliderTarget');
{% endcode %}
{% enddemo %}

### Product Cards

**Coming soon**

## Finite Carousels

### Creative Content

{% demo %}
{% output %}
<div class="demo-grid">
  <div class="carousel" id="sliderTarget2">
    <div class="banner banner-1">
    </div>
    <div class="banner banner-2">
    </div>
    <div class="banner banner-3">
    </div>
    <div class="banner banner-4">
    </div>
    <div class="banner banner-5">
    </div>
    <div class="banner banner-6">
    </div>
    <div class="banner banner-7">
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
{% code scss %}
.banner {
  background-size: 100% 100%;

  height: 485px;
  @media (max-width: $screen-mob-max) {
      height: 185px;
  }
}
.banner-1 {
  background-image: url('http://content.very.co.uk/assets/static/2017/06/sale/26th-june-fashion/desktop/homepage/sale-fashion-homepage-primary.jpg');
}
.banner-2 {
  background-image: url('http://content.very.co.uk/assets/static/2017/07/homepage/10-homepage/the-edit.jpg');
}
...
{% endcode %}
{% code js %}
var carousel = new FiniteCarousel('sliderTarget2');
{% endcode %}
{% enddemo %}

### Product Cards

**Coming soon**
