import { Carousel } from 'flowbite-react';

const Hero = () => {
  return (
    <div className="hidden md:flex relative top-20 h-96 gap-2">
      <div className="flex-1 rounded-lg h-80">
        <Carousel>
          <img
            src="https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBmcmlkYXl8ZW58MHx8MHx8fDA%3D&auto=format&w=800&q=60"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1542992015-4a0b729b1385?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBmcmlkYXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJsYWNrJTIwZnJpZGF5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
        </Carousel>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2 h-80">
        <div className="bg-blend-lighten bg-black opacity-90 rounded-lg bg-center bg-cover bg-no-repeat bg-hero-macbook"></div>
        <div className="bg-blend-lighten bg-black opacity-90 rounded-lg bg-center bg-cover bg-no-repeat bg-hero-camera"></div>
        <div className="bg-blend-lighten bg-black opacity-90 rounded-lg bg-center bg-cover bg-no-repeat bg-hero-iphone"></div>
        <div className="bg-blend-lighten bg-black opacity-90 rounded-lg bg-center bg-cover bg-no-repeat bg-hero-watch"></div>
      </div>
    </div>
  );
};

export default Hero;
