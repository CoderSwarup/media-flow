import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
import { HeroParallax } from "@/components/global/connect-parallax";
import ContactButton from "@/components/global/contact-button";
import { ContainerScroll } from "@/components/global/container-scroll-animation";
import Features from "@/components/global/Features";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { LampComponent } from "@/components/global/lamp";
import Navbar from "@/components/global/navbar";
import { BackgroundLines } from "@/components/global/ui/background-lines";
import { Button } from "@/components/ui/button";
import { clients, products } from "@/lib/constants";
import { CheckIcon, X } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col">
      <Navbar />
      <section className="h-screen w-full   rounded-md  !overflow-visible relative flex flex-col items-center  antialiased">
        {/* <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div> */}
        <BackgroundLines>
          <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
            <ContainerScroll
              titleComponent={
                <div className="flex items-center flex-col">
                  <Button
                    size={"lg"}
                    className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                  >
                    <Link href={"/dashboard"}>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
                        Start For Free Today
                      </span>
                    </Link>
                  </Button>
                  <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                    Transform Your Media with MediaFlow
                  </h1>
                </div>
              }
            />
          </div>
        </BackgroundLines>
      </section>
      <InfiniteMovingCards
        className="md:mt-[25rem] mt-[200px] mb-[30px] overflow-x-hidden"
        items={clients}
        direction="right"
        speed="slow"
      />

      <section className="overflow-x-hidden">
        <HeroParallax products={products}></HeroParallax>
      </section>

      <section className="mt-[-100px] w-full mb-10">
        <LampComponent />
        <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-72">
          <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                Hobby Plan
                <h2 className="text-6xl ">$0</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Get started with MediaFlow, with limited features, but the
                perfect option to explore! <br /> Let's Start
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon color="green" /> 3 Free Transcodings per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon color="green" /> 100MB storage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon color="green" /> Access to basic video and image
                    editing tools
                  </li>
                  <li className="flex items-center gap-2">
                    <X color="red" /> 24/7 priority support
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Try now →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Get Started Now
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-[#E2CBFF] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                Pro Plan
                <h2 className="text-6xl ">$29</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Unlock more features with MediaFlow's Pro Plan, including faster
                transcoding and advanced video tools.
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon color="green" /> 10 Free Transcodings per month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon color="green" /> 5GB storage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon color="green" /> Full access to video and image
                    editing tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon color="green" /> Priority support
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Try now →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Get Started Now
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white "
              >
                Unlimited Plan
                <h2 className="text-6xl ">$99</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                The ultimate plan for professional video and media creators who
                need unlimited transcoding, editing, and storage.
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon color="green" /> Unlimited Transcodings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon color="green" /> 50GB storage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon color="green" /> Full suite of video and image
                    editing tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon color="green" /> 24/7 priority support
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Try now →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Get Started Now
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </section>

      <section className="max-w-5xl w-full mb-10">
        <Features />
      </section>
      <ContactButton />
    </main>
  );
}
