import React, { useState } from 'react'

const UnKnownCard = ({pokemon}) => {
    const [visible, setVisible] = useState(false)
    return (
        pokemon !== null ?
            <div key={pokemon.id}>
                <div className='Unknown' style={{backgroundColor: "#676767"}}>
                <img className='UnknownCardImage' src={"https://i0.wp.com/www.alphr.com/wp-content/uploads/2016/07/whos_that_pokemon.png?fit=1920%2C1080&ssl=1"} alt=''></img>
                <h2 className='cardTitle'>Unknown</h2>
                </div>
            </div> : null
    )
}

export default UnKnownCard;