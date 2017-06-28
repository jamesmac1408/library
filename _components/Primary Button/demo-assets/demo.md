---
"name": "Primary Button"
"description": ""
---

* TOC
{:toc}

## Overview

The Primary Button should only be used once per screen. 
It should always be the main call to action that continues or completes the journey.

## States

Transitions between states are animated, using with ease-in-ease-out over 0.3s.

{% demo %}
{% output %}
<div class="col--3">
    <button class="btn-wrapper btn-primary">
        <div class="btn">
            <span class="btn-text">Button</span>
        </div>  
    </button>
</div>
<div class="col--6">
    <button class="btn-wrapper btn-primary">
        <div class="btn">
            <span class="btn-text">Button</span>
        </div>  
    </button>
</div>
{% endoutput %}
{% code %}
<button class="btn-wrapper btn-primary">
    <div class="btn">
        <span class="btn-text">...</span>
    </div>  
</button>
{% endcode %}
{% enddemo %}

