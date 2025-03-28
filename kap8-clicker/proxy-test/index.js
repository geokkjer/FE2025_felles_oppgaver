const base = {
    foo: 0,
  }
  
  const handler = {
    get: (target, name) => {
      console.log(`Getting ${name}`)
      return target[name]
    },
    set: (target, name, value) => {
      console.log(`Setting ${name} to ${value}`)
      target[name] = value
      return true
    }
  }
  
  const proxy = new Proxy(base, handler)
  
  proxy.foo = proxy.foo + 1
  console.log(`Logging ${proxy.foo}`)