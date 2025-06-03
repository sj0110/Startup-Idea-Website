'use client'
import Form from 'next/form'
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import z from 'zod'
import { useToast } from '@/hooks/use-toast'
import router, { useRouter } from 'next/router'
import { createPitch } from '@/action'

const StartupForm = () => {

    const handleSubmit = async (state: any, formData: FormData) => {
        try{
            const formValues = {
                title: formData.get('title'),
                description: formData.get('description'),
                category: formData.get('category'),
                link: formData.get('link'),
                pitch
            }

            // Validate form data against the schema
            await formSchema.parseAsync(formValues);

            console.log(formValues);

            const result = await createPitch(state, formData, pitch);
            console.log(result);

            if(result.status === 'SUCCESS' && ' _id' in result) {
                toast({
                    title: 'Startup Submitted',
                    description: 'Your startup idea has been successfully submitted!',
                    variant: 'default',
                });
                router.push(`/startup/${(result as unknown as { _id: string })._id}`);
            }
            return result;
        }
        catch(err){
            if(err instanceof z.ZodError) {
                const fieldErrors = err.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);

                toast({
                    title: 'Validation Error',
                    description: 'Please check the form fields for errors.',
                    variant: 'destructive',
                });

                return {
                    ...state,
                    error: 'Validation failed. Please check the form fields.',
                    status: 'ERROR',
                };
            }

            toast({
                title: 'Unexpected Error',
                description: 'An unexpected error occurred. Please try again later.',
                variant: 'destructive',
            });

            return {
                ...state,
                error: 'An unexpected error occurred. Please try again later.',
                status: 'ERROR',
            }
        }
    }

    const mdStr = `# Startup Pitch \n## This is a H2  \n###### This is a H6`;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState(mdStr);
    const { toast } = useToast();
    // const router = useRouter();

    const [state, dispatch, isPending] = useActionState(handleSubmit, { 
        error: '',
        status: 'INITIAL',
    });
    
    return (
        <Form action={dispatch} className='startup-form flex flex-col gap-4 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md'>
            <div>
                <label htmlFor="title" className='startup-form_label'>Title</label>
                <Input id='title' name='title' className='startup-form_input' required placeholder='Startup Title' />
                {errors.title && <p className='text-red-500 text-sm'>{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className='startup-form_label'>Description</label>
                <Textarea id='description' name='description' className='startup-form_textarea' required placeholder='Startup Description' />
                {errors.description && <p className='text-red-500 text-sm'>{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className='startup-form_label'>Category</label>
                <Input id='category' name='category' className='startup-form_input' required placeholder='Startup Category (Tech, Health, Education ...' />
                {errors.category && <p className='text-red-500 text-sm'>{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className='startup-form_label'>Image URL</label>
                <Input id='link' name='link' className='startup-form_input' required placeholder='Startup Image URL' />
                {errors.link && <p className='text-red-500 text-sm'>{errors.link}</p>}
            </div>

            <div data-color-mode='light'>
                <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value ?? '')}
                    id='pitch'
                    preview='edit'
                    height={300}
                    style={{
                        borderRadius: 20,
                        overflow: 'hidden',
                    }}
                    previewOptions={{
                        disallowedElements: ['style', 'img', 'video', 'audio'],
                    }}
                    textareaProps={{
                        placeholder: 'Briefly describe your startup idea, its mission, and what makes it unique. Use Markdown syntax for formatting.',
                        style: {
                            fontSize: '14px',
                            lineHeight: '1.6',
                        }
                    }}
                />
                {errors.pitch && <p className='text-red-500 text-sm'>{errors.pitch}</p>}
            </div>

            <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit Startup'}
                <Send className="size-6 ml-2"/>
            </Button>
        </Form>
    )
}

export default StartupForm
