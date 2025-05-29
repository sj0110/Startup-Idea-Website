// import { Posts } from '@/app/types/page'
import { formatDate } from '@/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author }

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    return (
        <li key={post._id} className='startup-card group'>
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDate(new Date(post._createdAt))}
                </p>
                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-primary' />
                    <span className='text-16-medium'>{post.views}</span>
                </div>
            </div>
            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${post.author?._id}`}>
                        <p className="text-16-medium line-clamp-1">{post.author?.name}</p>
                    </Link>
                    <Link href={`/startup/${post._id}`}>
                        <h3 className='text-26-semibold line-clamp-1'>{post.title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${post.author?._id}`}>
                    <Image src={post.author?.image || '/default-user.png'} alt={post.author?.name || 'Startup Image'} className='card_image rounded-full' width={60} height={60}/>
                </Link>
            </div>
            <Link href={`/startup/${post._id}`}>
                <p className='startup-card_desc'>{post.description}{post.description}</p>
                <Image src={post.image || '/placeholder.png'} alt={post.category || 'Startup Image'} width={1000} height={1000} className='startup-card_img'/>
            </Link>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${post.category?.toLowerCase()}`}>
                    <p className="text-16-medium">{post.category}</p>
                </Link>
                <Button className='startup-card_btn'>
                    <Link href={`/startup/${post._id}`}>Details</Link>
                </Button>
            </div>

            {/* <img src={post.image} alt={post.title} className='card_image' />
            <h2 className='card_title'>{post.title}</h2>
            <p className='card_description'>{post.description}</p>
            <a href={post.link} className='card_link'>Read more</a> */}
        </li>
    )
}

export default StartupCard
