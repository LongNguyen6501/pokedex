import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

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

            <div className="image-container">
                <section>
                    <Image
                        src={queryResult.data.sprites.other['official-artwork'].front_default}
                        height={400}
                        width={400}
                        alt="Pokemon Image"
                    />

                    <div className="types-container">
                        <h2>type</h2>
                        <ul>
                            {queryResult.data.types.map(types => {
                                return (
                                    <li key={types.type.name}>
                                        <section className="types">
                                            {types.type.name}
                                        </section>
                                    </li>

                                )
                            })}
                        </ul>
                    </div>
                </section>

                <section className="halve-screen">
                    <section>
                        <h2>Stats</h2>
                        <ul>
                            {queryResult.data.stats.map(stats => {
                                return (
                                    <li key={stats.stat.name}>
                                        {stats.stat.name}: {stats.base_stat}
                                    </li>
                                )
                            })}
                        </ul>

                    </section>

                    <section>
                        <h2>Pokedex Data</h2>
                        <ul>
                            <li>
                                ID: {queryResult.data.id}
                            </li>
                            <li>
                                Height: {queryResult.data.height / 10} m
                            </li>
                            <li>
                                Weight: {queryResult.data.weight / 10} kg
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
                </section>
            </div>

            {/* <section>
                <h2>Moves</h2>
                <ul>
                    {queryResult.data.moves.map(moves => {
                        return (
                            <li key={moves.move.name}>
                                {moves.move.name}
                            </li>
                        )
                    })}
                </ul>
            </section> */}

            <Link href="/">
                <button>Home</button>
            </Link>

        </div>
    )
}