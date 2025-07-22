'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Text } from '@react-three/drei'
import { useRef, useState } from 'react'

const projects = [
  { id: 1, title: 'Name', description: 'Dawod Mohammed – Front‑end developer passionate about interactive designs.' },
  { id: 2, title: 'Experience', description: 'Graduated from NBU, revamped web projects with React & Next.js.' },
  { id: 3, title: 'Skills', description: 'HTML, CSS, JavaScript, React, Next.js, Three.js, Tailwind.' },
  { id: 4, title: 'Hobbies', description: '3D design, AI, and staying updated with tech trends.' },
]

function ProjectCard({ project, position, onClick }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position} scale={hovered ? 1.3 : 1}>
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(project)}
        cursor="pointer"
      >
        <boxGeometry args={[1.5, 1, 0.2]} />
        <meshStandardMaterial color={hovered ? 'orange' : 'royalblue'} />
      </mesh>

      {/* Front side: Title */}
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>

      {/* Back side: Description */}
      <Text
        position={[0, 0, -0.11]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.description}
      </Text>
    </group>
  )
}

function RotatingCards({ onCardClick }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.3
  })

  const r = 4, angleStep = (2 * Math.PI) / projects.length

  return (
    <group ref={groupRef}>
      {projects.map((p, i) => {
        const angle = i * angleStep
        return (
          <ProjectCard
            key={p.id}
            project={p}
            position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
            onClick={onCardClick}
          />
        )
      })}
    </group>
  )
}

function Modal({ project, onClose }) {
  if (!project) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white text-black p-6 rounded max-w-sm w-[90%]" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="mb-6">{project.description}</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default function App() {
  const [selected, setSelected] = useState(null)
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative">
      <h1 className="absolute top-6 left-4 z-10 text-2xl sm:text-3xl font-bold">Portfolio</h1>
      <div className="w-full max-w-6xl h-[600px] sm:h-[500px] xs:h-[400px]">
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <OrbitControls />
          <group position={[0, 0, 0]}>
            <Sphere args={[1.5, 64, 64]}>
              <meshStandardMaterial color="yellow" />
            </Sphere>
            <Text position={[0, 0, 0.4]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
              Welcome
            </Text>
          </group>
          <RotatingCards onCardClick={setSelected} />
        </Canvas>
      </div>
      <Modal project={selected} onClose={() => setSelected(null)} />
      <section className="w-full max-w-3xl text-center mt-12 px-4 sm:px-8">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-gray-300 mb-2"><strong>Dawod Mohammed</strong> is a front‑end developer passionate about interactive and visually appealing interfaces.</p>
        <p className="text-gray-300 mb-2">I build futuristic websites using <strong>React</strong>, <strong>Next.js</strong>, and <strong>Three.js</strong>.</p>
        <p className="text-gray-300 mb-4">I strive to blend visual creativity with practical programming to deliver unique user experiences.</p>
        <div className="flex justify-center gap-6 text-orange-400 font-medium mt-4">
          <a href="mailto:dawodalkhazal2233@gmail.com">Email</a>
        </div>
      </section>
      <footer className="mt-10 text-gray-400 text-sm pb-6">&copy; {new Date().getFullYear()} Dawod Mohammed. All rights reserved.</footer>
    </main>
  )
}
