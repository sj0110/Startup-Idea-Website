'use server'
import { auth } from '@/auth';
import { pareseServerActionResponse } from './utils';
import slugify from 'slugify';
import { writeClient } from './sanity/lib/write-client';


export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string,
) => {
    const session = await auth();

    if (!session) return pareseServerActionResponse({
        status: 'ERROR',
        error: 'Unauthorized access. Please log in to submit a pitch.',
    });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form.entries()).filter(
            ([key]) => key !== 'pitch'
        ));

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug:{
                _type:'slug',
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const result = await writeClient.create({ _type: 'startup', ...startup });
        return pareseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS',
        })
    } catch (err) {
        console.error('Error creating pitch:', err);
        return pareseServerActionResponse({
            status: 'ERROR',
            error: JSON.stringify(err),
        });
    }
}