---
"name": "Radio Buttons"
---

* TOC
{:toc}

{% panel Readme %}

  coming soon

{% endpanel %}

{% demo %}
{% output %}
<div class="radiobuttons-container">
  <div>
    <form action="">
      <label for="very-demo" class="radioButton">
        <input type="radio" name="brand" value="very" id="very-demo">
        Very
      </label>
      <br>
      <label for="lw-demo" class="radioButton">
        <input type="radio" name="brand" value="lw" id="lw-demo" checked>
        Littlewoods
      </label>
      <br>
      <label for="ve-demo" class="radioButton">
        <input type="radio" name="brand" value="ve" id="ve-demo" disabled>
        Very Exclusive
      </label>
      <br>
    </form>
    <label for="lwi-demo" class="radioButton">
      <input type="radio" name="brand" value="lwi" id="lwi-demo" checked disabled>
      Littlewoods Ireland
    </label>
  </div>
</div>  
{% endoutput %}
{% tabs %}
{% tab %}html{% endtab %}
{% endtabs %}
{% code html %}
  <!-- default -->
  <label for="very" class="radioButton">
    <input type="radio" name="brand" value="very" id="very">
    Very
  </label>
  <!-- disabled -->
  <label for="ve" class="radioButton">
    <input type="radio" name="brand" value="ve" id="ve" disabled>
    Very
  </label>
  <!-- disabled & checked -->
  <label for="ve" class="radioButton">
    <input type="radio" name="brand" value="ve" id="ve" checked disabled>
    Very
  </label>
{% endcode %}
{% enddemo %}