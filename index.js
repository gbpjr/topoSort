const express = require('express')
const app = express()

const dependencies = {
  mod0: [],
  mod1: [],
  mod2: ['mod1'],
  mod3: ['mod0'],
  mod4: [],
  mod5: ['mod3'],
  mod6: ['mod2', 'mod4', 'mod5'],
  mod7: ['mod5', 'mod6']
}

function tsort(edges) {
  let nodes = {}, sorted = [], visited = {}

  let Node = function (id) {
      this.id = id
      this.afters = []
  }

  edges.forEach( (v)=> {
      let from = v[0], to = v[1]
      if (!nodes[from]) nodes[from] = new Node(from)
      if (!nodes[to]) nodes[to] = new Node(to)
      nodes[from].afters.push(to)
  })

  Object.keys(nodes).forEach(function visit(idstr, ancestors) {
      let node = nodes[idstr],id = node.id

      if (visited[idstr]) return
      if (!Array.isArray(ancestors)) ancestors = []

      ancestors.push(id)
      visited[idstr] = true
      node.afters.forEach(function (afterID) {
          if (ancestors.indexOf(afterID) >= 0)  
              throw new Error('closed chain : ' + afterID + ' is in ' + id)
          visit(afterID.toString(), ancestors.map(function (v) { return v }))
      })
      sorted.unshift(id)
  })

  return sorted
}


const createEdges = (dep) => {
  let result = []
  Object.keys(dep).forEach(key => {
      dep[key].forEach(n => {
          result.push([n, key])
      })
  })
  return result
}

const list = createEdges(dependencies)
console.log(tsort(list))

app.listen(3000, () => {

})