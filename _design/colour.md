---
"name": "Colour"
---

* TOC
{:toc}


## UI Colours

The main UI colors are used for action buttons, alert messages, and form elements.

### Primary Green
Used sparingly, to indicate success or completion.

{% demo %}
{% output %}
<div class="colour-col">
  <div class="row pri-1">
    <span class="white">pri-1</span>
  </div>
  <div class="row pri-2">
    <span class="white">pri-2</span>
  </div>
  <div class="row pri-3">
    <span class="black">pri-3</span>
  </div>
</div>
{% endoutput %}
{% code scss %}
.el {
  @include pri-1(background);
}
.el {
  @include pri-2(background);
}
.el {
  @include pri-3(background);
}
{% endcode %}
{% enddemo %}

### Secondary Blue
Informative and critical to signposting the user’s journey through the site.

{% demo %}
{% output %}
<div class="colour-col">
  <div class="row sec-1">
    <span class="white">sec-1</span>
  </div>
  <div class="row sec-2">
    <span class="white">sec-2</span>
  </div>
  <div class="row sec-3">
    <span class="black">sec-3</span>
  </div>
</div>
{% endoutput %}
{% code scss %}
.el {
  @include sec-1(background);
}
.el {
  @include sec-2(background);
}
.el {
  @include sec-3(background);
}
{% endcode %}
{% enddemo %}

### Error Red
Signfying an error to the user, indicating that they can’t complete their journey yet.

{% demo %}
{% output %}
<div class="colour-col">
  <div class="row err-1">
    <span class="white">err-1</span>
  </div>
  <div class="row err-2">
    <span class="white">err-2</span>
  </div>
  <div class="row err-3">
    <span class="black">err-3</span>
  </div>
</div>
{% endoutput %}
{% code scss %}
.el {
  @include err-1(background);
}
.el {
  @include err-2(background);
}
.el {
  @include err-3(background);
}
{% endcode %}
{% enddemo %}

### Moderate Orange
Neither red, nor yellow. This is moderate orange.

{% demo %}
{% output %}
<div class="colour-col">
  <div class="row mod-1">
    <span class="white">mod-1</span>
  </div>
  <div class="row mod-2">
    <span class="white">mod-2</span>
  </div>
  <div class="row mod-3">
    <span class="black">mod-3</span>
  </div>
</div>
{% endoutput %}
{% code scss %}
.el {
  @include mod-1(background);
}
.el {
  @include mod-2(background);
}
.el {
  @include mod-3(background);
}
{% endcode %}
{% enddemo %}

### Warning Yellow
Use sparingly to alert the user to a potential pitfalls—typically check boxes.

{% demo %}
{% output %}
<div class="colour-col">
  <div class="row war-1">
    <span class="white">war-1</span>
  </div>
  <div class="row war-2">
    <span class="white">war-2</span>
  </div>
  <div class="row war-3">
    <span class="black">war-3</span>
  </div>
</div>
{% endoutput %}
{% code scss %}
.el {
  @include war-1(background);
}
.el {
  @include war-2(background);
}
.el {
  @include war-3(background);
}
{% endcode %}
{% enddemo %}

### Greys
Grey colors are used for text, backgrounds, lines and borders.

{% demo %}
{% output %}
<div class="colour-col">
  <div class="row grey-dark">
    <p>
      <span class="white">grey-dark</span>
      <br />
      <span class="white">(The darkest shade used across Shop Direct sites and apps)</span>
    </p>
  </div>
  <div class="row grey-med">
    <span class="white">grey-med</span>
  </div>
  <div class="row grey-outline">
    <span class="black">grey-outline</span>
  </div>
</div>
{% endoutput %}
{% code scss %}
.el {
  @include grey-dark(background);
}
.el {
  @include grey-med(background);
}
.el {
  @include grey-outline(background);
}
{% endcode %}
{% enddemo %}

### Brand Colours

#### Very

{% demo %}
{% output %}
<div class="colour-col">
  <div class="row very-1">
    <span class="white">very-1</span>
  </div>
  <div class="row very-2">
    <span class="white">very-2</span>
  </div>
  <div class="row very-3">
    <span class="black">very-3</span>
  </div>
</div>
{% endoutput %}
{% code scss %}
.el {
  @include very-1(background);
}
.el {
  @include very-2(background);
}
.el {
  @include very-3(background);
}
{% endcode %}
{% enddemo %}

#### Littlewoods

{% demo %}
{% output %}
<div class="colour-col">
  <div class="row lw-1">
    <span class="white">lw-1</span>
  </div>
  <div class="row lw-2">
    <span class="white">lw-2</span>
  </div>
  <div class="row lw-3">
    <span class="black">lw-3</span>
  </div>
</div>
{% endoutput %}
{% code scss %}
.el {
  @include lw-1(background);
}
.el {
  @include lw-2(background);
}
.el {
  @include lw-3(background);
}
{% endcode %}
{% enddemo %}

#### Very Exclusive

**Not Defined Yet**

#### Littlewoods Ireland

**Not Defined Yet**