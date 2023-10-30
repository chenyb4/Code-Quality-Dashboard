import Image from 'next/image'



async function getData(){
  const res=await fetch('https://dog.ceo/api/breeds/list/all');

  if(!res.ok){
    throw new Error('Failded to fetch');
  }

  return res.json();
}

export default async function Home() {

  const data = await getData();


  console.log(data);
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

      </main>
  )
}
