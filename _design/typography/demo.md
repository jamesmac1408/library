---
"name": "Typography"
---

# Typography

Typography is set via scss mixins

## Heading 1

{% demo %}
{% output %}
<h1 class="el-1">Heading 1</h1>
{% endoutput %}
{% code scss %}
.el {
  @include heading-1();
}
{% endcode %}
{% enddemo %}

## Heading 2

{% demo %}
{% output %}
<h2 class="el-2">Heading 2</h2>
{% endoutput %}
{% code scss %}
.el {
  @include heading-2();
}
{% endcode %}
{% enddemo %}

## Heading 3

{% demo %}
{% output %}
<h3 class="el-3">Heading 3</h3>
{% endoutput %}
{% code scss %}
.el {
  @include heading-3();
}
{% endcode %}
{% enddemo %}

## Body

{% demo %}
{% output %}
<p class="el-4">
  You’ll find soft leather sofas, clean and contemporary cabinets and charming coffee tables in our range of living room furniture. Kit out your lounge in style with traditional bookshelves to display your favourite page-turners or a gorgeous wooden sideboard to store your DVDs. Choose from on-trend, highly functional furniture, decorative lamps, and super-comfy bean bags with our huge collection. And with some of the very best interior design brands on offer, including Catherine Lansfield, Graham & Brown and pieces from top celebrity designers like Fearne Cotton, there’s bound to be something to suit your taste.
</p>
{% endoutput %}
{% code scss %}
.el {
  @include body();
}
{% endcode %}
{% enddemo %}

## Meta

{% demo %}
{% output %}
<p class="el-5">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
</p>
{% endoutput %}
{% code scss %}
.el {
  @include meta();
}
{% endcode %}
{% enddemo %}











