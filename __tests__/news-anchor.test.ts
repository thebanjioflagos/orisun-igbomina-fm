import { GET } from '@/app/api/news-anchor/route';
import logger from '@/lib/logger';

jest.mock('@/lib/logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
}));

describe('GET /api/news-anchor', () => {
  it('returns mock data when ANTHROPIC_API_KEY is missing', async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const response = await GET();
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toMatchObject({
      headline: expect.stringContaining('OIBN'),
      summary_points: expect.arrayContaining([expect.any(String)]),
      sign_off: expect.any(String),
    });
  });
});
