// normalizedError.test.ts
import { normalizedError } from '@/services/normalizeError';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit/react';

describe('normalizedError', () => {
  const originalOnLine = navigator.onLine;

  beforeEach(() => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      configurable: true,
      value: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'onLine', {
      value: originalOnLine,
    });
  });

  describe('FetchBaseQueryError with numeric status', () => {
    it('Bad Request', () => {
      const error: FetchBaseQueryError = { status: 400, data: {} };
      expect(normalizedError(error)).toEqual({
        status: 400,
        message: 'Bad Request',
      });
    });

    it('Unauthorized', () => {
      const error: FetchBaseQueryError = { status: 401, data: {} };
      expect(normalizedError(error)).toEqual({
        status: 401,
        message: 'Unauthorized',
      });
    });

    it('Forbidden', () => {
      const error: FetchBaseQueryError = { status: 403, data: {} };
      expect(normalizedError(error)).toEqual({
        status: 403,
        message: 'Forbidden',
      });
    });

    it('Pokemon Not Found', () => {
      const error: FetchBaseQueryError = { status: 404, data: {} };
      expect(normalizedError(error)).toEqual({
        status: 404,
        message: 'Pokemon Not Found',
      });
    });

    it('Request timeout', () => {
      const error: FetchBaseQueryError = { status: 408, data: {} };
      expect(normalizedError(error)).toEqual({
        status: 408,
        message: 'Request timeout',
      });
    });

    it('Too many requests', () => {
      const error: FetchBaseQueryError = { status: 429, data: {} };
      expect(normalizedError(error)).toEqual({
        status: 429,
        message: 'Too many requests, try again later',
      });
    });

    it('Server Error', () => {
      const error: FetchBaseQueryError = { status: 500, data: {} };
      expect(normalizedError(error)).toEqual({
        status: 500,
        message: 'Server Error',
      });
    });

    it('server unavailable', () => {
      const error: FetchBaseQueryError = { status: 503, data: {} };
      expect(normalizedError(error)).toEqual({
        status: 503,
        message: 'Server is unavailable, try again later',
      });
    });

    it('something went wrong', () => {
      const error: FetchBaseQueryError = { status: 418, data: {} };
      expect(normalizedError(error)).toEqual({
        status: 418,
        message: 'Something went wrong with your request',
      });
    });

    it('Request failed with status X', () => {
      const error: FetchBaseQueryError = { status: 200, data: {} };
      expect(normalizedError(error)).toEqual({
        status: 200,
        message: 'Request failed with status 200',
      });
    });

    it('uses message from error.data if present and status < 500', () => {
      const error: FetchBaseQueryError = {
        status: 404,
        data: { message: 'Custom not found' },
      };
      expect(normalizedError(error)).toEqual({
        status: 404,
        message: 'Custom not found',
      });
    });

    it('ignores message from error.data for status >= 500', () => {
      const error: FetchBaseQueryError = {
        status: 500,
        data: { message: 'Custom server error' },
      };
      expect(normalizedError(error)).toEqual({
        status: 500,
        message: 'Server Error',
      });
    });
  });

  describe('FetchBaseQueryError with string status', () => {
    it('FETCH_ERROR when online', () => {
      Object.defineProperty(navigator, 'onLine', { value: true });
      const error: FetchBaseQueryError = {
        status: 'FETCH_ERROR',
        error: 'Network error',
      };
      expect(normalizedError(error)).toEqual({
        status: 0,
        message: 'Network error',
      });
    });

    it('FETCH_ERROR when offline', () => {
      Object.defineProperty(navigator, 'onLine', { value: false });
      const error: FetchBaseQueryError = {
        status: 'FETCH_ERROR',
        error: 'Network error',
      };
      expect(normalizedError(error)).toEqual({
        status: 0,
        message: 'No internet connection',
      });
    });

    it('PARSING_ERROR with string data', () => {
      const error = {
        status: 'PARSING_ERROR',
        data: 'Invalid JSON',
      } as FetchBaseQueryError;
      expect(normalizedError(error)).toEqual({
        status: 0,
        message: 'Invalid JSON',
      });
    });

    it('PARSING_ERROR without string data', () => {
      const error = {
        status: 'PARSING_ERROR',
        data: {},
      } as FetchBaseQueryError;
      expect(normalizedError(error)).toEqual({
        status: 0,
        message: 'Response parsing error',
      });
    });

    it('Request timeout', () => {
      const error = { status: 'TIMEOUT_ERROR' } as FetchBaseQueryError;
      expect(normalizedError(error)).toEqual({
        status: 0,
        message: 'Request timeout',
      });
    });

    it('CUSTOM_ERROR', () => {
      const error = { status: 'CUSTOM_ERROR' } as FetchBaseQueryError;
      expect(normalizedError(error)).toEqual({
        status: 0,
        message: 'Custom error',
      });
    });

    it('Unknown error type', () => {
      const error = {
        status: 'UNKNOWN',
        data: {},
      } as unknown as FetchBaseQueryError;
      expect(normalizedError(error)).toEqual({
        status: 0,
        message: 'Unknown error type',
      });
    });
  });

  describe('SerializedError', () => {
    it('extracts message', () => {
      const error: SerializedError = { message: 'Something went wrong' };
      expect(normalizedError(error)).toEqual({
        status: 0,
        message: 'Something went wrong',
      });
    });

    it('falls back to Unknown Error if no message', () => {
      const error: SerializedError = { name: 'Error' };
      expect(normalizedError(error)).toEqual({
        status: 0,
        message: 'Unknown Error',
      });
    });
  });

  it('handles undefined', () => {
    expect(normalizedError(undefined)).toEqual({
      status: 0,
      message: 'Unknown Error',
    });
  });
});
