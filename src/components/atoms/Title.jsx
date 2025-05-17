import React from 'react';

export default function Title({ cn , title1 , title2}) {
    return (
        <p className={` ${cn} flex gap-1 items-center text-[#051959] text-base !mb-[10px]`}>
            <svg width='4' height='27' viewBox='0 0 4 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M0.5 3C0.5 1.34315 1.84315 0 3.5 0V24C3.5 25.6569 2.15685 27 0.5 27V3Z' fill='#FCA120' />
            </svg>
            {title1} <span className='text-[var(--second)] '> {title2} </span>
        </p>
    );
}
