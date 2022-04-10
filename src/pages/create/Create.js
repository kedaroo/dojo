import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'

import './Create.css'

const categories = [
    {value: 'development', label: 'development'},
    {value: 'design', label: 'design'},
    {value: 'sales', label: 'sales'},
    {value: 'marketing', label: 'marketing'},
]

export default function Create() {

    const { documents } = useCollection('users')

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }

        
    }, [documents])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, details, dueDate, category.value, assignedUsers)
    }

    return (
        <div className='create-form'>
            <h2 className='page-title'>create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>project name:</span>
                    <input 
                        required
                        type='text'
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>project details:</span>
                    <textarea 
                        required
                        onChange={e => setDetails(e.target.value)}
                        value={details}
                    />
                </label>
                <label>
                    <span>set due date:</span>
                    <input
                        required
                        type='date'
                        onChange={e => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>project category:</span>
                    <Select 
                        options={categories}
                        onChange={option => setCategory(option)}
                    />
                </label>
                
                <label>
                    <span>assigned to:</span>
                    <Select 
                        options={users}
                        onChange={option => setAssignedUsers(option)}
                        isMulti
                    />
                </label>

                <button className='btn'>add project</button>

            </form>
        </div>
    )
}