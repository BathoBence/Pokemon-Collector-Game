import {useState, useEffect} from 'react'
const url = "https://pokeapi.co/api/v2/location"

export default function Home({handleEncounter}) {
    const [locations, setLocations] = useState([])
    const [page, setPage] = useState('locations')
    
    useEffect(()=>{
        async function getLocations() {
            const response = await fetch(url);
            const locationsObject = await response.json();
            const locations = locationsObject.results;
            
            setLocations(locations)
        }

        getLocations()
    },[])

    async function locationClickHandler(url) {
        const response = await fetch(url);
        const areasObject = await response.json();
        const areas = areasObject.areas;
            setLocations(areas)
            setPage('areas')
    }
    function handleAreasClick(url) {
        handleEncounter(url)
    }

    return (
        <div className='homePageContainer'>
            <div className='selectText'>Pick your poison!</div>
            <div className='locationsContainer'>

                {page === 'locations' && locations.map(location=>{
                    return(
                        <div key={location.url} onClick={()=>locationClickHandler(location.url)}className='locationCard' >
                            {location.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                        </div>
                    )
                })}

                {page === 'areas' && 
                    (
                        locations.length===0 ? 
                        (<div>No Bitches?</div>):
                        (   
                            locations.map((areas,index)=>{

                                return(
                                    <div onClick={()=>handleAreasClick(areas.url)} className='locationCard' id={areas.name} key={index}>
                                        <div>{areas.name}</div>
                                    </div>
                                )
                            })

                        )
                    )
                }

            </div>
        </div>
    )
}
