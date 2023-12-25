"use client";
import {useCallback} from "react";
import {SearchSelect, SearchSelectItem} from "@tremor/react";
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

interface Props{
    projects:{key:string,name:string,qualifier:string,project:string}[];
    currentProj?:string;
}

export function MySelect({projects, currentProj}:Props) {

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
        router.push(pathname + '?' + createQueryString('project', value));
    }

    if(currentProj==undefined){
        currentProj="Select a project...";
    }

    return (
        <>
            <div className="w-72 mb-10">
                <SearchSelect onValueChange={(value)=>handleSelection(value)} placeholder={currentProj}>
                    {projects.map((project, i)=>{
                        return(
                            <SearchSelectItem value={project.name} key={i}>
                                {project.name}
                            </SearchSelectItem>
                        );
                    })}
                </SearchSelect>
            </div>
        </>
    );
}