import { NextResponse } from 'next/server';
import { getAllRestaurants } from '@/lib/restaurants';

export async function GET() {
  const restaurants = getAllRestaurants();
  return NextResponse.json(restaurants);
}
