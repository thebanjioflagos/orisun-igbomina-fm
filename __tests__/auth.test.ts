// __tests__/auth.test.ts — Unit tests for the NextAuth authorize credentials function
// Uses Jest mock objects to isolate database/bcrypt queries completely.

import { authorizeCredentials } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

describe('NextAuth authorizeCredentials()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns user object with correct credentials', async () => {
    const mockDbUser = {
      id: 'usr_1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'hashedpassword123',
      role: 'ADMIN',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockDbUser);
    (compare as jest.Mock).mockResolvedValue(true);

    const user = await authorizeCredentials({
      email: 'admin@example.com',
      password: 'password123',
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'admin@example.com' },
    });
    expect(compare).toHaveBeenCalledWith('password123', 'hashedpassword123');
    expect(user).not.toBeNull();
    expect(user).toMatchObject({
      id: 'usr_1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    });
  });

  it('returns null for wrong password', async () => {
    const mockDbUser = {
      id: 'usr_1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'hashedpassword123',
      role: 'ADMIN',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockDbUser);
    (compare as jest.Mock).mockResolvedValue(false);

    const user = await authorizeCredentials({
      email: 'admin@example.com',
      password: 'wrongpassword',
    });

    expect(prisma.user.findUnique).toHaveBeenCalled();
    expect(compare).toHaveBeenCalled();
    expect(user).toBeNull();
  });

  it('returns null for wrong email', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const user = await authorizeCredentials({
      email: 'hacker@evil.com',
      password: 'password123',
    });

    expect(prisma.user.findUnique).toHaveBeenCalled();
    expect(compare).not.toHaveBeenCalled();
    expect(user).toBeNull();
  });

  it('returns null for empty credentials', async () => {
    const user = await authorizeCredentials({ email: '', password: '' });
    expect(user).toBeNull();
  });

  it('returns null for missing credentials object', async () => {
    const user = await authorizeCredentials(undefined);
    expect(user).toBeNull();
  });
});
