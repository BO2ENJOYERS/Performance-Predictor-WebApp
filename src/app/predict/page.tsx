'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const FIELD_GROUPS = [
  {
    title: 'Basic Information',
    fields: [
      'age',
      'overall_rating',
      'potential',
      'height',
      'weight',
      'foot',
      'best_position',
      'growth',
      'release_clause'
    ]
  },
  {
    title: 'Physical Attributes',
    fields: ['jumping', 'strength']
  },
  {
    title: 'Skills',
    fields: [
      'total_defending',
      'total_goalkeeping',
      'total_stats',
      'international_reputation',
      'pace_diving',
      'shooting_handling',
      'passing_kicking'
    ]
  },
  {
    title: 'Career Info',
    fields: ['start_year', 'end_year']
  },
  {
    title: 'Advanced Attributes',
    fields: [
      'attacking_crossing',
      'attacking_heading_accuracy',
      'attacking_short_passing',
      'attacking_volleys',
      'skill_dribbling',
      'skill_curve',
      'skill_fk_accuracy',
      'skill_long_passing',
      'skill_ball_control',
      'mentality_aggression',
      'mentality_interceptions',
      'mentality_penalties',
      'mentality_composure'
    ]
  }
];

export default function PredictPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState(
    Object.fromEntries(
      FIELD_GROUPS.flatMap((group) => group.fields.map((field) => [field, '']))
    )
  );

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className='mx-auto max-w-4xl px-4 py-8'>
        <h1 className='mb-6 text-center text-3xl font-bold'>
          Player Analysis System
        </h1>

        {!result ? (
          <Card>
            <CardHeader>
              <CardTitle>Enter Player Data</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {FIELD_GROUPS.map((group, index) => (
                  <div key={index}>
                    <h3 className='mb-3 text-lg font-semibold'>
                      {group.title}
                    </h3>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                      {group.fields.map((field) => (
                        <div className='space-y-2' key={field}>
                          <Label htmlFor={field}>
                            {field.replace(/_/g, ' ').toUpperCase()}
                          </Label>
                          <Input
                            id={field}
                            name={field}
                            type='number'
                            value={formData[field]}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      ))}
                    </div>
                    <Separator className='my-4' />
                  </div>
                ))}
                <Button type='submit' className='w-full' disabled={loading}>
                  {loading ? 'Analyzing...' : 'Generate Analysis'}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center justify-center'>
                {result.highPotential ? (
                  <div className='text-center'>
                    <CheckCircle2 className='mx-auto mb-2 h-16 w-16 text-green-500' />
                    <h2 className='text-2xl font-bold text-green-600'>
                      High Potential
                    </h2>
                  </div>
                ) : (
                  <div className='text-center'>
                    <AlertCircle className='mx-auto mb-2 h-16 w-16 text-amber-500' />
                    <h2 className='text-2xl font-bold text-amber-600'>
                      Standard Track
                    </h2>
                  </div>
                )}
              </div>
              <div className='flex justify-between'>
                <Button variant='outline' onClick={() => setResult(null)}>
                  New Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
