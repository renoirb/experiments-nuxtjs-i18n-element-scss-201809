export const visualizeConfig = config =>
  Object.keys(config).forEach(k => {
    if (['module'].includes(k) === false) {
      console.log(k, config[k])
    }
    if (k === 'module') {
      let module = config[k]
      Object.keys(module).forEach(m => {
        let prep = module[m]
        if (m === 'rules') {
          module[m].forEach((r, i) => {
            console.log()
            console.log(`config[${m}] ${i} =========================== `)
            Object.keys(r).forEach(rk => {
              if (rk === 'oneOf') {
                console.log(`config[${m}] ${i}: ${k} ${rk}`)
                r[rk].forEach((rrk, rrki) => {
                  const {
                    use = [], ...rest
                  } = rrk
                  console.log(`config[${m}] ${i}: ${k} ${rk} ${rrki}`, rest)
                  use.forEach((u, i) => console.log(` - use ${i}`, u))
                })
              } else {
                console.log(`config[${m}] ${i}: ${k} ${rk}`, r[rk])
              }
            })
            console.log()
          })
        } else {
          console.log(m, JSON.parse(JSON.stringify(prep)))
        }
      })
      console.log()
      console.log('========')
      console.log()
    }
  })
