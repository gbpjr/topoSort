/*
  @author Geovane Barbosa Pereira Júnior <geovanebpjr@gmail.com>

  Topologic sorting algorithm made in NodeJS + Express. 
  Each index of dependencies is meant to be a module [0ˆ7].
  
  In-degrees are basically the amount of dependencies that each vertex has.
*/

const express = require('express')
const app = express()

// Main function
function topoSort(){
  const dependencies = [
    [],         // module 0
    [],         // ...
    [1],        // ...
    [0],        // ...
    [],         // ...
    [3],        // ...
    [2, 4, 5],  // ...
    [5, 6]      // module 7
  ]

  let inDegrees = mapInDegrees(dependencies)
  let queue = generateQueue(inDegrees)
  let list = []
  let totalZero = false

  while(totalZero == false){
    let indexes = search(dependencies, queue)
    for(let idx of indexes){
      inDegrees[idx]--
      if(inDegrees[idx] === 0){
        queue.push(idx)
      }
      list.push(queue[0])
    }
    queue.shift()
    totalZero = checkTotalZero(inDegrees)
  }
  list.push(dependencies.length-1)
  return Array.from(new Set(list))

}

// Checks if every element of in-degrees is 0
function checkTotalZero(inDegrees){
  for(let item of inDegrees){
    if(item !== 0)
      return false
  }
  return true
}

// Search in-degrees' index to be subtracted
function search(dependencies, queue){
  let indexes = []
  for(let row of dependencies){
    for(let item of row){
      if(item === queue[0]){
        indexes.push(dependencies.indexOf(row))
      }
    }
  }
  return indexes
}

// Generates in-degrees
function mapInDegrees(dependencies){
  let inDegrees = []
  for(let i = 0; i < dependencies.length; i++){
    inDegrees.push(dependencies[i].length)
  }
  return inDegrees
}

// Generates queue
function generateQueue(inDegrees){
  let queue = []
  for(let i = 0; i < inDegrees.length; i++){
    if(inDegrees[i] === 0)
      queue.push(i)
  }
  return queue
}

console.log(topoSort())
app.listen(3000, () => {})