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

export type ButtonProps = {
  onClick?: () => void;
  name: string;
  className: string[];
  disabled?: boolean;
};

export type CardProps = {
  name: string;
  abilities: string;
  pic: string;
  type: string;
  height: number;
  weight: number;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactElement;
};

export type FooterProps = {
  link: string;
  image: string;
};

type SearchError = {
  error: AppError | null;
};

export type TopControlsProps = InputProps & SearchError;
