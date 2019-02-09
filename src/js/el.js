function isPromise(x) {
  return x.constructor.name.toLowerCase() === 'promise'
}

function el(elem, ...children) {
  let nodeDefinition = elem.split('.')
  let node = nodeDefinition[0];
  if (node.trim() === '') {
    node = 'div'
  }
  let classes = nodeDefinition.splice(1).join(' ');
  const element = document.createElement(node);
  element.attr('class', classes);
  for (const child of children) {
    if (child instanceof Node) {
      element.appendChild(child);
    } else if (isPromise(child)) {
      child.then((res) => element.appendChild(res))
    } else if (child) {
      element.innerHTML += child;
    }
  }
  return element;
}

module.exports = el;