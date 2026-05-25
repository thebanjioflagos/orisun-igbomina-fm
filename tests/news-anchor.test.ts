import { GET } from '@/app/api/news-anchor/route';

describe('GET /api/news-anchor', () => {
  it('should return JSON with headline and summary_points', async () => {
    // Invoke the App Router GET handler directly
    const response = await GET();
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('headline');
    expect(data).toHaveProperty('summary_points');
    expect(Array.isArray(data.summary_points)).toBe(true);
    expect(data.summary_points.length).toBeGreaterThan(0);
  });
});
