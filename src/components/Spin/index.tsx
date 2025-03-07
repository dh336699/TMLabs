import clsx from 'clsx';
import Loading from '@/components/Loading';
import './index.css';

interface ISpinProps {
  spinning: boolean;
  className?: string;
  children?: React.ReactNode;
  size?: number;
}

export default function Spin({ spinning, className, children, size = 40 }: ISpinProps) {
  return (
    <div className={clsx('relative', className)}>
      {children}
      {spinning && (
        <Loading size={size} className="absolute top-0 left-0 bottom-0 right-0 z-10" />
      )}
    </div>
  );
}
