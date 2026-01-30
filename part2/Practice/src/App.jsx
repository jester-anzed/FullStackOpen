import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {

    const Names = [
        { name: 'Marc', last:'Ismael' },
        { name: 'Jes', last: 'Ismael'},
        { name: 'Mac', last: 'Ismael'},
        { name: 'Reg', last: 'Taguinod'},
        { name: 'Kassandra', last: 'Taguinod'},
    ]

    const nameCor = (last) => last.last === "Ismael"
    
    const lastName = Names.filter(nameCor)
    const nonLast = Names.filter(last => !nameCor(last))

    console.log(lastName)
    console.log(nonLast)

    const prac = Names.map(function(name) {
        return name.name + "'s last name is " + name.last
    })

    console.log(prac)

}

export default App
