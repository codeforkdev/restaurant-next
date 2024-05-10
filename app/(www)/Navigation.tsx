'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useSelectedLayoutSegments } from 'next/navigation'
export function Navigation() {
  const segments = useSelectedLayoutSegments()
  const { scrollY } = useScroll()
  const [prevPos, setPrevPos] = useState(scrollY.get())
  const [animate, setAnimate] = useState<'hide' | 'show'>()
  console.log(segments)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (prevPos < latest && latest > 100) {
      setAnimate('hide')
    } else {
      setAnimate("show")
    }
    if (latest === 0) return
    setPrevPos(latest)
  })
  return (
    <motion.div animate={animate}
      variants={{
        hide: {
          translateY: '-100%',
          opacity: 0
        },
        show: {
          translateY: 0
        }
      }}
      transition={{
        bounce: 0
      }}


      className="border-b sticky top-0 bg-white z-20 border-b-[#C6B6A8]/50">
      <nav className="flex max-w-7xl mx-auto py-6 ">
        <motion.div className={cn("relative h-20 w-24")}>
          <Image src={'https://demartinolatin.com/wp-content/uploads/2019/04/Logo_Web_Final_Footer.png'} alt="logo" fill />
        </motion.div>

        <div className="flex-1" />
        <ul className="flex gap-8 text-[#7B7B7B] uppercase justify-center items-center -ml-24">
          <li className={cn("hover:text-[#C6B6A8] transition-all", {
            "text-[#C6B6A8]": segments[0] === "/"
          })}>
            <Link href="/">Home</Link>
          </li>
          <li className={cn("hover:text-[#C6B6A8] transition-all", {
            "text-[#C6B6A8]": segments[0] === "about"
          })}>
            <Link href="/about">About</Link>
          </li>
          <li className={cn("hover:text-[#C6B6A8] transition-all", {
            "text-[#C6B6A8]": segments[0] === "menu"
          })}>
            <Link href="/menu">Menu</Link>
          </li>
          <li className={cn("hover:text-[#C6B6A8] transition-all", {
            "text-[#C6B6A8]": segments[0] === "gallery"
          })}>
            <Link href="/gallery">Gallery</Link>
          </li>
          <li className="hover:text-[#C6B6A8] transition-all">
            <Link href="https://order.toasttab.com/online/brunch-by-de-martino" target="_blank">Order Online</Link>
          </li>
          <li>Reserve</li>
        </ul>

        <div className="flex-1" />
      </nav>

    </motion.div>

  )
}

