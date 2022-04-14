import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'

import Avatar from '../../components/Avatar'

export default function ProjectSummary({ project }) {

    const { deleteDocument, response } = useFirestore('projects')
    const { user } = useAuthContext()

    const handleClick = (e) => {
        deleteDocument(project.id)
    }
    
    const showDeleteBtn = () => {
        return (project.createdBy.id === user.uid)
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p>by {project.createdBy.displayName}</p>
                <p className="due-date">
                    project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="project-details">
                    {project.details}
                </p>
                <h4>project is assigned to:</h4>
                <div className='assigned-users'>
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
                {showDeleteBtn() && <button className='btn' onClick={handleClick}>mark as complete</button>}        
            </div>
        </div>
    )
}