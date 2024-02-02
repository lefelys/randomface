import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Logo from './logo';
import { ThemeToggle } from './theme-toggle';

export default function Navbar() {
  return (
    <div className='flex h-20 mb-5 items-center'>
      <div className='flex space-x-4 items-center'>
        <a href='/'>
          <Logo size={45} />
        </a>
        <a href='/'>
          <h1 className='text-xl font-bold'>Randomface</h1>
        </a>
      </div>

      <div className='ml-auto flex items-center space-x-6 w-fit'>
        <Link
          href='https://github.com/lefelys/randomface'
          target='_blank'
          className='inline-flex items-center space-x-2 font-medium text-sm hover:underline decoration-dotted decoration-muted-foreground'
        >
          <GitHubLogoIcon width={20} height={20} />
          <span className='hidden md:block'>Documentation</span>
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
}
