import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { formatViews } from '@/utils'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'

const View = async ({ id }: { id: string }) => {

    const {views : totalViews} = await client.withConfig({useCdn:false}).fetch(STARTUP_VIEWS_QUERY, { id });

    // Todo : Update views count on the server side
    after( async () => {
        await writeClient.patch(id).set({views: totalViews + 1}).commit();
    })
    
    
    return (
        <div className='view-container'>
            <div className="absolute -top-0 -right-2"><Ping/></div>
            <p className="view-text">
                <span className="font-black">{formatViews(totalViews)}</span>
            </p>
        </div>
    )
}

export default View
