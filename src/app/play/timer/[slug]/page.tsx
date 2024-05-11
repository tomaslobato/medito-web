import FakePlayer from "@/components/FakePlayer";

export default function Page({ params }: { params: { slug: string } }) {    
    return <FakePlayer time={JSON.parse(params.slug)}/>
}