# Universes

> **<u style="color: #FFAAAA">Definition</u> <b>universe</b>:** a universes are a collection of courses
> connected by functional dependencies in a graph. Every universe is a single JSON file named `ID.json`.

Every universe contains a list of all the courses to display along with their coordinates
in the `(x,y)` plane. It also contains a list of pairwise dependencies between courses IDs.

```json
{
  "title": "Rendering",
  "courses": [
    {
      "name": "Linear Algebra",
      "id": "linearalgebra",
      "x": 280,
      "y": 150
    },
    {
      "name": "Calculus",
      "id": "calculus",
      "x": 280,
      "y": 280
    },
    {
      "name": "Physical Rendering",
      "id": "physicalrendering",
      "x": 520,
      "y": 220
    },
    {
      "name": "Computer Rendering",
      "id": "computerrendering",
      "x": 520,
      "y": 360
    },
    {
      "name": "Vulkan",
      "id": "vulkan",
      "x": 800,
      "y": 280
    }
  ],
  "dependencies": [
    {
      "from": "linearalgebra",
      "to": "physicalrendering"
    },
    {
      "from": "calculus",
      "to": "physicalrendering"
    },
    {
      "from": "computerrendering",
      "to": "vulkan"
    },
    {
      "from": "physicalrendering",
      "to": "vulkan"
    }
  ]
}
```