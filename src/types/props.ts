import type { ReactElement, ReactNode } from 'react';
import type { Pokemon } from './pokemon';
import type { AppError } from './pokemon';

export type PokemonDataProps = {
  mode: 'AllPokemons' | 'Search';
  results: Pokemon[];
  isLoading?: boolean;
  error?: AppError | null;
  forceError?: boolean;
};

export type HeaderProps = {
  name: string;
  logo: string;
};

export type ResultProps = {
  mode: 'AllPokemons' | 'Search';
  results: Pokemon[];
  isLoading: boolean;
  forceError?: boolean;
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
  mode: 'AllPokemons' | 'Search';
  countPokemons: number;
  inputValue: string;
  error: AppError | null;
  isLoading: boolean;
  results: Pokemon[];
};
export type TopControlsProps = InputProps &
  SearchError & {
    mode: 'AllPokemons' | 'Search';
    onCloseSearch: () => void;
  };

export type PaginationProps = {
  current: number;
  pages: number;
  onChange: (page: number) => void;
  elementsCount: number;
};
