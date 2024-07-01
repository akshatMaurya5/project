import React, { useState } from 'react'


export const Form: React.FC = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    function handleSubmit(event: any) {

        event.preventDefault()
        console.log(`Name: ${name}, Description: ${description}`)
        setName('')
        setDescription('')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name}
                        onChange={(e) => { setName(e.target.value) }} />

                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea name="" id="" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                </div>

                <div>

                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}