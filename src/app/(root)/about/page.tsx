import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import WriteImg1 from "@/assets/writer-4.png";
// import Mag2 from "@/assets/dark-books.png";
// import Mag3 from "@/assets/dark-books.png";
// import Uni2 from "@/assets/dark-books.png";
import Innov from "@/assets/writer-3.png";

export default function About() {
  return (
    <main>
      <div id='about' className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden grad-to-right lg:h-screen lg:-mt-20 text-black">   
        <Image src={WriteImg1} alt="Bg" className="absolute top-0 left-0 w-full h-full" />
        <div className="flex flex-col gap-7 items-center text-center p-4 pt-12 max-w-[360px] md:max-w-[800px] mx-auto text-sm relative text-white">
          <h1 className="pointer-events-none z-10 text-center text-7xl font-bold">
            Lunas Diary
          </h1>
          <h2 className="hidden text-2xl leading-relaxed md:block">
            Where Words Find Their Rhythm.
          </h2>
          <p className="text-lg">
            LunasDiary is a home for stories that resonate, inspire, and connect. Here, creativity knows no bounds, and each piece is crafted with thought and heart.
          </p>
          <div className="flex items-center gap-1.5">
            <Button className="px-3">
              Imagination
            </Button>
            <Button className="px-3">
              Insight
            </Button>
            <Button className="px-3">
              Impact
            </Button>
          </div>
          
        </div>
    </div>
     <section id="about" className="section ">
        <div data-aos="fade-in" className="flex flex-col items-center max-w-3xl mx-auto mb-6 text-center md:mb-12">
          <h3 className="text-2xl md:text-3xl font-[624] mb-2 md:mb-4 text-primary">About Us</h3>
          <p className="text-lg text-primary">
            We believe in the power of words to inspire, connect, and uplift. Our blog is a space dedicated to thoughtful expression, where creativity meets purpose. Through each story and insight, we strive to bring forth innovation in writing, embrace kindness in all we share, and foster a sense of community that values thoughtful reflection. With a blend of imagination and sincerity, we hope to leave a meaningful impact on every reader.
          </p>
        </div>
        <div data-aos="fade-in" data-aos-offset="300" data-aos-easing="ease-in" className="division grid items-center grid-cols-1 gap-10 md:grid-cols-2">
          {/* Left side: About Us, Mission, Vision */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start">
              <h4 className="mb-2 text-xl font-semibold">Mission Statement</h4>
              <p className="text-base md:text-lg">
                To inspire and engage readers through storytelling that celebrates creativity, reflection, and authenticity. LunasDiary strives to foster a community where ideas flourish, voices are valued, and every piece leaves a lasting impression
              </p>
            </div>
            <div className="flex flex-col items-start">
              <h4 className="mb-2 text-xl font-semibold">Our Vision</h4>
              <p className="text-base md:text-lg">
              To become a trusted platform where words connect people across experiences and perspectives. Through dedication to quality content and a commitment to meaningful impact, LunasDiary aims to shape a world where stories ignite empathy, curiosity, and understanding
              </p>
            </div>
          </div>
          {/* Right side: Image */}
          <div data-aos="fade-left" data-aos-offset="600" data-aos-easing="ease-in" className="flex items-center justify-center h-full max-h-screen shadow-lg overflow-hidden shadow-black">
            <Image src={Innov} alt="About LunasDiary" className="w-full h-full rounded-sm" />
          </div>
    
        </div>
      </section>
      {/* <section id="portfolio" className="section grad-to-right dark:grad-to-right-dark">
        <div className="division flex flex-col items-center justify-center gap-4">
          <div data-aos="fade-in" className="flex flex-col items-center max-w-[720px] text-center mx-auto mb-6 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-[624] mb-2 md:mb-4 text-white">Projects</h3>
            <p className="text-lg text-white">
              Explore our portfolio to see how our innovative software solutions have made a positive impact for our clients
            </p>
          </div>
          <div className="flex flex-col gap-6 py-6 md:flex-row">
            <div className="flex relative overflow-hidden flex-1 h-[539px] rounded-3xl justify-center items-end w-fit">
              <Image className='absolute object-cover w-full h-full' src={Uni2} alt="" />
              <div className="z-10 flex flex-col items-start gap-4 px-12 py-4 pb-6 md:flex-row md:items-center">
                <div className="flex flex-col gap-4 md:w-2/3">
                  <h2 className='text-3xl font-bold text-primary-foreground'>UNIVERSITY OF BUSINESS AND TECHNOLOGY</h2>
                  <p className='text-primary-foreground'>Advance access to higher business education</p>
                </div>
                <Button className={'bg-primary text-primary-foreground px-6 py-[0.8rem]'}>Lets work</Button>
              </div>
            </div>
            <div className="flex flex-col justify-between flex-1 gap-6">
              <div className="relative flex items-end justify-center flex-1 overflow-hidden rounded-3xl">
                <Image className='absolute object-cover w-full h-full' src={Mag2} alt="" />
                <div className="z-10 flex flex-col gap-3 p-6">
                  <h2 className='text-2xl font-bold text-primary-foreground'>BYS MAGAZINE</h2>
                  <p className='text-primary-foreground'>Spotlighting the rich tapestry of businesses operating within Bayelsa</p>
                </div>
              </div>
              <div className="relative flex items-end justify-center flex-1 overflow-hidden rounded-3xl w-fit">
                <Image className='absolute object-cover w-full h-full' src={Mag3} alt="" />
                <div className="z-10 flex flex-col gap-3 p-6">
                  <h2 className='text-2xl font-bold text-primary-foreground'>YENREACH</h2>
                  <p className='text-primary-foreground'>Innovative business and job listing platform supporting the growth and development of small and medium businesses across Nigeria</p>
                </div>
              </div>
            </div>
          </div>
          <Button>View Our Project</Button>
        </div>
      </section> */}
      
      <section id="portfolio" className="section">
        <div className="division lg:px-main">
            <div className="flex flex-col items-center justify-between w-full gap-4 p-6 md:flex-row bg-primary-foreground rounded-2xl md:p-12">
              <div className="flex flex-col gap-4">
                <h2 className='text-2xl font-bold text-primary'>Contact us for collaborations or advertisements</h2>
                <p className='w-4/5 text-primary'>
                  We love getting emails from our readers. Wether you just want to air your thoughts or you want to talk about a form  of collaboration. We love working with businesses and are happy to create partnerships of different kinds. Please email lunasdiary@gmail.com or contact us by via our contact us page
                </p>
              </div>
              <Link href={'/contact'}>
                <Button className={'border-none rounded-xl py-3 text-sm whitespace-nowrap'}>Contact Us</Button>
              </Link>
            </div>
          </div>
      </section>



    </main>
  );
}
