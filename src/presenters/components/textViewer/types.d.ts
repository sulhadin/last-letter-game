export interface ITextViewer {
  text: string | undefined;
  prefix?: string;
  className?: string;
  size?: 'large' | 'medium' | 'small';
  type?: 'danger' | 'info';
}
