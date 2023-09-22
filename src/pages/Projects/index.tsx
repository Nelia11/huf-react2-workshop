import axios from 'axios';
import React, {useState, useCallback, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Project } from '../../ProjectTypes/ProjectTypes';
import Button from '@mui/material/Button';
import "./Projects.css";
import Modal from '../../ModalPopup/Modal';

function ProjectsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = location.state.accessToken;
  const [projects, setProjects] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getProjects = useCallback(async() => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/projects/get',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const projectData: Project[] = response.data;
      setProjects(projectData);
    } catch (error: any) {
      if (error.response.status === 401) {
        navigate("/login");
      } else {
        console.error(error);
      }
    }
  }, [accessToken, navigate])

  useEffect(() => {
      getProjects();
  }, [getProjects]);

  return (
    <div className="projects-page">
      <h1>Welcome back!</h1>

      <div className="projects-layout">
        {projects.length >= 1 ?
        projects.map(project => 
        <div key={project.id} className="card">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>)
        : "You don't have any projects"
        }
      </div>

      <Button 
        variant="contained" 
        className="add-button"
        onClick={() => setIsOpen(!isOpen)}
      >Create new Project</Button>

      <Modal 
      open={isOpen}
      onClose={() => setIsOpen(false)}
      />
      
    </div>
  );
}

export default ProjectsPage;
