import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import ProjectFilter from './ProjectFilter'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

import './Dashboard.css'

export default function Dashboard() {
    const [currentFilter, setCurrentFilter] = useState('all')
    const { documents, error } = useCollection('projects')
    const { user } = useAuthContext()

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const projects = documents ? documents.filter((document) => {
        switch(currentFilter) {
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach(u => {
                    if (u.id === user.uid) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'marketing':
            case 'sales':
            case 'design':
            case 'development':
                return (document.category === currentFilter)
            default:
                return true
        }
    }) : null

    return (
        <div>
            <h2 className='page-title'>dashboard</h2>
            {error && <p className='error'>{error}</p>}
            {documents && <ProjectFilter  
                currentFilter={currentFilter} 
                changeFilter={changeFilter}
            />}
            {projects && <ProjectList projects={projects} />}
        </div>
    )
}