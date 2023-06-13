import React, {useEffect, useState} from "react";
import CityData from "@/interfaces/City";
import Link from "next/link";

const MIN_CITY_CHARS:number = 3;
export default function SearchBox() {
    const [inputValue, setInputValue] = useState("");
    const [cities, setCities] = useState<CityData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/city/${inputValue}`);
                const data = await response.json();
                console.log(data)
                setCities(data.cities);
            } catch (error) {
                console.error(error);
            }
        }

        if (inputValue.length >= MIN_CITY_CHARS) {
            fetchData();
        }
    }, [inputValue])
    return (
        <>
            <input
                className={"bg-gray-200 p-2 rounded-lg w-64"}
                type={"text"}
                placeholder={"Enter city name"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {inputValue.length >= MIN_CITY_CHARS && (
                <ul>
                    {cities.map((city) => (
                        <li key={city.id}>
                            <Link href={`/detail/${city.id}`}>
                                {city.name}
                                {city.state ? `, ${city.state}` : ""}
                                ({city.country})
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

        </>
    )
}