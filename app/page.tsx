'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Text } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

const projects = [
  {
    id: 1,
    title: 'Name',
    description: 'Dawod Mohammed – Frontend developer passionate about interactive design.',
  },
  {
    id: 2,
    title: 'Experience',
    description: 'Graduate of NBU. Worked on various web projects using React and Next.js.',
  },
  {
    id: 3,
    title: 'Skills',
    description: 'HTML, CSS, JavaScript, React, Next.js, Three.js, Tailwind CSS.',
  },
  {
    id: 4,
    title: 'Hobbies',
    description: '3D design, AI, reading tech news and articles.',
  },
]

function BouncingDots() {
  return (
    <div className="fixed top-4 right-4 flex space-x-2 z-50">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

function ProjectCard({
  project,
  position,
  onClick,
}: {
  project: any
  position: [number, number, number]
  onClick: (project: any) => void
}) {
  const ref = useRef<THREE.Mesh | null>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position} scale={hovered ? 1.3 : 1}>
      <mesh
        ref={ref}
        onPointerOver={() => {
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
        onClick={() => onClick(project)}
      >
        <boxGeometry args={[1.5, 1, 0.2]} />
        <meshStandardMaterial color={hovered ? 'orange' : 'royalblue'} />
      </mesh>

      <Text
        position={[0, 0, 0.11]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>

      <Text
        position={[0, 0, -0.11]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
    </group>
  )
}

function RotatingCards({
  onCardClick,
  isExpanded,
}: {
  onCardClick: (project: any) => void
  isExpanded: boolean
}) {
  const groupRef = useRef<THREE.Group | null>(null)

  useFrame(({ clock }) => {
    if (!isExpanded && groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3
    }
  })

  const radius = 4
  const angleStep = (2 * Math.PI) / projects.length

  return (
    <group ref={groupRef}>
      {projects.map((p, i) => {
        let position: [number, number, number]

        if (isExpanded) {
          // اصطفاف تحت الكرة الصفراء
          position = [i * 2 - ((projects.length - 1) * 2) / 2, -2.5, 0]
        } else {
          // تدوير حول الكرة
          const angle = i * angleStep
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          position = [x, 0, z]
        }

        return (
          <ProjectCard
            key={p.id}
            project={p}
            position={position}
            onClick={onCardClick}
          />
        )
      })}
    </group>
  )
}

function RotatingSphere({ onToggle }: { onToggle: () => void }) {
  const groupRef = useRef<THREE.Group | null>(null)

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.3
    }
  })

  return (
    <group ref={groupRef} onClick={onToggle}>
      <Sphere args={[1.5, 64, 64]}>
        <meshStandardMaterial color="yellow" />
      </Sphere>
      <Text
        position={[0, 0, 0.4]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Welcome
      </Text>
    </group>
  )
}

function Modal({ project, onClose }: { project: any; onClose: () => void }) {
  if (!project) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="backdrop-blur-md bg-white/10 text-white border border-white/20 p-6 rounded-xl shadow-2xl max-w-sm w-[90%] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="mb-6">{project.description}</p>
        <button
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white px-4 py-2 rounded-md font-medium shadow-md transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default function Products() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCardClick = (project: any) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-700 text-white flex flex-col items-center justify-center relative">
      <BouncingDots />
      <h1 className="absolute top-6 left-4 z-10 text-2xl sm:text-3xl font-bold">
        Portfolio
      </h1>

      <div className="w-full max-w-6xl h-[600px] sm:h-[500px]">
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <OrbitControls />

          <RotatingSphere onToggle={toggleExpanded} />
          <RotatingCards onCardClick={handleCardClick} isExpanded={isExpanded} />
        </Canvas>
      </div>

      <Modal project={selectedProject} onClose={closeModal} />

      <section className="w-full max-w-3xl text-center mt-12 px-4 sm:px-8">
        <h2 className="text-2xl font-bold mb-4 text-white">About Me</h2>
        <p className="text-gray-300 mb-2">
          I'm <strong>Dawod Mohammed</strong>, a frontend developer passionate about building interactive and beautiful user experiences.
        </p>
        <p className="text-gray-300 mb-2">
          I work with modern technologies like <strong>React</strong>, <strong>Next.js</strong>, and <strong>Three.js</strong> to create future-facing websites.
        </p>
        <p className="text-gray-300 mb-4">
          I aim to combine visual creativity with technical skills to build unique and engaging digital products.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-orange-400 font-medium mt-4">
          <a href="mailto:dawodalkhazal2233@gmail.com">Email</a>
        </div>
      </section>

      <footer className="mt-10 text-gray-400 text-sm pb-6">
        &copy; {new Date().getFullYear()} Dawod Mohammed. All rights reserved.
      </footer>
    </main>
  )
}