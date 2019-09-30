---
title: "Sketch pattern exports"
status: draft
layout: "sample"
---

{%- for pattern in site.pages -%}
    {%- if pattern.url contains "ltu-patterns/html" -%}
        {% assign sketch = ' data-sketch-symbol="' | append: pattern.url | remove: '/ltu-patterns/html/' | remove: '.html' | append: '">' %}

        {{ pattern.content | replace_first: '>', sketch }}
    {%- endif -%}
{%- endfor -%}