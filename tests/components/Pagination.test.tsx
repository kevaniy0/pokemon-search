import Pagination from '@/components/Pagination';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const mockOnChange = vi.fn();

describe('Pagination Component', () => {
  it('should render pagination component if result array is not empty', () => {
    render(
      <Pagination
        current={1}
        hasItems={true}
        pages={10}
        onChange={mockOnChange}
      />
    );
    const component = screen.getByTestId('pagination-component');
    expect(component).toBeInTheDocument();
  });
  it('should not render pagination component if result array is empty', () => {
    const mockOnChange = vi.fn();
    render(
      <Pagination
        current={1}
        hasItems={false}
        pages={10}
        onChange={mockOnChange}
      />
    );
    const component = screen.queryByTestId('pagination-component');
    expect(component).not.toBeInTheDocument();
  });
});
describe('Pages generation logic', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });
  it('should render all pages when total pages < 6', () => {
    render(
      <Pagination
        current={1}
        pages={5}
        hasItems={true}
        onChange={mockOnChange}
      />
    );
    for (let i = 1; i < 6; i += 1) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });
  it('should show first pages with ellipsis when current is near start', () => {
    render(
      <Pagination
        current={2}
        pages={10}
        hasItems={true}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
  });
  it('should show middle pages with ellipsis on both sides when current is in middle', () => {
    render(
      <Pagination
        current={5}
        pages={10}
        hasItems={true}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    const ellipses = screen.getAllByText('...');
    expect(ellipses).toHaveLength(2);
  });
});
describe('Navigation buttons', () => {
  it('should have prev/next buttons', () => {
    render(
      <Pagination
        current={5}
        pages={10}
        hasItems={true}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });
  it('should disable prev button on first page', () => {
    render(
      <Pagination
        current={1}
        pages={10}
        hasItems={true}
        onChange={mockOnChange}
      />
    );
    const prev = screen.getByText('<');
    expect(prev).toBeDisabled();
  });
  it('should disable next button on last page', () => {
    render(
      <Pagination
        current={10}
        pages={10}
        hasItems={true}
        onChange={mockOnChange}
      />
    );
    const next = screen.getByText('>');
    expect(next).toBeDisabled();
  });
  it('should enable prev/next button on middle position', () => {
    render(
      <Pagination
        current={5}
        pages={10}
        hasItems={true}
        onChange={mockOnChange}
      />
    );
    const prev = screen.getByText('<');
    const next = screen.getByText('>');
    expect(prev).not.toBeDisabled();
    expect(next).not.toBeDisabled();
  });
});
describe('Page navigation', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });
  const user = userEvent.setup();
  it('should call onChange with correct parameter when clicking page number', async () => {
    render(
      <Pagination
        current={5}
        pages={10}
        hasItems={true}
        onChange={mockOnChange}
      />
    );
    const pageNumber10 = screen.getByText('10');
    await user.click(pageNumber10);
    expect(mockOnChange).toHaveBeenCalledWith(10);
  });
  it('should call onChange with previous page when clicking prev button', async () => {
    render(
      <Pagination
        current={5}
        pages={10}
        hasItems={true}
        onChange={mockOnChange}
      />
    );

    const prev = screen.getByText('<');
    await user.click(prev);
    expect(mockOnChange).toHaveBeenCalledWith(4);
  });
  it('should call onChange with next page when clicking next button', async () => {
    render(
      <Pagination
        current={5}
        pages={10}
        hasItems={true}
        onChange={mockOnChange}
      />
    );

    const next = screen.getByText('>');
    await user.click(next);
    expect(mockOnChange).toHaveBeenCalledWith(6);
  });
  it('should not call onChange when clicking on current page', async () => {
    render(
      <Pagination
        current={5}
        pages={10}
        hasItems={true}
        onChange={mockOnChange}
      />
    );

    const currentPageButton = screen.getByText('5');
    await user.click(currentPageButton);
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
