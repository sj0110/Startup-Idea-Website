'use client'
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import { Button } from './ui/button';

const SearchFormResetButton = () => {
    const router = useRouter();

    const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent default reset scrolling

        // Manually clear the input field(s)
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if (form) {
            const input = form.querySelector('input[name="query"]') as HTMLInputElement;
            if (input) input.value = '';
        }

        // Replace history instead of push to avoid scroll jump
        router.replace('/', { scroll: false });
    };

    return (
        <Button
            type='button'
            onClick={handleReset}
            className='search-btn text-white'
        >
            <X />
        </Button>
    );
};

export default SearchFormResetButton;
