A bunch of expectations and rules.

**Dom Selector**

- Always include the :nth-child at the last node. (because here it's very likely for changes to get to a state that's not clear)

**Editing**

- Elements with IDs should not be duplicatable
- cmd+z should undo changes

**AI**

- To find lists of elements that make sence to be replicated (list of DIVs that contain image and text), the algorithm should be like:
  Check on every element, if there are multiple children, (at least two) that have the same subdom (tag and classes).
- Find Sections: if there is a leven in which children are all below each other.
