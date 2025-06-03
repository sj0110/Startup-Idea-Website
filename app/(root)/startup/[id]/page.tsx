import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React, { Suspense } from 'react'
import Link from 'next/link';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';


const md = markdownit();

export const experimental_ppr = true

const StartupPage = async ({ params }: { params: Promise<{ id?: string }> }) => {

    const id = (await params).id;
    // console.log(id);

    /*
        Currently these request are made in sequential manner leading to time addition for both the requests.
        We can use Promise.all to make them in parallel, and it will be a good idea as we aren't using the result of the first query in the second query.

        const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
        const { select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'best-pitches' });

        In the updated code total time will be duration of the longer query, not the sum of both queries.
    */
    const [post, { select:editorPosts }] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'best-pitches' })
    ]);
    

    // console.log(post);
    if (!post) return notFound();
    const parsedContent = md.render(post?.pitch || '');


    if (!editorPosts) {
        console.error('Playlist not found. Check if the slug exists in the database.');
    } else {
        console.log('Playlist:', editorPosts);
    }

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{post?._createdAt}</p>
                <h1 className="heading">{post?.title}</h1>
                <p className="sub-heading !max-w-5xl">{post?.description}</p>
            </section>
            <section className="section_container">
                <Image src={post?.image} alt={post?.title} height={10000} width={10000} className='startup-card_thumbnail' />
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post?.author?._id}`} className="flex gap-2 items-center mb-3">
                            <Image src={post?.author?.image} alt={post?.author?.name} width={64} height={64} className="rounded-full drop-shadow-lg" />
                            <div>
                                <p className="text-20-medium">{post.author?.name}</p>
                                <p className="text-16-medium !text-black-300">@{post.author?.username}</p>
                            </div>
                        </Link>
                        <p className="category-tag">{post.category}</p>
                    </div>
                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                        <article className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />) :
                        <p className="no-result">No details provided</p>}
                </div>
                <hr className="divider" />

                {/* Editor Selected Startups */}
                {editorPosts && editorPosts.length > 0 && (
                    <div className='max-w-4xl mx-auto editor-selected-startups'>
                        <p className='text-30-semibold'>Editor Picks</p>
                        <ul className="mt-7 card_grid-sm">
                            {editorPosts.map((post: StartupTypeCard, index: number) => (
                                <StartupCard key={index} post={post} />
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            <Suspense fallback={<Skeleton className='view_skeleton' />}>
                <View id={id ?? ''} />  {/* Ensure id is not undefined */}
            </Suspense>
        </>
    )
}

export default StartupPage
