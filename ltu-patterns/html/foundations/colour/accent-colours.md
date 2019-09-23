---
title: Accents
layout: "sample-nowrap"
colors:
    - name: Pantone Cool Gray 11
      hex: "#53565a"
      rgb: rgba(83,86,90)
    - name: Pantone Cool Gray 9
      hex: "#979999"
      rgb: rgba(117,120,123)
    - name: Pantone Cool Gray 7
      hex: "#979999"
      rgb: rgba(151,153,153)
    - name: White
      hex: "#ffffff"
      rgb: rgba(255,255,255)
---

<style>
    .set {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -1rem;
        padding: 0;
        list-style: none;
    }

    li {
        flex: 1 0 20%;
        margin: 1rem;
    }

    .color {
        height: 200px;
        color: white;
        border: 1px solid #ddd;
        margin-bottom: 1rem;
        overflow: visible;
    }

    p {
        margin: 0;
    }
</style>


<ul class="set">
    {% for item in page.colors %} 
        <li>
            <div class="color" style="background:{{ item.hex }}" data-sketch-color="{{ item.hex }}"></div> 
            
            <p><strong>{{ item.name }}</strong></p>
            
            {% if item.hex %}<p>{{ item.hex }}</p>{% endif %}
            
            {% if item.rgb %}<p>{{ item.rgb }}</p>{% endif %}
        </li>
    {% endfor %}
</ul>