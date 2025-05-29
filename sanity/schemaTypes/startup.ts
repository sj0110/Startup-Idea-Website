import { defineField, defineType } from 'sanity';
import { UserIcon } from "lucide-react";

export const startup = defineType({
    name: 'startup',
    title: 'Startup',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title'
            }
        }),
        defineField({
            name: 'author',
            type: 'reference',
            to: { type: 'author' },
        }),
        defineField({
            name: 'views',
            type: 'number',
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'category',
            type: 'string',
            validation : (Rule) => Rule.required().min(2).max(20).error('Category is required'),
        }),
        defineField({
            name: 'image',
            type: 'url',
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name: 'pitch',
            type: 'markdown',
        }),
    ],
    preview: {
        select: {
            title: 'title',
        }
    }
});




