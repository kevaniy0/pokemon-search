import type { ReactElement, ReactNode } from 'react';
import type { Pokemon } from './pokemon';
import type { AppError } from './pokemon';

export type PokemonDataProps = {
  results: Pokemon[];
  isLoading?: boolean;
  error?: AppError | null;
  forceError?: boolean;
};

export type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
  isLoading: boolean;
};

export type CardProps = {
  name: string;
  abilities: string;
  pic: string;
  type: string;
  height: number;
  weight: number;
};

type FallbackError = {
  resetError?: () => void;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactElement<FallbackError>;
};
