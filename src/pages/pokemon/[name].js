import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export default function PokemonPage() {
    const router = useRouter()
    const pokemonName = router.query.name

    const queryResult = useQuery({
        queryKey: [`pokemon/${pokemonName}`],
        queryFn: async function () {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            const data = await response.json()
            return data
        }
    })
    if (queryResult.status === 'pending') { return <p>Loading...</p> }
    if (queryResult.status === 'error') { return <p>Failed to fetch data</p> }
    return (
        <div>
            <h1>{queryResult.data.name}</h1>
            <ul>
                {queryResult.data.abilities.map(ability => {
                    return (
                        <li key={ability.ability.name}>
                            {ability.ability.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}