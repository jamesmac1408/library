---
"name": "Secondary Button"
---

* TOC
{:toc}

## Overview

The Secondary Button should be used for buttons that are critical to the user completing a journey, but not the final action. These can be used as many times as necessary within a screen.

## States

Transitions between states are animated, using with ease-in-ease-out over 0.3s.

{% demo %}
{% output %}
<div class="col--3">
    <button class="btn-wrapper btn-secondary">
        <div class="btn">
            <span class="btn-text">Button</span>
        </div>  
    </button>
</div>
<div class="col--6">
    <button class="btn-wrapper btn-secondary">
        <div class="btn">
            <span class="btn-text">Button</span>
        </div>  
    </button>
</div>
{% endoutput %}
{% code %}
<button class="btn-wrapper btn-secondary">
    <div class="btn">
        <span class="btn-text">...</span>
    </div>  
</button>
{% endcode %}
{% enddemo %}