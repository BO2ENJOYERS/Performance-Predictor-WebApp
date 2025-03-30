'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function PredictPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Map player position from numeric code to string
  const mapPositionCode = (code: number) => {
    // Assuming position codes: 0 = midfielder, 1 = forward, 2 = defender, 3 = goalkeeper
    const positions = ['midfielder', 'forward', 'defender', 'goalkeeper'];
    return positions[code] || 'midfielder';
  };

  // Form state with pre-filled data
  const [formData, setFormData] = useState({
    name: 'Player Name', // No name in the data, so placeholder
    age: '34', // From Age
    position: mapPositionCode(0), // From Best position
    // Current season stats - using available metrics
    goals: '72', // Using Shooting as goals
    assists: '83', // Using Passing as assists
    minutes: '1875', // Using Total stats as minutes (not accurate but closest available)
    passes: '83', // Using Passing again
    tackles: '78', // Using Total defending
    // Previous seasons progress metrics (calculated as percentage improvements)
    goalsDelta: '15', // Example improvement percentage
    assistsDelta: '12', // Example improvement percentage
    minutesDelta: '20', // Example improvement percentage
    passesDelta: '10', // Example improvement percentage
    tacklesDelta: '8' // Example improvement percentage
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real application, you would make an API call here
      // const response = await fetch('/api/predict', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();

      // For demo purposes, simulate API response
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Example prediction result (would come from your API)
      const mockResult = {
        highPotential: formData.age < 30, // Simplified logic for demo
        confidenceScore: (Math.random() * 30 + 70).toFixed(1),
        strengths: [
          'Game intelligence',
          'Passing accuracy',
          'Defensive contribution'
        ],
        areas: ['Pace', 'Goal conversion']
      };

      setResult(mockResult);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      position: '',
      goals: '',
      assists: '',
      minutes: '',
      passes: '',
      tackles: '',
      goalsDelta: '',
      assistsDelta: '',
      minutesDelta: '',
      passesDelta: '',
      tacklesDelta: ''
    });
    setResult(null);
  };

  return (
    <PageContainer>
      <div className='mx-auto max-w-4xl px-4 py-8'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold'>Predict Player Potential</h1>
          <p className='text-muted-foreground mt-2'>
            Enter your player's statistics to predict their potential
          </p>
        </div>

        {!result ? (
          <Card>
            <CardHeader>
              <CardTitle>Player Data</CardTitle>
              <CardDescription>
                Fill in the player's stats from current and previous seasons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  {/* Basic Info */}
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Player Name</Label>
                    <Input
                      id='name'
                      name='name'
                      placeholder='e.g. John Smith'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='age'>Age</Label>
                    <Input
                      id='age'
                      name='age'
                      type='number'
                      placeholder='e.g. 23'
                      min='15'
                      max='40'
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='position'>Position</Label>
                    <Select
                      value={formData.position}
                      onValueChange={(value) =>
                        handleSelectChange('position', value)
                      }
                    >
                      <SelectTrigger id='position'>
                        <SelectValue placeholder='Select position' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='forward'>Forward</SelectItem>
                        <SelectItem value='midfielder'>Midfielder</SelectItem>
                        <SelectItem value='defender'>Defender</SelectItem>
                        <SelectItem value='goalkeeper'>Goalkeeper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />
                <h3 className='font-medium'>Current Season Statistics</h3>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div className='space-y-2'>
                    <Label htmlFor='goals'>Goals</Label>
                    <Input
                      id='goals'
                      name='goals'
                      type='number'
                      placeholder='e.g. 12'
                      value={formData.goals}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='assists'>Assists</Label>
                    <Input
                      id='assists'
                      name='assists'
                      type='number'
                      placeholder='e.g. 8'
                      value={formData.assists}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='minutes'>Minutes Played</Label>
                    <Input
                      id='minutes'
                      name='minutes'
                      type='number'
                      placeholder='e.g. 1800'
                      value={formData.minutes}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='passes'>Successful Passes</Label>
                    <Input
                      id='passes'
                      name='passes'
                      type='number'
                      placeholder='e.g. 450'
                      value={formData.passes}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='tackles'>Tackles</Label>
                    <Input
                      id='tackles'
                      name='tackles'
                      type='number'
                      placeholder='e.g. 25'
                      value={formData.tackles}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <Separator />
                <h3 className='font-medium'>
                  Year-over-Year Improvement (% change from previous season)
                </h3>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div className='space-y-2'>
                    <Label htmlFor='goalsDelta'>Goals Improvement</Label>
                    <Input
                      id='goalsDelta'
                      name='goalsDelta'
                      type='number'
                      placeholder='e.g. 15'
                      value={formData.goalsDelta}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='assistsDelta'>Assists Improvement</Label>
                    <Input
                      id='assistsDelta'
                      name='assistsDelta'
                      type='number'
                      placeholder='e.g. 10'
                      value={formData.assistsDelta}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='minutesDelta'>Minutes Improvement</Label>
                    <Input
                      id='minutesDelta'
                      name='minutesDelta'
                      type='number'
                      placeholder='e.g. 20'
                      value={formData.minutesDelta}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='passesDelta'>Passes Improvement</Label>
                    <Input
                      id='passesDelta'
                      name='passesDelta'
                      type='number'
                      placeholder='e.g. 12'
                      value={formData.passesDelta}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='tacklesDelta'>Tackles Improvement</Label>
                    <Input
                      id='tacklesDelta'
                      name='tacklesDelta'
                      type='number'
                      placeholder='e.g. 8'
                      value={formData.tacklesDelta}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className='pt-4'>
                  <Button type='submit' className='w-full' disabled={loading}>
                    {loading ? 'Analyzing Player Data...' : 'Predict Potential'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
              <CardDescription>
                Analysis for {formData.name} ({formData.position})
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='my-6 flex items-center justify-center'>
                {result.highPotential ? (
                  <div className='text-center'>
                    <CheckCircle2 className='mx-auto mb-2 h-16 w-16 text-green-500' />
                    <h2 className='text-2xl font-bold text-green-600'>
                      High Potential Player
                    </h2>
                    <p className='text-muted-foreground'>
                      This player shows significant promise for future
                      development
                    </p>
                  </div>
                ) : (
                  <div className='text-center'>
                    <AlertCircle className='mx-auto mb-2 h-16 w-16 text-amber-500' />
                    <h2 className='text-2xl font-bold text-amber-600'>
                      Average Potential
                    </h2>
                    <p className='text-muted-foreground'>
                      This player shows standard developmental patterns
                    </p>
                  </div>
                )}
              </div>

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='space-y-2'>
                  <h3 className='font-medium'>Confidence Score</h3>
                  <div className='h-8 overflow-hidden rounded-full bg-gray-200'>
                    <div
                      className={`h-full ${result.highPotential ? 'bg-green-500' : 'bg-amber-500'}`}
                      style={{ width: `${result.confidenceScore}%` }}
                    ></div>
                  </div>
                  <p className='text-right text-sm'>
                    {result.confidenceScore}%
                  </p>
                </div>

                <div className='space-y-2'>
                  <h3 className='font-medium'>Key Strengths</h3>
                  <ul className='list-disc space-y-1 pl-5'>
                    {result.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>

                  <h3 className='mt-4 font-medium'>Areas for Improvement</h3>
                  <ul className='list-disc space-y-1 pl-5'>
                    {result.areas.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='mt-4 rounded-lg bg-gray-50 p-4'>
                <h3 className='mb-2 font-medium'>Analysis Summary</h3>
                <p className='text-sm'>
                  Based on the statistical analysis of {formData.name}'s
                  performance data, our model
                  {result.highPotential
                    ? ' indicates significant improvement trends and above-average development patterns compared to similar players at this age and position.'
                    : ' shows standard development patterns that align with average progression for this age and position.'}
                  The year-over-year improvement metrics are particularly{' '}
                  {result.highPotential ? 'strong' : 'notable'}
                  in {result.strengths[0].toLowerCase()} and{' '}
                  {result.strengths[1].toLowerCase()}.
                </p>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button variant='outline' onClick={resetForm}>
                Analyze Another Player
              </Button>
              <Button
                variant='default'
                onClick={() => {
                  // In a real application, you could download or save the report
                  alert('Report functionality would be implemented here');
                }}
              >
                Save Report
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
