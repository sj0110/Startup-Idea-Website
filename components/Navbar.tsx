import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { auth, signOut, signIn } from '@/auth'
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from 'lucide-react';

const Navbar = async () => {

    const session = await auth();
    // console.log(session)

    return (
        <header className="px-8 py-4 bg-white dark:bg-black-200 text-black dark:text-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/" className="flex flex-col justify-between gap-1 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
                    <Image src="/logo.png" width={40} height={40} alt="nextjsproject" />
                    <h1 className="text-sm sm:text-xl font-bold">
                        <span className="text-primary">NextJs</span>
                        <span className="text-black dark:text-white">Project</span>
                    </h1>
                </Link>

                {session && session.user ? (
                    <div className="flex items-center gap-4 font-semibold">
                        <Link href="/startup/create" className="hover:text-primary transition-colors">
                            <span className='max-sm:hidden'>Create</span>
                            <Plus className="size-6 sm:hidden cursor-pointer"/>
                        </Link>
                        <form
                            action={async () => {
                                'use server'
                                await signOut({ redirectTo: '/' })
                            }}
                        >
                            <Button
                                type="submit"
                                className="bg-primary text-white rounded-full hover:opacity-90 transition"
                            >
                                <span className='max-sm:hidden px-8 py-2'>Logout</span>
                                <LogOut className="size-6 sm:hidden text-white cursor-pointer"/>
                            </Button>
                        </form>
                        <Link href={`/user/${session?.id}`} className="flex items-center gap-2">
                            <Image
                                src={session.user.image || '/default-user.png'}
                                width={45}
                                height={45}
                                alt="user"
                                className="rounded-full border-4 border-primary"
                                title={session.user.name || 'User'}
                            />
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 font-semibold">
                        <form
                            action={async () => {
                                'use server'
                                await signIn('github')
                            }}
                        >
                            <Button
                                type="submit"
                                className="bg-primary text-white px-8 py-2 rounded-full hover:opacity-90 transition"
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar
