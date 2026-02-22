import type { FooterProps } from '../../types/props';

const Footer = (props: FooterProps) => {
  return (
    <footer className="flex justify-center items-center gap-5 pb-1">
      <div className="font-bold  text-xDark dark:text-xLight">© 2025</div>
      <a
        className="block w-[32px] h-[32px]"
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}
      ></a>
    </footer>
  );
};

export default Footer;
