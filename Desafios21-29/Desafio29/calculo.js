function test (cant) {
    let algo = cant
    console.log(algo)
    return algo
}

process.on('message', hijo => {
    process.send(test(cant))

    let objNumeros = {}
    const numRandom = () => parseInt(Math.random()*100) +1
    let cantidad = cant || 10;
    for (let i=0; i < cantidad; i++){
        let num = numRandom()
        console.log('algo')
        if (!objNumeros[num]) {
            objNumeros[num] = 1
        } else {
            objNumeros[num]++
        } return objNumeros
    } 
    
    console.log(objNumeros)
    
    // let objNumeros = {}
    // const numRandom = () => parseInt(Math.random()*100) +1;
    
})


