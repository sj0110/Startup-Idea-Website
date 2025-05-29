import Form from 'next/form'
import React from 'react'
import SearchFormResetButton from './SearchFormResetButton';
import { SearchIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

const SearchForm = ({query} : {query?:string }) => {

    return (
        <Form action='/' scroll={false} className="search-form flex justify-center items-center">
            <input
                name='query'
                type='text'
                defaultValue={query}
                placeholder='Search startup'
                className='search-input'
            />
            <div className='flex gap-2'>
                {query && <SearchFormResetButton/>}
                <Button
                    type='submit'
                    className='search-btn text-white'
                ><SearchIcon/></Button>
            </div>
        </Form>
    )
}

export default SearchForm
