import React from 'react';
import type { FooterProps } from '../../types/props';

class Footer extends React.Component<FooterProps> {
  render() {
    return (
      <footer className="flex justify-center items-center gap-5 pb-1">
        <div className="font-medium  text-gray-600">© 2025</div>
        <a
          className="block w-[32px] h-[32px]"
          href={this.props.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundImage: `url(${this.props.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        ></a>
      </footer>
    );
  }
}

export default Footer;
