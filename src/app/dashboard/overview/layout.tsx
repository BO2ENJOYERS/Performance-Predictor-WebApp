import React from 'react';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function WelcomeScreen() {
  return (
    <PageContainer>
      {/* Hero section with background image */}
      <div
        className='relative flex min-h-screen w-full flex-col items-center justify-center px-4'
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1607417307790-5f3efc48ced3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Main content */}
        <div className='z-10 mx-auto max-w-3xl space-y-8 px-4 py-16'>
          <h1 className='text-center text-5xl font-bold text-white'>
            Football Talent Predictor
          </h1>

          <Card className='w-full bg-black/95 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle className='text-center text-xl'>
                Predict Player Potential Using Stats
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='mb-6 flex items-center justify-center'>
                {/* Player silhouettes */}
                <div className='mb-6 flex items-center justify-center'>
                  <div className='flex -space-x-4'>
                    <img
                      src='/images/img.png'
                      alt='Player 1'
                      className='h-20 w-20 rounded-full object-cover'
                    />
                    <img
                      src='/images/img_2.png'
                      alt='Player 3'
                      className='h-20 w-20 rounded-full object-cover'
                    />
                    <img
                      src='/images/img_1.png'
                      alt='Player 2'
                      className='h-20 w-20 rounded-full object-cover'
                    />
                  </div>
                </div>
              </div>

              <p className='text-muted-foreground text-center'>
                Our advanced AI system analyzes football player statistics over
                multiple seasons to predict whether they have high potential for
                future success.
              </p>

              <div className='space-y-2'>
                <h3 className='font-medium'>How it works:</h3>
                <ul className='list-disc space-y-1 pl-5'>
                  <li>Enter your player's stats from recent seasons</li>
                  <li>Our model analyzes performance trends and patterns</li>
                  <li>Get instant prediction on your player's potential</li>
                  <li>Make informed decisions for your team or scouting</li>
                </ul>
              </div>

              {/* Football icon */}
              <div className='flex justify-center py-4'>
                <img
                  src='/images/football.png'
                  alt='Football'
                  className='h-12 w-12 object-cover'
                />
              </div>

              <div className='flex justify-center pt-4'>
                <Button
                  asChild
                  size='lg'
                  className='bg-green-600 px-8 hover:bg-green-700'
                >
                  <Link href='/predict'>Predict Player Potential</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className='mt-8 grid grid-cols-3 gap-4'>
            <div className='flex flex-col items-center rounded-lg bg-white/20 p-4 text-white backdrop-blur-sm'>
              <div className='text-3xl font-bold'>500+</div>
              <div className='text-sm'>Players Analyzed</div>
            </div>
            <div className='flex flex-col items-center rounded-lg bg-white/20 p-4 text-white backdrop-blur-sm'>
              <div className='text-3xl font-bold'>95%</div>
              <div className='text-sm'>Prediction Accuracy</div>
            </div>
            <div className='flex flex-col items-center rounded-lg bg-white/20 p-4 text-white backdrop-blur-sm'>
              <div className='text-3xl font-bold'>24/7</div>
              <div className='text-sm'>Instant Results</div>
            </div>
          </div>

          <div className='text-center text-sm text-white'>
            This tool helps scouts, coaches and team managers identify promising
            talents based on statistical analysis rather than subjective
            assessment.
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
