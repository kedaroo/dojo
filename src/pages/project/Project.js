import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'

import './Project.css'

export default function Project() {

    const { id } = useParams()
    const { document, error } = useDocument('projects', id)

    if (error) {
        return <div className='error'>{error}</div>
    }

    if (!document) {
        return <div className='loading'>loading...</div>
    }

    return (
        <div className='project-details'>
            <ProjectSummary project={document} />
            <ProjectComments project={document} />
        </div>
    )
}