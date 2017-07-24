---
"name": "Checkboxes"
---

* TOC
{:toc}

{% panel Readme %}

  coming soon

{% endpanel %}

{% demo %}
{% output %}
<div class="checkboxes-container">
  <div>
    <form action="">
      <label for="very-demo" class="checkbox">
        <input type="checkbox" name="brand" value="very" id="very-demo">
        Very
      </label>
      <br>
      <label for="lw-demo" class="checkbox">
        <input type="checkbox" name="brand" value="lw" id="lw-demo">
        Littlewoods
      </label>
      <br>
      <label for="ve-demo" class="checkbox">
        <input type="checkbox" name="brand" value="ve" id="ve-demo" checked>
        Very Exclusive
      </label>
      <br>
    </form>
    <label for="lwi-demo" class="checkbox">
      <input type="checkbox" name="brand" value="lwi" id="lwi-demo" checked>
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
  <label for="very" class="checkbox">
    <input type="checkbox" name="brand" value="very" id="very">
    Very
  </label>
  <!-- checked -->
  <label for="ve" class="checkbox">
    <input type="checkbox" name="brand" value="ve" id="ve" checked>
    Very
  </label>
{% endcode %}
{% enddemo %}