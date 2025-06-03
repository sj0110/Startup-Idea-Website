import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import UserStartups from '@/components/UserStartups';

export const experimental_ppr = true

const page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;
    const session = await auth();
    // console.log('session', session); 
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
    // console.log('user', user);
    // console.log(session?.id, user.id);
    if (!user) return notFound();

    return (
        <>
            <section className="profile_container">
                <div className="profile_card">
                    <div className="profile_title">
                        <h3 className="text-24-black uppercase text-center line-clamp-1">
                            {user?.name}
                        </h3>
                    </div>
                    <Image
                        src={user.image}
                        alt={`${user?.name}.img`}
                        width={220} height={220}
                        className='profile_image'
                    />
                    <p className="text-30-extrabold mt-7 text-center">
                        @{user?.username}
                    </p>
                    <p className="mt-1 text-center text-14-normal">
                        {user?.bio || 'No bio available.'}
                    </p>
                </div>
                <div className="flex-1 flex flex-col gap-5 lg:mt-5">
                    <p className="text-30-bold">
                        {session?.id === user._id ? 'Your Pitches' : `${user.name}'s Pitches`}
                    </p>

                    <ul className='card_grid-sm'>
                        {/* TODO: ADD USER STARTUPS */}
                        <UserStartups id={id} />
                    </ul>
                </div>
            </section>
        </>
    )
}

export default page
