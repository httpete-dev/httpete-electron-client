import { toast, handleError } from '../toast';
import toastr from 'toastr';

// Mock toastr
jest.mock('toastr', () => ({
  success: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  info: jest.fn(),
  options: {},
}));

describe('toast utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call toastr.success with correct parameters', () => {
    toast.success('Test message', 'Test title');
    expect(toastr.success).toHaveBeenCalledWith('Test message', 'Test title');
  });

  it('should call toastr.error with correct parameters', () => {
    toast.error('Test message', 'Test title');
    expect(toastr.error).toHaveBeenCalledWith('Test message', 'Test title');
  });

  it('should call toastr.warning with correct parameters', () => {
    toast.warning('Test message', 'Test title');
    expect(toastr.warning).toHaveBeenCalledWith('Test message', 'Test title');
  });

  it('should call toastr.info with correct parameters', () => {
    toast.info('Test message', 'Test title');
    expect(toastr.info).toHaveBeenCalledWith('Test message', 'Test title');
  });
});

describe('handleError utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should handle error with message', () => {
    const error = new Error('Test error');
    handleError(error);
    expect(toastr.error).toHaveBeenCalledWith('Test error');
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it('should handle error without message', () => {
    handleError({});
    expect(toastr.error).toHaveBeenCalledWith('An unexpected error occurred');
    expect(console.error).toHaveBeenCalledWith({});
  });

  it('should handle null/undefined error', () => {
    handleError(null);
    expect(toastr.error).toHaveBeenCalledWith('An unexpected error occurred');
    expect(console.error).toHaveBeenCalledWith(null);
  });
}); 