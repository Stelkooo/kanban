import Image from 'next/image';

import Logo from '@/public/assets/logo-mobile.svg';

export default function Sidebar() {
  return (
    <div className="flex w-max flex-col justify-center md:row-span-2 md:w-[260px] md:justify-start md:gap-[54px] md:border-b md:border-r md:border-lines-light md:pb-8 md:pt-7">
      <div className="pl-4 md:pl-3.5">
        <picture>
          <source
            media="(min-width:768px)"
            srcSet="/assets/logo-dark.svg"
            width={152}
          />
          <Image src={Logo} alt="Kanban Logo" />
        </picture>
      </div>
    </div>
  );
}
