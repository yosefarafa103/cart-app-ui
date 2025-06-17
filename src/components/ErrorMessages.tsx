import React from 'react'

export default function ErrorMessages({ message }) {
    return (
        <span className="text-red-500 text-sm mt-2  font-semibold">
            {message}
        </span>
    )
}
