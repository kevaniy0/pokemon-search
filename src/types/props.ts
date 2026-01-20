import type { ReactElement, ReactNode } from 'react';
import type { Pokemon } from './pokemon';
import type { AppError } from './pokemon';

export type PokemonDataProps = {
  results: Pokemon[];
  isLoading?: boolean;
  error?: AppError | null;
  forceError?: boolean;
};

export type ResultsProps = PokemonDataProps & {
  onChangePage: (page: number) => void;
  currentPage: number;
  totalPages: number;
};

export type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
  isLoading: boolean;
};

export type ButtonProps = {
  element?: ReactElement;
  onClick?: () => void;
  name?: string;
  className: string[];
  disabled?: boolean;
};

export type CardProps = {
  name: string;
  pic: string;
  onClick: () => void;
};

export type CardDesciption = {
  onClick: () => void;
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
export type HomePageState = {
  searchItem: string;
  inputValue: string;
  results: Pokemon[];
  error: AppError | null;
  isLoading: boolean;
  forceError: boolean;
};
export type TopControlsProps = InputProps & SearchError;

export type PaginationProps = {
  current: number;
  pages: number;
  onChange: (page: number) => void;
};
