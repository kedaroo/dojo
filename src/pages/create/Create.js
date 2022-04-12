import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

import './Create.css'

const categories = [
    {value: 'development', label: 'development'},
    {value: 'design', label: 'design'},
    {value: 'sales', label: 'sales'},
    {value: 'marketing', label: 'marketing'},
]

export default function Create() {

    const { documents } = useCollection('users')
    const { user } = useAuthContext()
    const { addDocument, response } = useFirestore('projects')

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    const [users, setUsers] = useState([])
    

    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents])

    const clearFormFields = () => {
        setName('')
        setDetails('')
        setDueDate('')
        setCategory('')
        setAssignedUsers([])
    }

    useEffect(() => {
        if (response.success) {
            clearFormFields()
        }
    }, [response.success])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category) {
            setFormError('please select a project category')
            return
        }

        if (assignedUsers.length < 1) {
            setFormError('please assign users to the project')
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map(user => {
            return { 
                displayName: user.value.displayName,
                photoURL: user.value.photoURL,
                id: user.value.id
            }
        })

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }

        await addDocument(project)
        console.log(response)
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
                        value={category}
                    />
                </label>
                
                <label>
                    <span>assigned to:</span>
                    <Select 
                        options={users}
                        onChange={option => setAssignedUsers(option)}
                        value={assignedUsers}
                        isMulti
                    />
                </label>

                <button className='btn'>add project</button>
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}