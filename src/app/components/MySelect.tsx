"use client";
import {useCallback} from "react";
import {SearchSelect, SearchSelectItem} from "@tremor/react";
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

interface Props{
    teams:{key:string,name:string,qualifier:string,project:string}[];
    defaultValue:string;
}

export function MySelect({teams,defaultValue}:Props) {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const handleSelection=(value:string)=>{
        console.log(value);
        router.push(pathname + '?' + createQueryString('project', value))
    }

    return (
        <>
            <div className="w-72 mb-10">
                <SearchSelect onValueChange={(value)=>handleSelection(value)} defaultValue={defaultValue}>
                    {teams.map((team,i)=>{
                        return(
                            <SearchSelectItem value={team.name} key={i}>
                                {team.name}
                            </SearchSelectItem>
                        );
                    })}

                </SearchSelect>
            </div>
        </>
    );
}