import { ShieldCheckIcon } from '@heroicons/react/16/solid';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from './ui/badge';

export default function Footer() {
  return (
    <div className='flex h-16 items-center'>
      <div className='flex space-x-4 items-center'>
        <a
          href='https://github.com/lefelys'
          target='_blank'
          className='text-sm hover:underline decoration-dotted decoration-muted-foreground text-muted-foreground/30 hover:text-foreground'
          rel='noopener'
        >
          by lefelys
        </a>
      </div>

      <div className='ml-auto flex items-center w-fit space-x-2'>
        <Badge
          variant='outline'
          className='space-x-1 px-2 border-none text-muted-foreground/30 hover:text-foreground'
        >
          <p>MIT license</p>
        </Badge>
        <Popover>
          <PopoverTrigger>
            <Badge
              variant='outline'
              className='space-x-1 px-2 border-none text-muted-foreground/30 hover:text-foreground'
            >
              <ShieldCheckIcon className='h-3 w-3' />
              <p>local</p>
            </Badge>
          </PopoverTrigger>
          <PopoverContent className='text-xs p-2'>
            This website functions locally on your device and does not transmit
            data to external servers.
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
