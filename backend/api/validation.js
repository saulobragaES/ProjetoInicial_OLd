module.exports = app => {
  function existsOrError(value, msg) {
      if(!value) { 
        console.log('Pr ' + msg)
        throw msg
      }  
     
      if(Array.isArray(value) && value.length === 0) { 
        console.log('Oh ' + msg)
        throw msg
      }
     
      if(typeof value === 'string' && !value.trim()) {
        console.log('Opa! ' + msg) 
        throw msg
      }  
  }
  
  function notExistsOrError(value, msg) {
      try {
          existsOrError(value, msg)
      } catch(msg) {
          return
      }
      console.log('final ' + msg)
      throw msg
  }
  
  function equalsOrError(valueA, valueB, msg) {
      if(valueA !== valueB) throw msg
  }

  return { existsOrError, notExistsOrError, equalsOrError }
}