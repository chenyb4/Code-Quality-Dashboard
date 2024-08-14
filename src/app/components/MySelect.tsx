'use client';

import { useCallback } from 'react';
import { SearchSelect, SearchSelectItem } from '@tremor/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  projects:{ key:string, name:string, qualifier:string, project:string }[];
  currentProj?:string;
}

export const MySelect = ({ projects, currentProj }:Props) => {
  let currentProjText:string | undefined = currentProj;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleSelection = (value:string) => {
    router.push(`${pathname}?${createQueryString('project', value)}`);
  };

  if (currentProj === undefined || currentProj === '') {
    currentProjText = 'Select a project...';
  }

  return (
    <div className="mb-10 w-72">
      <SearchSelect onValueChange={(value) => handleSelection(value)} placeholder={currentProjText}>
        {projects.map((project, i) => (
          <SearchSelectItem value={project.key} key={i}>
            {project.name}
          </SearchSelectItem>
        ))}
      </SearchSelect>
    </div>
  );
};
