---
status: draft
menu: 2

title: Design
text: How to design for the design system
---

## Text

The Basefont size for text is 16px for viewports < 1440px and 18px for viewports > 1440px.

This results in the following font sizes:


| Tag             | Font                 | Size / Line height \(< 1440px viewport\) | Size / Line height \(>1440px viewport\) | Weight | Margin (em is multiple of font size) |
|-----------------|----------------------|------------------------------------------|-----------------------------------------|--------|--------------------------------------|
| h1              | Roboto               | 39.0625px / 46px                         | 57.93px / 65px                          | Medium | 1em top and bottom                   |
| h2              | Roboto Slab          | 31.25px / 37px                           | 35.15625px / 42px                       | Normal | 2em top                              |
| h3              | Roboto               | 25px / 30px                              | 28.125px / 33px                         | Medium | 2em top                              |
| h4              | Roboto               | 20px / 24px                              | 22.5px / 27px                           | Medium | 2em top                              |
| h5              | Roboto               | 16px / 24px                              | 18px / 26px                             | Medium | 2em top                              |
| h6              | Roboto               | 12.8px / 19px                            | 14.4px / 20px                           | Black  | 2em top                              |
| Everything else | Roboto               | 16px / 24px                              | 18px / 26px                             | Normal | 1em top                              |


## 0.25rem soft grid

Using multiples of 0.25rem for all sizes, margins and padding effectively creates a design that aligns with a 0.25rem grid.

For viewports < 1440px, 0.25rem equals 4px. For viewports > 1440px 0.25rem equals 4.5px.