import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit/react';

export type NormalizedErrorObject = {
  status: number;
  message: string;
};

type ErrorWithMessage = {
  message: unknown;
};

const hasMessage = (data: unknown): data is ErrorWithMessage => {
  return typeof data === 'object' && data !== null && 'message' in data;
};

const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  if (!error || typeof error !== 'object') return false;
  if ('status' in error) return true;
  return false;
};

const isSerializedError = (error: unknown): error is SerializedError => {
  if (
    typeof error === 'object' &&
    error !== null &&
    ('message' in error || 'name' in error || 'stack' in error)
  ) {
    return true;
  }
  return false;
};

export const normalizedError = (
  error: FetchBaseQueryError | SerializedError | undefined
): NormalizedErrorObject => {
  if (isFetchBaseQueryError(error)) {
    let status = 0;
    let message = 'Unknown Error';
    if (typeof error.status === 'number') {
      status = error.status;

      switch (status) {
        case 400:
          message = 'Bad Request';
          break;
        case 401:
          message = 'Unauthorized';
          break;
        case 403:
          message = 'Forbidden';
          break;
        case 404:
          message = 'Pokemon Not Found';
          break;
        case 408:
          message = 'Request timeout';
          break;
        case 429:
          message = 'Too many requests, try again later';
          break;
        case 500:
          message = 'Server Error';
          break;
        default:
          if (status >= 500) {
            message = 'Server is unavailable, try again later';
          } else if (status >= 400) {
            message = 'Something went wrong with your request';
          } else {
            message = `Request failed with status ${status}`;
          }
      }

      if (hasMessage(error.data) && status < 500) {
        message = String(error.data.message);
      }
    } else {
      switch (error.status) {
        case 'FETCH_ERROR':
          message = navigator.onLine
            ? 'Network error'
            : 'No internet connection';
          break;

        case 'PARSING_ERROR':
          message =
            typeof error.data === 'string' && error.data
              ? error.data
              : 'Response parsing error';
          break;

        case 'TIMEOUT_ERROR':
          message = 'Request timeout';
          break;

        case 'CUSTOM_ERROR':
          message = 'Custom error';
          break;

        default:
          message = 'Unknown error type';
      }
    }
    return { status, message };
  } else if (isSerializedError(error)) {
    return {
      status: 0,
      message: error.message ? error.message : 'Unknown Error',
    };
  } else {
    return {
      status: 0,
      message: 'Unknown Error',
    };
  }
};
