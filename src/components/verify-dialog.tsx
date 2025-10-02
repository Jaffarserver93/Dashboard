'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function VerifyDialog() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Verify Your Identity</CardTitle>
        <CardDescription>
          Please complete the check to prove you are human.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="human-check"
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked as boolean)}
            aria-label="I'm not a robot"
          />
          <Label htmlFor="human-check" className="text-sm">
            I am not a robot
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative group w-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Button
            className="w-full relative"
            disabled={!isChecked}
          >
            Verify
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}