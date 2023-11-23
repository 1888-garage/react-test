import React, { useMemo, useState } from 'react'

const LeftContent = ({path}) => {
    const paths = useMemo(() => {
        return path;
      }, [path]);

    return (
        <>
        { paths === 'pome' ? '': <div
            className="border pb-2 lg:pb-0 w-full lg:max-w-sm px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap"
        >
            <a
                href="/"
                className="bg-red-200 w-full h-24 min-h-0 min-w-0 mb-4 flex items-center justify-center"
            >
                <h1>Omar Khayyam</h1>
            </a>
            <a
                href="/am"
                className="bg-red-200 w-full h-24 min-h-0 min-w-0 mb-4 flex items-center justify-center"
            >
                <h1>የፊደል ገበታ</h1>
            </a>
        </div>}
        </>
    )
}

export default LeftContent