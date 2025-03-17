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
        <div className="result-container">

            <h1 className="pokemon-name">{queryResult.data.name}</h1>

            <div className="section-container">
                <section>
                    <h2>Pokedex Data</h2>
                    <ul>
                        <li>
                            ID: {queryResult.data.id}
                        </li>
                        <li>
                            Height: {queryResult.data.height}
                        </li>
                        <li>
                            Weight: {queryResult.data.weight}
                        </li>
                    </ul>
                </section>
                <section>
                    <h2>Abilities</h2>
                    <ul>
                        {queryResult.data.abilities.map(abilities => {
                            return (
                                <li key={abilities.ability.name}>
                                    {abilities.ability.name} {abilities.is_hidden ? "(hidden)" : ""}
                                </li>
                            )
                        })}
                    </ul>
                </section>
                <section>
                    <h2>Training</h2>
                    <p>Base Experience: {queryResult.data.base_experience}</p>
                </section>

            </div>
        </div>
    )
}