import SearchForm from '@/components/SearchForm';
import React from 'react'
// import { Posts } from '../types/page';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '@/auth';


const Home = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {

    const query = (await searchParams).query;
    // ✅ Only include `search` param if query is present
    const params = { search: query || null };

    const session = await auth();
    // console.log((session as any)?.id);

    
    // const posts = await client.fetch(STARTUPS_QUERY);
    const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
    // console.log(posts); 
    // console.log(JSON.stringify(posts, null, 2));

    // const posts: Posts[] = [
    //     {
    //         _id: 1,
    //         title: 'Pitch Your Startup',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //         image: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357',
    //         link: '#',
    //         views: 100,
    //         author: {
    //             _id: 1,
    //             name: 'John Doe',
    //         },
    //         category: 'Business',
    //         _createdAt: new Date(),
    //         _updatedAt: new Date(),
    //     },
    //     {
    //         _id: 2,
    //         title: 'Connect with Entrepreneurs',
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //         image: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357',
    //         link: '#',
    //         views: 200,
    //         author: {
    //             _id: 2,
    //             name: 'Ron Jacob',
    //         },
    //         category: 'Technology',
    //         _createdAt: new Date(),
    //         _updatedAt: new Date(),
    //     }
    // ]

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">
                    Pitch Your Startup,
                    Connect with Entrepreneurs
                </h1>
                <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
                <SearchForm key={query || 'empty'} query={query} />
            </section>
            <section className="section_container">
                <p className='text-30-semibold'>
                    {query ? `Search results for "${query}"` : 'Discover the best startups'}
                </p>
                <ul className='mt-7 card_grid'>
                    {posts.length > 0 ?
                        posts.map((post: StartupTypeCard) => (
                            <StartupCard key={post?._id} post={post} />
                        )) :
                        <p className='text-20-semibold'>No results found</p>
                    }
                </ul>
            </section>
            <SanityLive />
        </>
    );
}

export default Home
