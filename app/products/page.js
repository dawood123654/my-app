'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Text } from '@react-three/drei'
import { useRef, useState } from 'react'

// النصوص باللغتين
const translations = {
  en: {
    portfolio: 'Portfolio',
    aboutMe: 'About Me',
    description1: "I'm Dawod Mohammed, a frontend developer passionate about building interactive and beautiful user experiences.",
    description2: 'I work with modern technologies like React, Next.js, and Three.js to create future-facing websites.',
    description3: 'I aim to combine visual creativity with technical skills to build unique and engaging digital products.',
    contact: 'Email',
    welcome: 'Welcome',
    close: 'Close',
  },
  ar: {
    portfolio: 'ملف الأعمال',
    aboutMe: 'من أنا',
    description1: 'أنا داود محمد، مطور واجهات أمامية شغوف بإنشاء تجارب مستخدم تفاعلية وجميلة.',
    description2: 'أعمل باستخدام تقنيات حديثة مثل React وNext.js وThree.js لبناء مواقع مستقبلية.',
    description3: 'أسعى للجمع بين الإبداع البصري والمهارات التقنية لإنشاء منتجات رقمية مميزة.',
    contact: 'البريد الإلكتروني',
    welcome: 'مرحبًا',
    close: 'إغلاق',
  },
}

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

function RotatingCards({ onCardClick }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    groupRef.current.rotation.y = elapsed * 0.3
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

function RotatingSphere({ text }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.3
    }
  })

  return (
    <group ref={groupRef}>
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
        {text}
      </Text>
    </group>
  )
}

function Modal({ project, onClose, t }) {
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
          {t.close}
        </button>
      </div>
    </div>
  )
}

export default function Products() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [lang, setLang] = useState('en')
  const t = translations[lang]

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'))
  }

  return (
    <main className="min-h-screen bg-[#0b0e1a] text-white flex flex-col items-center justify-center relative">
      {/* الهيدر */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <h1 className="text-2xl sm:text-3xl font-bold">{t.portfolio}</h1>
        <button
          onClick={toggleLanguage}
          className="bg-white/10 text-white px-4 py-1 rounded-full text-sm hover:bg-white/20 transition"
        >
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      <div className="w-full max-w-6xl h-[600px] sm:h-[500px]">
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <OrbitControls />

          <RotatingSphere text={t.welcome} />
          <RotatingCards onCardClick={setSelectedProject} />
        </Canvas>
      </div>

      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} t={t} />

      <section className="w-full max-w-3xl text-center mt-12 px-4 sm:px-8">
        <h2 className="text-2xl font-bold mb-4 text-white">{t.aboutMe}</h2>
        <p className="text-gray-300 mb-2">{t.description1}</p>
        <p className="text-gray-300 mb-2">{t.description2}</p>
        <p className="text-gray-300 mb-4">{t.description3}</p>

        <div className="flex flex-wrap justify-center gap-6 text-orange-400 font-medium mt-4">
          <a href="mailto:dawodalkhazal2233@gmail.com">{t.contact}</a>
        </div>
      </section>

      <footer className="mt-10 text-gray-400 text-sm pb-6">
        &copy; {new Date().getFullYear()} Dawod Mohammed. All rights reserved.
      </footer>
    </main>
  )
}
