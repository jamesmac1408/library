---
"name": "Colour"
---

# Colour

## UI Colours

The main UI colors are used for action buttons, alert messages, and form elements.

#### Primary Green
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