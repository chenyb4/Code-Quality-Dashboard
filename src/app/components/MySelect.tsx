'use client';

import { useCallback } from 'react';
import { SearchSelect, SearchSelectItem } from '@tremor/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  projects:{ key:string, name:string, qualifier:string, project:string }[];
  currentProj?:string;
}

export const MySelect = ({ projects, currentProj }:Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  let currentProject = currentProj;

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

  if (currentProject === undefined || currentProject === '') {
    currentProject = 'Select a project...';
  }

  return (
    <div className="mb-10 w-72">
      <SearchSelect onValueChange={(value) => handleSelection(value)} placeholder={currentProject}>
        {projects.map((project, i) => (
          <SearchSelectItem value={project.name} key={i}>
            {project.name}
          </SearchSelectItem>
        ))}
      </SearchSelect>
    </div>
  );
};
