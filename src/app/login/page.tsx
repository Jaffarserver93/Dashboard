'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Google, Microsoft } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { DotGrid } from '@/components/dot-grid';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/fade-in';

const platformIcons = {
  google: <Google className="size-5" />,
  github: <Github className="size-5" />,
  microsoft: <Microsoft className="size-5" />,
};

type Platform = keyof typeof platformIcons;

export default function LoginPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('google');

  const platformVariants = {
    active: {
      scale: 1.2,
      borderColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
    },
    inactive: {
      scale: 1,
      borderColor: 'hsl(var(--border))',
      color: 'hsl(var(--muted-foreground))',
    },
  };
  
  const iconVariants = {
    active: {
      color: 'hsl(var(--primary))',
      scale: 1.2,
    },
    inactive: {
      color: 'hsl(var(--muted-foreground))',
      scale: 1,
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <DotGrid
        dotSize={3}
        gap={15}
        baseColor="hsl(var(--accent))"
        activeColor="hsl(var(--primary))"
        proximity={100}
        shockRadius={200}
        shockStrength={3}
      />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <FadeIn delay={100}>
          <motion.div
            className="w-full rounded-xl border border-border/50 bg-card/80 p-8 shadow-2xl shadow-primary/10 backdrop-blur-md"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              delay: 0.2,
            }}
          >
            <div className="text-center">
              <motion.h1
                className="text-3xl font-bold tracking-tight text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Welcome Back
              </motion.h1>
              <motion.p
                className="mt-2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Sign in to continue to your dashboard.
              </motion.p>
            </div>

            <motion.div
              className="my-8 flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {(['google', 'github', 'microsoft'] as Platform[]).map(
                (platform, i) => (
                  <motion.button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className="group relative flex size-12 items-center justify-center rounded-full border bg-card transition-colors hover:bg-accent"
                    animate={
                      selectedPlatform === platform ? 'active' : 'inactive'
                    }
                    variants={platformVariants}
                    transition={{ duration: 0.3, ease: 'backOut' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={
                        selectedPlatform === platform ? 'active' : 'inactive'
                      }
                      variants={iconVariants}
                    >
                      {platformIcons[platform]}
                    </motion.div>
                  </motion.button>
                )
              )}
            </motion.div>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">
                OR CONTINUE WITH
              </span>
              <Separator className="flex-1" />
            </motion.div>

            <motion.form
              className="mt-8 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-background/50"
                />
              </div>
              <Button type="submit" className="w-full !mt-8" size="lg">
                Sign In
              </Button>
            </motion.form>
          </motion.div>
        </FadeIn>
        <FadeIn delay={300}>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-primary hover:underline">
              Sign up
            </a>
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
