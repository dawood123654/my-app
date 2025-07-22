'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Text } from '@react-three/drei'
import { useRef, useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'E-commerce Store',
    description: 'Developed a full-stack e-commerce platform...',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Stripe API', 'PostgreSQL'],
    imageUrl: 'https://via.placeholder.com/400x250/0000FF/FFFFFF?text=E-commerce+Store',
    githubUrl: 'https://github.com/yourusername/ecommerce-store',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Built a collaborative task management application...',
    technologies: ['React', 'Firebase', 'Redux', 'Material-UI'],
    imageUrl: 'https://via.placeholder.com/400x250/FF0000/FFFFFF?text=Task+App',
    githubUrl: 'https://github.com/yourusername/task-management-app',
  },
  {
    id: 3,
    title: 'Interactive 3D Portfolio',
    description: 'Designed and developed this interactive 3D portfolio...',
    technologies: ['React', 'Next.js', 'Three.js', '@react-three/fiber', 'Tailwind CSS'],
    imageUrl: 'https://via.placeholder.com/400x250/00FF00/FFFFFF?text=3D+Portfolio',
    githubUrl: 'https://github.com/yourusername/my-3d-portfolio',
  },
  {
    id: 4,
    title: 'AI Chatbot Integration',
    description: 'Integrated a custom AI chatbot into a web application...',
    technologies: ['Python', 'Flask', 'React', 'OpenAI API', 'NLP'],
    imageUrl: 'https://via.placeholder.com/400x250/FFFF00/000000?text=AI+Chatbot',
    githubUrl: 'https://github.com/yourusername/ai-chatbot-project',
  },
]

function ProjectCard({ project, position, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position} scale={hovered ? 1.3 : 1}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(project)}
        castShadow
        receiveShadow
        cursor="pointer"
      >
        <boxGeometry args={[1.5, 1, 0.2]} />
        <meshStandardMaterial color={hovered ? 'orange' : 'royalblue'} />

        <Text
          position={[0, 0, 0.11]}
          fontSize={0.18}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
          lineHeight={1.2}
        >
          {project.title}
        </Text>

        <Text
          position={[0, 0, -0.11]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
          lineHeight={1.2}
        >
          {project.title}
        </Text>
      </mesh>
    </group>
  )
}

function RotatingCards({ onCardClick }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    groupRef.current.rotation.y = elapsed * 0.2
  })

  const radius = 4
  const angleStep = (2 * Math.PI) / projects.length

  return (
    <group ref={groupRef}>
      {projects.map((p, i) => {
        const angle = i * angleStep
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <ProjectCard
            key={p.id}
            project={p}
            position={[x, 0, z]}
            onClick={onCardClick}
          />
        )
      })}
    </group>
  )
}

function RotatingSphere() {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    groupRef.current.rotation.y = elapsed * 0.15
  })

  return (
    <group ref={groupRef}>
      <Sphere args={[1.5, 64, 64]} castShadow receiveShadow>
        <meshStandardMaterial color="gold" />
      </Sphere>
      <Text
        position={[0, 0, 0.4]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Click a Project!
      </Text>
    </group>
  )
}

function Modal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white text-black p-6 rounded-lg shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{project.title}</h2>
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-auto rounded-md mb-4 object-cover"
          />
        )}
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">{project.description}</p>

        {project.technologies?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900 text-lg text-center"
            >
              View Code
            </a>
          )}
          <button
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 text-lg text-center"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const [selectedProject, setSelectedProject] = useState(null)
  const handleCardClick = (project) => setSelectedProject(project)
  const closeModal = () => setSelectedProject(null)

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative">
      <h1 className="absolute top-6 left-4 z-10 text-2xl sm:text-3xl font-bold">
        Dawod Mohammed - Portfolio
      </h1>

      <div className="w-full max-w-6xl h-[600px] sm:h-[500px] xs:h-[400px]">
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <OrbitControls />
          <RotatingSphere />
          <RotatingCards onCardClick={handleCardClick} />
        </Canvas>
      </div>

      <Modal project={selectedProject} onClose={closeModal} />
    </main>
  )
}
