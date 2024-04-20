import authService from '../src/services/authService';
import authRepository from '../src/repositories/authRepository';
import { mocked } from "jest-mock";

jest.mock('../src/repositories/authRepository');
jest.mock('bcrypt');

describe('Auth Service', () => {
  describe('registerUser', () => {
    it('should successfully register a new user', async () => {
      // Define mock user registration data
      const mockNewUser = {
        id: 1,
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User'
      };

      mocked(authRepository.createUser).mockResolvedValueOnce(mockNewUser);

      const result = await authService.registerUser(mockNewUser);

      expect(result).toEqual(mockNewUser);
    });

    it('should throw an error for missing information', async () => {
      // Define mock user registration data with missing information
      const mockNewUser= {
        username: 'testuser',
        password: 'testpassword',
        // Missing email, firstName, and lastName
      } as any;

      await expect(authService.registerUser(mockNewUser)).rejects.toThrowError('Missing information');
    });

    it('should throw an error if the user already exists', async () => {
      // Define mock user registration data
      const mockExistingUser = {
        id: 1,
        username: 'existinguser',
        password: 'existingpassword',
        email: 'existing@example.com',
        firstName: 'Existing',
        lastName: 'User'
      };

      mocked(authRepository.findUserByEmail).mockResolvedValueOnce(mockExistingUser);

      await expect(authService.registerUser(mockExistingUser)).rejects.toThrowError('User already exists');
    });
  });

  
});
