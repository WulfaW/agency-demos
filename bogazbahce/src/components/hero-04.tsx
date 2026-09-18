"use client"

import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

import { Cta, type CtaProps } from '@/components/ui/hero-04-utils/cta'
import { ArtCollage } from '@/components/ui/hero-04-utils/art-collage'

export interface Hero04Props {
  title: string
  titleLine2?: string
  description: string
  washImage?: string
  primaryImage: string
  secondaryImage: string
  primaryAlt?: string
  secondaryAlt?: string
  animation?: 'none' | 'subtle'
  primaryCTA: CtaProps
  secondaryCTA?: CtaProps
  variant?: 'standard' | 'compact'
}

const variantStyles = {
  standard: {
    section: 'py-20 sm:py-28',
    title: 'text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-display text-luxury-text font-medium',
    description: 'max-w-md text-base sm:text-lg text-luxury-text/80 mt-4',
    header: 'gap-5',
    grid: 'gap-12 lg:gap-16',
  },
  compact: {
    section: 'py-14 sm:py-20',
    title: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-forest-900',
    description: 'max-w-sm text-sm text-luxury-text/80',
    header: 'gap-4',
    grid: 'gap-10 lg:gap-12',
  },
} as const

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const mediaItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean
  variants?: Variants
  className?: string
  children: React.ReactNode
}>) {
  if (!active) return <div className={className}>{children}</div>

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  )
}

export function Hero04({
  title,
  titleLine2,
  description,
  washImage,
  primaryImage,
  secondaryImage,
  primaryAlt = '',
  secondaryAlt = '',
  animation = 'none',
  primaryCTA,
  secondaryCTA,
  variant = 'standard',
}: Readonly<Hero04Props>) {
  const reduce = useReducedMotion()
  const animate = animation === 'subtle' && !reduce
  const vs = variantStyles[variant]

  const backgroundElement = washImage && (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 aspect-2/3 opacity-30 blur-xl md:aspect-square lg:aspect-video"
      style={{
        maskImage: 'radial-gradient(ellipse at top, black 45%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at top, black 45%, transparent 75%)'
      }}
    >
      <img
        src={washImage}
        alt=""
        className="h-full w-full object-cover object-top opacity-50"
      />
    </div>
  )

  const titleElement = title && (
    <h1
      className={cn(
        'tracking-tighter text-balance',
        vs.title,
      )}
    >
      <Balancer>{title}</Balancer>
      {titleLine2 && (
        <>
          <br />
          <span className="italic text-gold-500"><Balancer>{titleLine2}</Balancer></span>
        </>
      )}
    </h1>
  )

  const descriptionElement = description && (
    <p className={cn('leading-relaxed font-light', vs.description)}>
      <Balancer>{description}</Balancer>
    </p>
  )

  const ctasElement = (primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled) && (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
      {primaryCTA?.ctaEnabled && <Cta cta={primaryCTA} />}
      {secondaryCTA?.ctaEnabled && (
        <Cta
          cta={{ ...secondaryCTA, variant: secondaryCTA.variant ?? 'link' }}
        />
      )}
    </div>
  )

  const mediaElement = (
    <ArtCollage
      primaryImage={primaryImage}
      secondaryImage={secondaryImage}
      primaryAlt={primaryAlt}
      secondaryAlt={secondaryAlt}
    />
  )

  return (
    <section className="bg-luxury-bg relative isolate w-full overflow-hidden min-h-screen flex items-center pt-20">
      {backgroundElement}

      <motion.div
        className={cn(
          'relative z-10 mx-auto w-full grid max-w-7xl grid-cols-1 items-center px-6 lg:grid-cols-2',
          vs.section,
          vs.grid,
        )}
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-80px' }}
      >
        <Reveal
          active={animate}
          className={cn('flex flex-col items-start', vs.header)}
        >
          {/* Tagline */}
          <motion.div 
              variants={item}
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-luxury-text/60 font-mono uppercase mb-4"
          >
              <span className="w-8 h-px bg-gold-400"></span>
              Sarıyer, İstanbul
          </motion.div>
          
          {titleElement}
          <div className="mt-4">{descriptionElement}</div>
          {ctasElement}
        </Reveal>

        <Reveal active={animate} variants={mediaItem} className="w-full">
          {mediaElement}
        </Reveal>
      </motion.div>
    </section>
  )
}

export default Hero04;
